
import { Link } from 'react-router-dom'
import { useAuth } from '../../Context/authContext';
import axios from 'axios';
import  { useState, useEffect } from 'react';

function List() {
  const {user}=useAuth()
  const [leaves,setLeaves]=useState([])
    let sno=1

  const fetchLeaves= async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/leave/${user._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        setLeaves(response.data.leaves);
       
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.error || "An error occurred";
        alert(errorMessage);
      }
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);
  return (
   <div className='p-6'>
    <div className='text-center'>
    <h3 className='text-2xl font-bold'>Manage Leave</h3>
   </div>
   <div className='flex justify-between items-center'>
    <input
    type='text'
    placeholder='Search By Dep Name'
    className='px-4 py-0.5 border'
    />
    <Link
    to="/employee-dashboard/add-leave"
    className='px-4 py-1 bg-teal-100 rounded text-white'
    >
        Add New Employee
    </Link>
   </div>
    <table className="w-full mt-5 text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200">
                <tr>
                  <th className="px-6 py-3">SNO</th>
                  <th className="px-6 py-3">Leave</th>
                  <th className="px-6 py-3">From</th>
                  <th className="px-6 py-3">TO</th>
                  <th className="px-6 py-3">Description</th>
         
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
  {leaves.map((leave, index) => (
    <tr key={leave._id} className="bg-white border-b hover:bg-gray-50">
      <td className="px-6 py-3">{index + 1}</td>
      <td className="px-6 py-3">{leave.leaveType}</td>
      <td className="px-6 py-3">{new Date(leave.startDate).toLocaleDateString()}</td>
      <td className="px-6 py-3">{new Date(leave.endDate).toLocaleDateString()}</td>
      <td className="px-6 py-3">{leave.reason}</td>
      <td className="px-6 py-3">{leave.status}</td>
    </tr>
  ))}
</tbody>

            </table>
   </div>
  )
}

export default List