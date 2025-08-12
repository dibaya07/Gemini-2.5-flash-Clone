const mongoose = require("mongoose")



const messageSchema=mongoose.Schema({
    conversationId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"conversations",
        required:true,
    },
    role:{
        type:String,
        enum:['user','model'],
         required:true,
    },
    content:{
        type:String,
         required:true,
    }
},{timestapms:true})

module.exports=mongoose.model("Message",messageSchema)