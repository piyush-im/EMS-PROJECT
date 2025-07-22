import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';


const EditDepartment=()=>{
    const {id}=useParams()
    const [department,setDepartment] = useState([])
    const [depLoading,setDepLoading] = useState(false)
    const navigate=useNavigate()

    useEffect(()=>{
        const fetchDepartments=async()=>{
            setDepLoading(true);
            try{
                const response=await axios.get(`http://localhost:5000/api/department/${id}`,{
                    headers:{
                        "Authorization":`Bearer ${localStorage.getItem('token')}`
                    }
                });
                // console.log(response.data)
                
                if(response.data.success){
                    setDepartment(response.data.department);
                }
            }catch(error){
                if (error.response && error.response.data) {
                    // Check for specific error structure
                    const errorMessage = error.response.data.error || 'An error occurred';
                    alert(errorMessage);
                } else {
                    alert('Something went wrong!');
                }

            }finally{
                setDepLoading(false);
            }
        }
        fetchDepartments();
    },[]);

    const handleChange=(e)=>{
        const {name,value} = e.target;
        setDepartment({...department, [name] : value})
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:5000/api/department/${id}`, department, {
                headers: {  // Note: `header` -> `headers`
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.data.success) {
                navigate("/admin-dashboard/departments");
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
    }

    return(
        <>{depLoading ? <div>Loading...</div>:
        <div>
            <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
                <h3 className="text-2xl font-bold mb-6">Edit Department</h3>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="dep_name"
                        className="text-sm font-medium text-gray-700"
                        >
                        Department Name
                        </label>
                        <input type="text" 
                        name="dep_name"
                        onChange={handleChange}
                        value={department.dep_name}
                        required
                        className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Enter Department Name"
                        />
                    </div>
                    <div>
                        <label htmlFor="Description"
                        className="block text-sm font-medium text-gray-700 mt-4"
                        >
                        Description
                        </label>
                        <textarea name="description"
                        onChange={handleChange}
                        value={department.description}
                         className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                         placeholder="description"
                         >                        
                         </textarea>
                    </div>
                    <button type="submit"
                     className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-semibold p-3 rounded-md">
                    Edit Department
                    </button>
                </form>
            </div>
        </div>
        }</>
    );
}


export default EditDepartment