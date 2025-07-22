import Department from '../Models/Department.js'

const getDepartments = async (req, res) => {
    try {
        const departmenta = await Department.find();
        return res.status(200).json({ success: true, departments: departmenta });
    } catch (error) {
        return res.status(500).json({ success: false, error: "get department server error" })
    }
}

const addDepartment = async (req, res) => {
    try {
        const { dep_name, description } = req.body;
        const newDep = new Department({
            dep_name,
            description
        })
        await newDep.save();
        return res.status(200).json({ success: true, department: newDep });

    } catch (error) {
        res.status(500).json({ success: false, error: "Server error in add department" })
    }
}

const getDepartment = async (req, res) => {
    try {
        const { id } = req.params; // Corrected the typo here
        const departmenta = await Department.findById({ _id: id });
        if (!departmenta) {
            return res.status(404).json({ success: false, error: "Department not found" });
        }
        return res.status(200).json({ success: true, department: departmenta });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Server error in getting department" })
    }
}

const updateDepartment = async (req, res) => {
    try {
        const { id } = req.params; // Corrected the typo here
        const { dep_name, description } = req.body;
        const updateDep = await Department.findByIdAndUpdate({ _id: id }, {
            dep_name,
            description
        })
        return res.status(200).json({ success: true, departments: updateDep });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Server error in updating department" })
    }
}

const deleteDepartment = async (req, res) => {
    try {
        const { id } = req.params; // Corrected the typo here
        
        const dletedep = await Department.findByIdAndDelete({ _id: id })
        return res.status(200).json({ success: true, dletedep });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Server error in deleting department" })
    }

}

export { addDepartment, getDepartments, getDepartment, updateDepartment,deleteDepartment };
