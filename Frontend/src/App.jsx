import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from "./Pages/Login";
import AdminDashboard from "./Pages/AdminDashboard";
import EmployeeDashboard from "./Pages/EmployeeDashboard";
import PrivateRoutes from './Utils/PrivateRoutes';
import RoleBasedRoutes from './Utils/RoleBasedRoutes';

// Admin components
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
import Table from './Components/Leave/Table.jsx'

// Employee components
import Summary from './Components/EmployeeDashboard/Summary.jsx';
import LeaveList from './Components/Leave/List.jsx';
import AddLeave from './Components/Leave/Add.jsx';
import Setting from './Components/EmployeeDashboard/Setting.jsx';
import Dtails from './Components/Leave/Details.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin-dashboard" />} />
        <Route path="/login" element={<Login />} />

        {/* ---------------- Admin Dashboard with Nested Routes ---------------- */}
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoutes>
              <RoleBasedRoutes requiredRole={["admin"]}>
                <AdminDashboard />
              </RoleBasedRoutes>
            </PrivateRoutes>
          }
        >
          {/* Dashboard Home */}
          <Route index element={<AdminSummary />} />

          {/* Departments */}
          <Route path="departments" element={<DepartmrntList />} />
          <Route path="add-department" element={<AddDepartment />} />
          <Route path="department/:id" element={<EditDepartment />} />

          {/* Employees */}
          <Route path="employees" element={<List />} />
          <Route path="add-employee" element={<Add />} />
          <Route path="employees/:id" element={<View />} />
          <Route path="employees/edit/:id" element={<Edit />} />

          {/* Leaves */}
          <Route path="leaves" element={<Table />} />
          <Route path="leaves/:id" element={<Dtails />} />
          <Route path="employees/leaves/:id" element={<LeaveList />} />

          {/* Salary */}
          <Route path="employees/salary/:id" element={<ViewSalary />} />

          <Route path="salary/add" element={<AddSalary />} />
        </Route>

        {/* ---------------- Employee Dashboard with Nested Routes ---------------- */}
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
          {/* Dashboard Home */}
          <Route index element={<Summary />} />

          {/* Profile */}
          <Route path="profile/:id" element={<View />} />

          {/* Leaves */}
          <Route path="leaves" element={<LeaveList />} /> {/* ✅ Added */}
          <Route path="leaves/:id" element={<LeaveList />} /> 
          <Route path="add-leave" element={<AddLeave />} />

          {/* Salary */}
          <Route path="salary/:id" element={<ViewSalary />} />

          {/* Settings */}
          <Route path="setting" element={<Setting />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
