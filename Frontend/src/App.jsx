import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from "./Pages/Login";
import AdminDashboard from "./Pages/AdminDashboard";
import EmployeeDashboard from "./Pages/EmployeeDashboard";
import PrivateRoutes from './Utils/PrivateRoutes';
import RoleBasedRoutes from './Utils/RoleBasedRoutes';

import AdminSummary from "./Components/dashboard/AdminSummary";
import DepartmrntList from "./Components/department/DepartmrntList";
import AddDepartment from "./Components/department/AddDepartment";
import EditDepartment from "./Components/department/EditDepartment";
import List from "./Components/employee/List";
import Add from "./Components/employee/Add";
import View from './Components/employee/View';
import Edit from './Components/employee/Edit';
import AddSalary from "./Components/Salary/Add";
import ViewSalary from './Components/Salary/View.jsx';
import Summary from './Components/EmployeeDashboard/Summary.jsx'
import LeaveList from './Components/Leave/List.jsx';
import AddLeave from './Components/Leave/Add.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin-dashboard" />} />
        <Route path="/login" element={<Login />} />

        {/* Admin Dashboard */}
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoutes>
              <RoleBasedRoutes requiredRole={["admin"]}>
                <AdminDashboard />
              </RoleBasedRoutes>
            </PrivateRoutes>
          }
        />

        <Route path="/admin-dashboard/departments" element={<DepartmrntList />} />
        <Route path="/admin-dashboard/add-department" element={<AddDepartment />} />
        <Route path="/admin-dashboard/department/:id" element={<EditDepartment />} />

        <Route path="/admin-dashboard/employees" element={<List />} />
        <Route path="/admin-dashboard/add-employee" element={<Add />} />
        <Route path="/admin-dashboard/employees/:id" element={<View />} />
        <Route path="/admin-dashboard/employees/edit/:id" element={<Edit />} />

        <Route path="/admin-dashboard/employees/salary/:id" element={<ViewSalary />} />
        <Route path="/admin-dashboard/salary/add" element={<AddSalary />} />

        {/* Employee Dashboard */}
       {/* Employee Dashboard */}
  <Route
     path="/employee-dashboard"
     element={
     <PrivateRoutes>
      <RoleBasedRoutes requiredRole={["admin", "employee"]}>
        <EmployeeDashboard />
      </RoleBasedRoutes>
      </PrivateRoutes>
    }
    >
  <Route class name='mt-5' index element={<Summary />} />
  <Route path="profile/:id" element={<View />} />
  <Route path="leaves" element={<LeaveList />} />
<Route path="add-leave" element={<AddLeave />} />
    <Route path="/employee-dashboard/salary/:id" element={< View/>}/>
</Route>



        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
