import React, { useState,useEffect } from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import { columns, EmployeeButtons } from "../../Utils/EmployeeHelper";
import DataTable from 'react-data-table-component';


const List=()=>{
    const [employees,setEmployees]=useState([])
    const [empLoading, setEmpLoading] = useState(false);
    const [filteredEmployees,setFilteredEmployees]=useState()

    useEffect(() => {
        const fetchEmployees = async () => {
            setEmpLoading(true);
            try {
                const response = await axios.get('http://localhost:5000/api/employee', {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.data.success) {
                    const data = response.data.employees.map((emp, index) => {
                        return {
                            _id: emp._id,
                            sno: index + 1,  // Correct way to increment sno
                            dep_name: emp.department.dep_name,
                            name:emp.userId.name,
                            dob:new Date(emp.dob).toLocaleDateString(),
                            profileImage:<img width={40} className="rounded-full" src={`http://localhost:5000/${emp.userId.profileImage}`}/>,
                            action: (<EmployeeButtons Id={emp._id}/>),
                        };
                    });
                    setEmployees(data);
                    setFilteredEmployees(data);
                }
            } catch (error) {
                console.log(error);
                
                if (error.response && error.response.data) {
                    const errorMessage = error.response.data.error || 'An error occurred';
                    alert(errorMessage);
                } else {
                    alert(' went wrong!');
                }
            } finally {
                setEmpLoading(false);
            }
        };
        fetchEmployees();
    }, []);

    const handleFilter=(e)=>{
        const records=employees.filter((emp)=>(
            emp.name.toLowerCase().includes(e.target.value.toLowerCase())
        ))
        setFilteredEmployees(records);

    }

    return(
            <div className="p-6"> 
                    <div className='text-center'>
                               <h3 className='text-2xl font-bold'>Manage Employee</h3>
                           </div>
                           <div className='flex justify-between items-center'>
                               <input type='text'
                                   placeholder='Search by Department name'
                                   className='px-4 py-0.5 rounded text-center'
                                   onChange={handleFilter}
                                   
                               />
                                <Link to='/admin-dashboard/add-employee'
                                   className='px-4 py-1 bg-teal-600 rounded text-white'>
                                   Add new employee
                                </Link>
                     </div>
                     <div className="mt-6">
                        <DataTable columns={columns} data={filteredEmployees} pagination/>
                     </div>
            </div>
    )
}

export default List