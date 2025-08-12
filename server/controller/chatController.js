const Conversation = require("../models/conversation");
const Message = require("../models/messages");
const { v4: uuidv4 } = require("uuid");
const { GoogleGenAI } = require("@google/genai");
const {generativeAIResponse} = require('../utility/generateTitle.js')

const ai = new GoogleGenAI(process.env.GEMINI_API_KEY);

const sendMessage = async (req, res) => {
  const { conversationId, userPrompt } = req.body;

//   console.log(req.body);


  let conversation = conversationId
    ? await Conversation.findById(conversationId)
    : null;
  if (!conversation) {
       const titlePrompt = `Summarize the following message into a short conversation title (max 5 words): "${userPrompt}"`
        const aiTitle= await generativeAIResponse(titlePrompt)
        console.log(aiTitle)
    conversation = await Conversation.create({ title: aiTitle });
  }

  await Message.create({
    conversationId: conversation._id,
    role: "user",
    content: userPrompt,
  });

  const pastMessages = await Message.find({
    conversationId: conversation._id,
  }).sort({ createdAt: 1 });

  const history = pastMessages.map((msg) => ({
    role: msg.role === "user" ? "user" : "model",
    parts: [{ text: msg.content }],
  }));

  const result = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: history,
  });

  const modelResponse = result.text;

  await Message.create({
    conversationId: conversation._id,
    role: "model",
    content: modelResponse,
  });

  await history.push({
  
    role: "model",
     parts: [{ text: modelResponse }],
   
  });

  return res.json({ conversation, history });
};


//may be delete later
const getMessage = async (req, res) => {
  const { id } = req.params;
  const pastMessages = await Message.find({
    conversationId: id,
  }).sort({ createdAt: 1 });
//   console.log(pastMessages);
  return res.json(pastMessages);
};

module.exports = { sendMessage, getMessage };
