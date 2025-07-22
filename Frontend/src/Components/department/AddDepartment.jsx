import React,{useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";


const AddDepartment=()=>{
    const [department,setDepartment]=useState({
        dep_name:'',
        description:''
    })

    const navigate =useNavigate()

    const handleChange=(e)=>{
        const {name,value} = e.target;
        setDepartment({...department, [name] : value})
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/department/add', department, {
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
    };
    

    return(
        <div>
            <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
                <h3 className="text-2xl font-bold mb-6">Add Department</h3>
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
                         className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                         placeholder="description"
                         >                        
                         </textarea>
                    </div>
                    <button type="submit"
                     className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-semibold p-3 rounded-md">
                    Add Department
                    </button>
                </form>
            </div>
        </div>
    );
};


export default AddDepartment;