const User = require('../models/user.js')
// const jwt = require('jsonwebtoken')
// const bcrypt = require("bcrypt")

// const userLogin = async(req,res)=>{
//     let {email,password} = req.body
//     if(!email || !password){
//         return res.status(400).json({message:"email,password between them something is missing"})
//     }
    
//     let user = await User.findone({email})
//     if(user){}
//     const hashed = await bcrypt.hash(password,10)
//     let token = await jwt.sign({email})

// }