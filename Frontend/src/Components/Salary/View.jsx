import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from "../../Context/AuthContext";

const View = () => {
  const [salaries, setSalaries] = useState([]);
  const [filteredSalaries, setfilteredSalaries] = useState([]);
  const { id } = useParams();
  let sno = 1;
  const {user}=useAuth();

  const fetchSalaries = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/salary/${id}/${user.role}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response.data);
      if (response.data.success) {
        setSalaries(response.data.salary);
        setfilteredSalaries(response.data.salary);
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.error || "An error occurred";
        alert(errorMessage);
      }
    }
  };

  useEffect(() => {
    fetchSalaries();
  }, []);

  const filtereSalaries = (e) => {
    const q = e.target.value;
    const filteredRecords = salaries.filter((sal) =>
      sal.employeeId.employeeId.toLowerCase().includes(q.toLowerCase())
    );
    setfilteredSalaries(filteredRecords);
  };

  return (
    <>
      {!filteredSalaries ? (
        <div>Loading...</div>
      ) : (
        <div className="overflow-x-auto p-5">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Salary History</h2>
          </div>
          <div className="flex justify-end my-3">
            <input
              type="text"
              placeholder="Search by Employee Id"
              className="border border-gray-300 p-2 rounded"
              onChange={filtereSalaries}
            />
          </div>

          {filteredSalaries.length > 0 ? (
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200">
                <tr>
                  <th className="px-6 py-3">SNO</th>
                  <th className="px-6 py-3">Emp Id</th>
                  <th className="px-6 py-3">Basic Salary</th>
                  <th className="px-6 py-3">Allowances</th>
                  <th className="px-6 py-3">Deductions</th>
                  <th className="px-6 py-3">Net Salary</th>
                  <th className="px-6 py-3">Pay Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredSalaries.map((salary) => (
                  <tr key={salary._id} className="bg-white border-b hover:bg-gray-50">
                    <td className="px-6 py-3">{sno++}</td>
                    <td className="px-6 py-3">{salary.employeeId.employeeId}</td>
                    <td className="px-6 py-3">{salary.basicSalary}</td>
                    <td className="px-6 py-3">{salary.allowances}</td>
                    <td className="px-6 py-3">{salary.deductions}</td>
                    <td className="px-6 py-3">{salary.netSalary}</td>
                    <td className="px-6 py-3">{new Date(salary.payDate).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div>No records</div>
          )}
        </div>
      )}
    </>
  );
};

export default View;
