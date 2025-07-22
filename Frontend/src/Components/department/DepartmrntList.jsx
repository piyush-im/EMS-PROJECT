import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DataTable from "react-data-table-component";
import { columns, DepartmentButtons } from "../../Utils/DepartmnetHelper";
import axios from 'axios';

const DepartmentList = () => {
    const [departments, setDepartments] = useState([]);
    const [depLoading, setDepLoading] = useState(false);
    const [filterDepartments, setfilterDepartment] = useState([]);

    const onDepartmentDelete = async (id) => {
        const data = departments.filter(dep => dep._id !== id);
        setDepartments(data);
        setfilterDepartment(data);  // Update the filtered list when deleting a department
    };

    useEffect(() => {
        const fetchDepartments = async () => {
            setDepLoading(true);
            try {
                const response = await axios.get('http://localhost:5000/api/department', {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.data.success) {
                    const data = response.data.departments.map((dep, index) => {
                        return {
                            _id: dep._id,
                            sno: index + 1,  // Correct way to increment sno
                            dep_name: dep.dep_name,
                            action: (<DepartmentButtons _id={dep._id} onDepartmentDelete={onDepartmentDelete} />)
                        };
                    });
                    setDepartments(data);
                    setfilterDepartment(data);
                }
            } catch (error) {
                if (error.response && error.response.data) {
                    const errorMessage = error.response.data.error || 'An error occurred';
                    alert(errorMessage);
                } else {
                    alert('Something went wrong!');
                }
            } finally {
                setDepLoading(false);
            }
        };
        fetchDepartments();
    }, []);

    const filterDepartmentsHandler = (e) => {
        const records = departments.filter((dep) =>
            dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase()) // Corrected to "includes"
        );
        setfilterDepartment(records);
    };

    return (
        <>
            {depLoading ? <div>Loading...</div> :
                <div className='p-5'>
                    <div className='text-center'>
                        <h3 className='text-2xl font-bold'>Manage Departments</h3>
                    </div>
                    <div className='flex justify-between items-center'>
                        <input type='text'
                            placeholder='Search by Department name'
                            className='px-4 py-0.5 rounded text-center'
                            onChange={filterDepartmentsHandler}  // Correct function name
                        />
                        <Link to='/admin-dashboard/add-department'
                            className='px-4 py-1 bg-teal-600 rounded text-white'>
                            Add new Department
                        </Link>
                    </div>
                    <div className='mt-5'>
                        <DataTable
                            columns={columns}
                            data={filterDepartments}  // Correct data prop
                            pagination
                        />
                    </div>
                </div>
            }
        </>
    );
}

export default DepartmentList;
