import { Outlet, useLocation } from "react-router-dom";
import AdminSidebar from "../Components/dashboard/AdminSidebar";
import Navbar from "../Components/dashboard/Navbar";
import AdminSummary from "../Components/dashboard/AdminSummary";

const AdminDashboard = () => {
    const location = useLocation();

    return (
        <div className="flex">  
            <AdminSidebar />
            <div className="flex-1 ml-64 bg-gray-100 h-screen">
                <Navbar />
                
                {/* ✅ Show AdminSummary only on /admin-dashboard */}
                {location.pathname === "/admin-dashboard" && <AdminSummary />}

                {/* Renders the nested route (departments, etc.) */}
                <Outlet />
            </div>             
        </div>
    );
};

export default AdminDashboard;





