import React, { useEffect,useState} from "react";
import { fetchDepartments } from "../../Utils/EmployeeHelper";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Add=()=>{
    const [departments,setDepartments]=useState([]);
    const [formData,setFormData]=useState([]);
    const navigate=useNavigate();

    useEffect(()=>{
        const getDepartments= async()=>{
        const departments=await fetchDepartments()
        setDepartments(departments);
        }
        getDepartments();

    },[]);

    const handleChange=(e)=>{
        const {name,value,files} = e.target
        if(name==="image"){
            setFormData((prevData)=>({...prevData, [name] : files[0]}));
        }else{
            setFormData((prevData)=>({...prevData, [name] : value}));
        }

    }
    const handleSubmit=async(e)=>{
        e.preventDefault();

        const formDataObj=new FormData()
        Object.keys(formData).forEach((key)=>{
            formDataObj.append(key,formData[key]);
        })

        try {
            const response = await axios.post('http://localhost:5000/api/employee/add', formDataObj, {
                headers: {  // Note: `header` -> `headers`
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.data.success) {
                navigate("/admin-dashboard/employees");
            }
        } catch (error) {
            if (error.response && error.response.data) {
                // Check for specific error structure
                const errorMessage = error.response.data.error || 'An error occurred';
                alert(errorMessage);
            } else {
                alert('Something went wrong!');
            }
        }
    };

    return(
        <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-6">Add New Employee</h2>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input 
                            type="text"
                            name="name"
                            onChange={handleChange}
                            placeholder="Insert Name"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input 
                            type="email"
                            name="email"
                            onChange={handleChange}
                            placeholder="Insert Email"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    {/* Employee Id */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                        Employee Id
                        </label>
                        <input 
                            type="text"
                            name="employeeId"
                            onChange={handleChange}
                            placeholder="Insert Employee Id"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    {/* Date of Birth */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                        Date of Birth
                        </label>
                        <input 
                            type="date"
                            name="dob"
                            onChange={handleChange}
                            placeholder="Insert Date of Birth"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    {/* Gender */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                        Gender
                        </label>
                        <select                                                  
                            name="gender"   
                            onChange={handleChange}                        
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            required
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="other">Other</option>
                        </select>
                    </div>

                    {/* Marital Sattus */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                        Marital Satus
                        </label>
                        <select
                         
                            
                            name="maritalStatus"
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            required
                            >
                                <option value="">Select Marital Satus</option>
                                <option value="single">Single</option>
                                <option value="married">Married</option>
                               
                        </select>
                    </div>  

                    {/* Designation */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                        Designation
                        </label>
                        <input 
                            type="text"
                            name="designation"
                            onChange={handleChange}
                            placeholder="Insert Designation"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    {/* Department */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                        Department
                        </label>
                        <select
                         
                            
                            name="department"
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            required
                            >
                                <option value="">Select Department</option>
                               {departments.map(dep=>(
                                      <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
                               ))} 
                               
                        </select>
                    </div>  

                    {/* Salary */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                        Salary
                        </label>
                        <input 
                            type="text"
                            name="salary"
                            onChange={handleChange}
                            placeholder="Insert Salary"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                        Password
                        </label>
                        <input 
                            type="password"
                            name="password"
                            onChange={handleChange}
                            placeholder="******"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    {/*Role */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                        Role
                        </label>
                        <select
                                                     
                            name="role"
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            required
                            >
                                <option value="">Select Role</option>
                                <option value="admin">Admin</option>
                                <option value="employee">Employee</option>
                               
                        </select>
                    </div>  

                    {/* Image Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                        Image Upload
                        </label>
                        <input 
                            type="file"
                            name="image"
                            onChange={handleChange}
                            placeholder="Upload Image"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            
                        />
                    </div>                                    
                 </div>

                 <button
                 type="submit"
                 className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 "
                 > submit                  
                 </button>
            </form>

        </div>
    )
}

export default Add;