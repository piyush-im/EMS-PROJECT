import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../Context/AuthContext";import axios from 'axios';

function Add() {
  const { user } = useAuth();
  const [leave, setLeave] = useState({
    userId: user._id,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeave((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/leave/add",
        leave,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);
      if (response.data.success) {
        navigate("/employee-dashboard/leaves");
      }
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.error || "Something went wrong!");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6">Request For Leave</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700">Leave type</label>
          <select
            name="leaveType"
            onChange={handleChange}
            className="mt-1 p-2 block w-full border-grey-300 rounded-md"
            required
          >
            <option value="">Select Leave Type</option>
            <option value="Sick Leave">Sick Leave</option>
            <option value="Casual Leave">Casual Leave</option>
            <option value="Annual Leave">Annual Leave</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">From Date</label>
            <input
              type="date"
              name="startDate"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">To Date</label>
            <input
              type="date"
              name="endDate"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="reason"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border-gray-300 rounded-md"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-teal-600 text-white font-bold py-2 px-4 rounded-sm"
        >
          Apply Leave
        </button>
      </form>
    </div>
  );
}

export default Add;
