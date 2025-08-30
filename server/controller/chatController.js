const Conversation = require("../models/conversation");
const Message = require("../models/messages");
const { v4: uuidv4 } = require("uuid");
const { GoogleGenAI } = require("@google/genai");
const { generativeAIResponse } = require("../utility/generateTitle.js");
const messages = require("../models/messages");

const ai = new GoogleGenAI(process.env.GEMINI_API_KEY);

const sendMessage = async (req, res) => {
  const { conversationId, userPrompt } = req.body;
  const userId = req.user?.id; 

  // console.log(conversationId);

  let conversation = conversationId
    ? await Conversation.findById(conversationId).populate("user")
    : null;
  if (!conversation) {
    const titlePrompt = `Summarize the following message into a short conversation title (max 5 words): "${userPrompt}"`;
    const aiTitle = await generativeAIResponse(titlePrompt);
    // console.log(aiTitle)
    conversation = await Conversation.create({ user: userId, title: aiTitle });
    conversation = await Conversation.findById(conversation._id).populate(
      "user"
    );
    // console.log("chatController",conversation)
  }

  // console.log("populate.....",conversation)
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
  // console.log("modelres ln 51",modelResponse)

  await Message.create({
    conversationId: conversation._id,
    role: "model",
    content: modelResponse,
  });

  await history.push({
    role: "model",
    parts: [{ text: modelResponse }],
  });

  // console.log("line 64 history", history)

  return res.json({ conversation,modelResponse, history });
};

//may be delete later
const getMessage = async (req, res) => {
  try{
    const userId = req.user?.id;
    if(!userId){
      return res.json([])
    }
  let conversation = await Conversation.find({ user: userId });
  let allTitle = conversation.map((item) => ({
    title: item.title,
    conversationId: item._id,
  }));
  
  res.json(allTitle);
  }
  catch{
    console.log("chatController line 85 error")
    res.json({message:"titles are empty"})
  }
};
//   const { id } = req.params;
//   const pastMessages = await Message.find({
//     conversationId: id,
//   }).sort({ createdAt: 1 });
// //   console.log(pastMessages);
// console.log("get title users " ,req.user.id)
// let conversationId = conversation.map(item=> item._id)
// console.log("get title users conversationsID" , allTitle)

const allMessages = async (req, res) => {
  const { id } = req.params;
  const allMessages = await Message.find({ conversationId: id });
  //  console.log("conversationid for all messages",allMessages)
  res.json(allMessages);
};

module.exports = { sendMessage, getMessage, allMessages };
