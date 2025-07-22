import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const columns = [
    {
        name: "S No",
        selector: (row) => row.sno,
        width:"120px"
    },
    {
        name: "NAME",
        selector: (row) => row.name,
        sortable: true,
        width:"150px"
    },

    {
        name: "IMAGE",
        selector: (row) => row.profileImage,
       width:"150px"
    },

    {
        name: "DOB",
        selector: (row) => row.dob,
        width:"150px"
       
    },  

    {
        name: "DEPARTMENT",
        selector: (row) => row.dep_name,
        width:"150px"
    },

    {
        name: "ACTION",
        selector: (row) => row.action,
        $center:true,
    },

]

export const fetchDepartments = async () => {
    let departments

    try {
        const response = await axios.get('http://localhost:5000/api/department', {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        });
        if (response.data.success) {
            departments=response.data.departments
        }
    } catch (error) {
        if (error.response && error.response.data) {
            const errorMessage = error.response.data.error || 'An error occurred';
            alert(errorMessage);
        } else {
            alert('Something went wrong!');
        }
    } 
    return departments;
};

// fetch employee from slary
export const getEmployees=async (id)=>{
    let employees;
    try{
        const response=await axios.get(`http://localhost:5000/api/employee/department/${id}`,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`,
            }
    });
    // console.log(response.data);
    
    if(response.data.success){
        employees=response.data.employees
    }


    }catch (error) {
        // console.log(error);
        
        if (error.response && error.response.data) {
            const errorMessage = error.response.data.error || 'An error occurred';
            alert(errorMessage);
        } else {
            alert('Something went wrongss!');
        }
    } 
    return employees
}

export const EmployeeButtons = ({ Id }) => {
    const navigate = useNavigate()

  

    return (
        <div className="flex space-x-3">
            <button className="px-4 py-1 bg-green-600 text-white"
                onClick={() => navigate(`/admin-dashboard/employees/${Id}`)}
            >
                View
            </button>


            <button className="px-4 py-1 bg-blue-600 text-white"
            onClick={()=>navigate(`/admin-dashboard/employees/edit/${Id}`)}
               
            >
                Edit
            </button>

            <button className="px-4 py-1 bg-yellow-600 text-white"
               onClick={()=>navigate(`/admin-dashboard/employees/salary/${Id}`)}
            >
                Salary
            </button>

            <button className="px-4 py-1 bg-red-600 text-white"
               
            >
                Leave
            </button>

        </div>
    )
}