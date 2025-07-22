import React, { useEffect,useState} from "react";
import { fetchDepartments } from "../../Utils/EmployeeHelper";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Edit=()=>{
    const [employee,setEmployee]=useState(
        {
            name:'',
            maritalStatus:'',
            designation:'',
            salary:0,
            department:''
        }
    );
    const [departments,setDepartments]=useState(null);
    const navigate=useNavigate();
    const {id}=useParams();

    useEffect(()=>{
            const getDepartments= async()=>{
            const departments=await fetchDepartments()
            setDepartments(departments);
            }
            getDepartments();
    
        },[]);

    useEffect(()=>{
        const fetchEmployee=async()=>{
           
            try{
                const response=await axios.get(`http://localhost:5000/api/employee/${id}`,{
                    headers:{
                        "Authorization":`Bearer ${localStorage.getItem('token')}`
                    }
                });
                //console.log(response.data)
                
                if(response.data.success){
                    const employee=response.data.employee;
                    setEmployee((prev)=>({
                        ...prev, name:employee.userId.name,
                        maritalStatus:employee.maritalStatus,
                        designation:employee.designation,
                        salary:employee.salary,
                        department:employee.department
                    }));
                }
            }catch(error){
                if (error.response && error.response.data) {
                    // Check for specific error structure
                    const errorMessage = error.response.data.error || 'An error occurred';
                    alert(errorMessage);
                } else {
                    alert('Something went wrong!');
                }

            }
        }
        fetchEmployee();

    },[]);

    const handleChange=(e)=>{
        const {name,value} = e.target
        
        setEmployee((prevData)=>({...prevData, [name] : value}));
        

    }
    const handleSubmit=async(e)=>{
        e.preventDefault();


        try {
            const response = await axios.put(`http://localhost:5000/api/employee/${id}`, employee, {
                headers: {  // Note: `header` -> `headers`
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.data.success) {
                alert("Employee updated successfully");
                navigate("/admin-dashboard/employees");
            }
        } catch (error) {
            console.error(error);
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
        <>{departments && employee ? (
        <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-6">Edit Employee</h2>
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
                            value={employee.name}
                            onChange={handleChange}
                            placeholder="Insert Name"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    
                    

                    {/* Marital Sattus */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                        Marital Satus
                        </label>
                        <select
                         
                            
                            name="maritalstatus"
                            onChange={handleChange}
                            value={employee.maritalStatus}
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
                            value={employee.designation}
                            placeholder="Insert Designation"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            required
                        />
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
                            value={employee.salary}
                            placeholder="Insert Salary"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                           {/* Department */}
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700">
                        Department
                        </label>
                        <select
                         
                            
                            name="department"
                            onChange={handleChange}
                            value={employee.department}
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            required
                            >
                                <option value="">Select Department</option>
                               {departments.map(dep=>(
                                      <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
                               ))} 
                               
                        </select>
                    </div>  
                                           
                 </div>

                 <button
                 type="submit"
                 className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 "
                 > Edit Department                  
                 </button>
            </form>

        </div>
        ) : <div>Loading...</div>}</>
    )
}

export default Edit;