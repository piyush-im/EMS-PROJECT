import multer from "multer";
import Employee from "../Models/Employee.js"
import User from "../Models/User.js"
import bcrypt from "bcryptjs"
import path from "path"
import Department from "../Models/Department.js"

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"publlic/uploads")
    },
    filname:(req,file,cb)=>{
        cb(null,Date.now()+path.extname(file.originalname))
    }
})
const upload=multer({storage:storage});

    const addemployee =async(req,res) =>{
        try {
        const {
            name,
            email,
            employeeId,
            dob,
            maritalStatus,
            designation,
            department,
            salary,
            gender,
            password,
            role,
        }=req.body;
        console.log(req.body);
        

        const user=await User.findOne({email})
        
          if(user){
                return res.status(400).json({success:false,error:"User already registered"})
            }

            const hashPassword =await bcrypt.hash(password,10)

            const newUser= new User({
                name,
                email,
                password:hashPassword,
                role,
                profileImage:req.file ? req.file.filename : "",
                
            })
            
            const savedUser =await newUser.save()
            const newEmployee= new Employee({
                userId: savedUser._id,
                employeeId,
                dob,
                gender,
                maritalStatus,
                designation,
                department,
                salary,
            })

            await newEmployee.save()
            return res.status(200).json({success:true,message:"Employee cretae successfully"})
        } catch (error) {
            
            console.log(error);
            
            return res.status(500).json({success:false,error:"Internal server error"})
        }

        

    }

    const getEmployees=async(req,res) => {
        try {
            const employees = await Employee.find().populate('userId',{password:0}).populate("department")
            return res.status(200).json({ success: true, employees });
        } catch (error) {
            return res.status(500).json({ success: false, error: "get employees server error" })
        }
    }

    const getEmployee=async(req,res) => {
        const { id } = req.params; // Corrected the typo here
        
        try {
            const employee= await Employee.findById({_id:id}).populate('userId',{password:0}).populate("department")
            return res.status(200).json({ success: true, employee});
        } catch (error) {
            console.log(error);
            
            return res.status(500).json({ success: false, error: "get employees server error" })
        }
    }
    
    const updateEmployee=async(req,res)=>{
        const {id}=req.params; // Corrected the typo here
        try{
            
            const {
                name,            
                maritalStatus,
                designation,
                department,
                salary,
               
            }=req.body;
            // console.log(req.body);
            const employee=await Employee.findById({_id:id})
            if(!employee){
                return res.status(404).json({success:false,error:"Employee not found"})
            }
            const user=await User.findById({_id:employee.userId})
            if(!user){
                return res.status(404).json({success:false,error:"User not found"})
            }
            const updateUser=await User.findByIdAndUpdate({_id:employee.userId},{name})
            const updateEmployee=await Employee.findByIdAndUpdate({_id:id},{
                maritalStatus,
                designation,
                salary,
                department
            })
            if(!updateEmployee || updateUser){
                // console.log(updateEmployee,updateUser);
                
                return res.status(200).json({success:true,message:"Employee updated successfully"})
            }
           
            
        }catch (error) {
            console.log(error);
            
            return res.status(500).json({ success: false, error: "Edit Employee server error" })
        }

    }

    const fetchEmployeesByDepId=async(req,res)=>{
        const {id}=req.params;
        try{
            const employees=await Employee.find({department:id})
            return res.status(200).json({success:true,employees})

        }catch (error) {
            return res.status(500).json({success:false,error:"get EmployeesByDepId server error"})
        }

    }

    export { addemployee,upload,getEmployees,getEmployee,updateEmployee,fetchEmployeesByDepId}