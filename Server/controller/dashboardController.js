import Department from "../Models/Department.js";
import Employee from "../Models/Employee.js";
import Leave from "../Models/leave.js";
import Salary from "../Models/Salary.js";

const getSummary = async (req, res) => {
  try {
    const totalEmployee = await Employee.countDocuments();
    const totalDepartment = await Department.countDocuments();

    // Sum all salary values
    const totalSalaryAgg = await Salary.aggregate([
      {
        $group: {
          _id: null,
          totalSalary: { $sum: "$salary" }
        }
      }
    ]);

    // Count unique employees who applied for leave
    const employeeAppliedForLeaves = await Leave.distinct("employeeId");

    // Group leave statuses
    const leaveStatus = await Leave.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);

    const leaveSummary = {
      appliedFor: employeeAppliedForLeaves.length,
      approved: leaveStatus.find(item => item._id === "Approved")?.count || 0,
      rejected: leaveStatus.find(item => item._id === "Rejected")?.count || 0,
      pending: leaveStatus.find(item => item._id === "Pending")?.count || 0
    };

    return res.status(200).json({
      success: true,
      totalEmployee,
      totalDepartment,
      totalSalary: totalSalaryAgg[0]?.totalSalary || 0,
      leaveSummary
    });
  } catch (error) {
    console.error("Error fetching summary:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export { getSummary };
