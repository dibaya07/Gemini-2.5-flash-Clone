const Message = require('../models/messages')
const Conversation = require('../models/conversation')
const {generativeAIResponse} = require('../utils/generateTitle.js')


const addMessage = async(req,res)=>{
    const {conversationId,role,content} = req.body
    const messageCount= await Message.countDocuments({conversationId})
    if(messageCount === 1){
        const titlePrompt = `Summarize the following message into a short conversation title (max 5 words): "${message}"`
        const aiTitle= await generativeAIResponse(titlePrompt)
        await Conversation.findByIdAndUpdate(conversationId,{
            title:aiTitle
        })
    }

    const message =new Message({conversationId,role,content})
    await message.save()
    return res.json(userMessage)
}

// const 