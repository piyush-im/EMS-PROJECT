const authRoutes = require('./routes/auth');
import bcrypt from 'bcryptjs';
    
import connectToDatatbase from './db/db.js'

const userRegister=async()=>{
    connectToDatatbase()
    try{
        const hashpassword=await bcrypt.hash("admin",10)
        const newUser=new User({

            name:"Admin",
            email:"admin@gmail.com",
            password:hashpassword,
            role:"admin"
        })
        await newUser.save()
    }catch(error){
        console.log(error);
    }
}

userRegister();