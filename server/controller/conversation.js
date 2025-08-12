const Conversation = require('../models/conversation')
const { v4: uuidv4 } = require('uuid');


const createConversation = async(req,res)=>{
    const sessionId=uuidv4();
    const conversation =new Conversation({sessionId})
    await conversation.save()
}