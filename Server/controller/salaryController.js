import Salary from "../Models/Salary.js";
import Employee from "../Models/Employee.js";

// Add Salary
const addSalary = async (req, res) => {
  try {
    const { employeeId, basicSalary, allowances, deductions, payDate } = req.body;

    const totalSalary =
      parseInt(basicSalary) + parseInt(allowances) - parseInt(deductions);

    const newSalary = new Salary({
      employeeId,
      basicSalary,
      allowances,
      deductions,
      netSalary: totalSalary,
      payDate,
    });

    await newSalary.save();

    return res.status(200).json({ success: true, message: "Salary added successfully" });
  } catch (error) {
    console.error("Error saving salary:", error);
    return res
      .status(500)
      .json({ success: false, error: "Error saving salary" });
  }
};

// Get Salary
const getSalary = async (req, res) => {
  try {
    const { id, role } = req.params;
    console.log("Role:", role);

    let salary;

    if (role === "admin") {
      // Admin can directly fetch salaries by employeeId
      salary = await Salary.find({ employeeId: id }).populate(
        "employeeId",
        "employeeId name"
      );
    } else {
      // User role → find employee linked to userId
      const employee = await Employee.findOne({ userId: id });

      if (!employee) {
        return res.status(404).json({ success: false, error: "Employee not found" });
      }

      salary = await Salary.find({ employeeId: employee._id }).populate(
        "employeeId",
        "employeeId name"
      );
    }

    return res.status(200).json({ success: true, salary });
  } catch (error) {
    console.error("Error fetching salary:", error);
    return res
      .status(500)
      .json({ success: false, error: "Salary get server error" });
  }
};

export { addSalary, getSalary };
