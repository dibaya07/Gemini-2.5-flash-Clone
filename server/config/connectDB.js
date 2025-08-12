const mongoose = require("mongoose")

const connectDB = async ()=>{
    await mongoose.connect(process.env.CONNECTION_STRING)
    .then(()=>{
        console.log("Database connected...")
    })
    .catch((error)=>{
        console.log("Database error")
    })
}

module.exports=connectDB