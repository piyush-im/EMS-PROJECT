import { useNavigate } from "react-router-dom"
import axios from "axios"

export const columns = [
    {
        name: "S No",
        selector: (row) => row.sno
    },
    {
        name: "Department Name",
        selector: (row) => row.dep_name,
        sortable: true
    },
    {
        name: "Action",
        selector: (row) => row.action
    },
]

export const DepartmentButtons = ({ _id }) => {
    const navigate = useNavigate()

    const handleDelete = async (id, onDepartmentDelete) => {
        const confirm = window.confirm('Are you sure you want to delete')
        if (confirm) {
            try {
                const response = await axios.delete(`http://localhost:5000/api/department/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (response.data.success) {
                    onDepartmentDelete(id)
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
    }

    return (
        <div className="flex space-x-3">
            <button className="px-4 py-1 bg-teal-600 text-white"
                onClick={() => navigate(`/admin-dashboard/department/${_id}`)}
            >
                Edit
            </button>
            <button className="px-4 py-1 bg-red-600 text-white"
                onClick={() => handleDelete(_id)} // Corrected here
            >
                Delete
            </button>
        </div>
    )
}
