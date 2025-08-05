import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { columns, EmployeeButtons } from "../../Utils/EmployeeHelper";
import DataTable from "react-data-table-component";

const List = () => {
    const [employees, setEmployees] = useState([]);
    const [empLoading, setEmpLoading] = useState(false);
    const [filteredEmployees, setFilteredEmployees] = useState([]);

    useEffect(() => {
        const fetchEmployees = async () => {
            setEmpLoading(true);
            try {
                const response = await axios.get("http://localhost:5000/api/employee", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                if (response.data.success) {
                    const data = response.data.employees.map((emp, index) => {
                        return {
                            _id: emp._id,
                            sno: index + 1,
                            dep_name: emp.department?.dep_name || "N/A",
                            name: emp.userId?.name || "N/A",
                            dob: emp.dob ? new Date(emp.dob).toLocaleDateString() : "N/A",
                            profileImage: emp.userId?.profileImage ? (
                                <img
                                    width={40}
                                    className="rounded-full"
                                    src={`http://localhost:5000/${emp.userId.profileImage}`}
                                    alt="profile"
                                />
                            ) : (
                                <span>N/A</span>
                            ),
                            action: <EmployeeButtons Id={emp._id} />,
                        };
                    });

                    setEmployees(data);
                    setFilteredEmployees(data);
                }
            } catch (error) {
                console.log(error);

                if (error.response && error.response.data) {
                    const errorMessage = error.response.data.error || "An error occurred";
                    alert(errorMessage);
                } else {
                    alert("Something went wrong!");
                }
            } finally {
                setEmpLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    const handleFilter = (e) => {
        const searchVal = e.target.value.toLowerCase();
        const records = employees.filter(
            (emp) =>
                emp.name.toLowerCase().includes(searchVal) ||
                emp.dep_name.toLowerCase().includes(searchVal)
        );
        setFilteredEmployees(records);
    };

    return (
        <div className="p-6">
            <div className="text-center mb-4">
                <h3 className="text-2xl font-bold">Manage Employee</h3>
            </div>

            <div className="flex justify-between items-center mb-4">
                <input
                    type="text"
                    placeholder="Search by Name or Department"
                    className="px-4 py-1 border border-gray-300 rounded"
                    onChange={handleFilter}
                />
                <Link
                    to="/admin-dashboard/add-employee"
                    className="px-4 py-1 bg-teal-600 rounded text-white"
                >
                    Add new employee
                </Link>
            </div>

            <div className="mt-6">
                {empLoading ? (
                    <div className="text-center text-lg font-semibold text-gray-600">
                        Loading...
                    </div>
                ) : (
                    <DataTable columns={columns} data={filteredEmployees} pagination />
                )}
            </div>
        </div>
    );
};

export default List;
