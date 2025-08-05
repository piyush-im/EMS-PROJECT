import React from "react";
import Sidebar from "../Components/EmployeeDashboard/Sidebar";
import {Outlet} from "react-router-dom";
import Navbar from "../Components/dashboard/Navbar";


const EmployeeDashboard=()=>{
    return(
         <div className="flex">  
            <Sidebar />
            <div className="flex-1 ml-64 bg-gray-100 h-screen">
                <Navbar />
               
                {/* Renders the nested route (departments, etc.) */}
                <Outlet />
            </div>             
        </div>
    );
}


export default EmployeeDashboard