import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { useNavigate } from "react-router-dom";

// Action buttons for each row
function LeaveButtons({ Id }) {
  const navigate = useNavigate();
  const handleView = (id) => {
    navigate(`/admin-dashboard/leaves/${id}`);
  };
  return (
    <div className="flex gap-2">
      <button
        onClick={() => handleView(Id)}
        className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
      >
        View
      </button>
    </div>
  );
}

function Table() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredLeaves, setFilteredLeaves] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchLeaves = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/leave", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        let sno = 1;
        const data = response.data.leaves.map((leave) => ({
          _id: leave._id,
          sno: sno++,
          employeeId: leave.employeeId?.employeeId || leave.employeeId?._id || "N/A",
          name: leave.employeeId?.user?.name || "N/A",
          leaveType: leave.leaveType || "N/A",
          department: leave.employeeId?.department?.dep_name || "N/A",
          days: Math.ceil(
            (new Date(leave.endDate) - new Date(leave.startDate)) /
            (1000 * 60 * 60 * 24)
          ),
          status: leave.status || "N/A",
        }));

        setLeaves(data);
        setFilteredLeaves(data); // ✅ initialize filtered data
      }
    } catch (error) {
      console.error(error);
      const errorMessage = error.response?.data?.error || "Something went wrong!";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  // ✅ Filter function
  const filterByInput = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    if (!value.trim()) {
      setFilteredLeaves(leaves);
    } else {
      setFilteredLeaves(
        leaves.filter((leave) =>
          leave.employeeId.toString().toLowerCase().includes(value)
        )
      );
    }
  };

  const columns = [
    { name: 'S.No', selector: row => row.sno, sortable: true, width: "80px" },
    { name: 'Employee ID', selector: row => row.employeeId, sortable: true },
    { name: 'Name', selector: row => row.name, sortable: true },
    { name: 'Leave Type', selector: row => row.leaveType, sortable: true },
    { name: 'Department', selector: row => row.department, sortable: true },
    { name: 'Days', selector: row => row.days, sortable: true },
    { name: 'Status', selector: row => row.status, sortable: true },
    {
      name: 'Action',
      cell: row => <LeaveButtons Id={row._id} />,
      ignoreRowClick: true,
      button: true
    }
  ];

  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  const filterBYButton=(status)=>{
    const data=leaves.filter((leave)=>
    leave.status
    .toLowerCase()
    .includes(status.toLowerCase())
    )
    setFilteredLeaves(data)
  }

  return (
    <div className='p-6'>
      <div className='text-center'>
        <h3 className='text-2xl font-bold'>Manage Leave</h3>
      </div>

      <div className='flex justify-between items-center gap-2 mt-4'>
        <input
          type='text'
          placeholder='Search By Emp ID'
          className='px-4 py-0.5 border'
          value={searchTerm}
          onChange={filterByInput}
        />

        <div className="flex gap-2">
          <button className='px-2 py-1 bg-teal-600 text-white hover:bg-teal-700'
          onClick={()=>filterBYButton("Pending")}
          >
            Pending
          </button>
          <button className='px-2 py-1 bg-teal-600 text-white hover:bg-teal-700'
          onClick={()=>filterBYButton("Approved")}
          >
            Approved
          </button>
          <button className='px-2 py-1 bg-teal-600 text-white hover:bg-teal-700'
          onClick={()=>filterBYButton("Rejected")}
          >
            Rejected
          </button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filteredLeaves} // ✅ show filtered data
        pagination
        highlightOnHover
        dense
      />
    </div>
  );
}

export default Table;
