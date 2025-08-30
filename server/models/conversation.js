const mongoose = require("mongoose")

const conversationSchema=mongoose.Schema({
    // sessionId:{
    //     type:String,
    //     required:true,
    // },
    user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            // required:true,
        },
    title:{
        type:String,
        default:"New Chat"
    }
},{timestapms:true})

module.exports=mongoose.model("Conversation",conversationSchema)