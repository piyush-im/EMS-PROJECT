import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Details = () => {
    const { id } = useParams();
    const [leave, setLeave] = useState(null);
    const navigate=useNavigate();
    useEffect(() => {
        const fetchLeave = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/leave/detail/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });
                console.log(response.data);

                if (response.data.success) {
                    setLeave(response.data.leave);
                }
            } catch (error) {
                if (error.response && error.response.data) {
                    const errorMessage = error.response.data.error || 'An error occurred';
                    alert(errorMessage);
                } else {
                    alert('Something went wrong!');
                }
            }
        };
        fetchLeave();
    }, [id]);

    if (!leave) {
        return <div>Loading...</div>;
    }

const changeStatus = async (id, status) => {
    try {
        const response = await axios.put(
            `http://localhost:5000/api/leave/${id}`,
            { status }, // ✅ send as object
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            }
        );

        if (response.data.success) {
            navigate('/admin-dashboard/leaves');
        }
    } catch (error) {
        console.log(error);
        if (error.response && error.response.data) {
            alert(error.response.data.error || 'An error occurred');
        } else {
            alert('Something went wrong!');
        }
    }
};


    return (
        <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
            <h2 className='text-2xl font-bold mb-8 text-center'>Leave Details</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                    {leave?.employeeId?.userId?.profileImage && (
                        <img
                            src={`http://localhost:5000/${leave.employeeId.userId.profileImage}`}
                            alt="Profile"
                            className='rounded-full border w-72'
                        />
                    )}
                </div>
                <div>
                    <div className='flex space-x-3 mb-5'>
                        <p className='text-lg font-bold'>Name:</p>
                        <p className='font-medium'>{leave?.employeeId?.userId?.name || "N/A"}</p>
                    </div>

                    <div className='flex space-x-3 mb-5'>
                        <p className='text-lg font-bold'>Employee ID:</p>
                        <p className='font-medium'>{leave?.employeeId?.employeeId || "N/A"}</p>
                    </div>

                    <div className='flex space-x-3 mb-5'>
                        <p className='text-lg font-bold'>Leave Type:</p>
                        <p className='font-medium'>
                            {typeof leave.leaveType === "string" && isNaN(Date.parse(leave.leaveType))
                                ? leave.leaveType
                                : new Date(leave.leaveType).toLocaleDateString()
                            }
                        </p>
                    </div>

                    <div className='flex space-x-3 mb-5'>
                        <p className='text-lg font-bold'>Reason:</p>
                        <p className='font-medium'>{leave?.reason || "N/A"}</p>
                    </div>

                    <div className='flex space-x-3 mb-5'>
                        <p className='text-lg font-bold'>Department:</p>
                        <p className='font-medium'>{leave?.employeeId?.department?.dep_name || "N/A"}</p>
                    </div>

                    <div className='flex space-x-3 mb-5'>
                        <p className='text-lg font-bold'>Start Date:</p>
                        <p className='font-medium'>
                            {leave?.startDate
                                ? new Date(leave.startDate).toLocaleDateString()
                                : "N/A"}
                        </p>
                    </div>

                    <div className='flex space-x-3 mb-5'>
                        <p className='text-lg font-bold'>End Date:</p>
                        <p className='font-medium'>
                            {leave?.endDate
                                ? new Date(leave.endDate).toLocaleDateString()
                                : "N/A"}
                        </p>
                    </div>

                    <div className='flex space-x-3 mb-5'>
                        <p className='text-lg font-bold'>{leave.status==="Pending" ? "Action":"Status"}</p>
                        {leave.status=== "Pending" ? (
                            <div className='flex space-x-2'>
                                <button className='px-2 py-0.5 bg-teal-300 hover:bg-teal-400' 
                                onClick={()=>changeStatus(leave._id, "Approved")}
                                >Approved</button>
                                <button className='px-2 py-0.5 bg-red-300 hover:bg-red-400'
                                onClick={()=>changeStatus(leave._id,"Rejected")}
                                >Rejected</button>
                            </div>
                        ):
                        <p className='font-medium'>{leave?.status || "N/A"}</p>
                    }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Details;
