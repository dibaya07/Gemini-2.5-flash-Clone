const Conversation = require("../models/conversation");
const Message = require("../models/messages");
const { v4: uuidv4 } = require("uuid");
const {
  GoogleGenAI,
  createUserContent,
  createPartFromUri,
} = require("@google/genai");
const { generativeAIResponse } = require("../utility/generateTitle.js");
const messages = require("../models/messages");
const User = require("../models/user.js");
const fs = require("fs");
//  import * as fs from "node:fs";
const { cloudinary } = require("../cloudConfig.js");

const ai = new GoogleGenAI(process.env.GEMINI_API_KEY);

// console.log( req.body.conversationId);
// console.log(req.file.path);
// console.log("ln 19" , req.file)
// const rawImage = fs.readFileSync(req.file.path);
// console.log("ln 20" , rawImage)
// console.log("mimetype", req.file.mimetype)
// image = await ai.files.upload({
//   file:req.file.path,
//   config: { mimeType: req.file.mimetype },
// });
const sendMessage = async (req, res) => {
  try {
    const { conversationId, userPrompt } = req.body;
    const userId = req.user?.id || null;
    let image ,unsavedImage;
    if (req.file) {
      image = fs.readFileSync(req.file.path, {
        encoding: "base64",
      });
      unsavedImage = await cloudinary.uploader.upload(req.file.path, {
        folder: "Gemini-clone",
        allowedFormats: ["png", "jpg", "jpeg"],
      });
    }

    let conversation = conversationId
      ? await Conversation.findById(conversationId).populate("user")
      : null;
    if (!conversation) {
      const titlePrompt = `Summarize the following message into a short conversation title (max 5 words): "${userPrompt}"`;
      const aiTitle = await generativeAIResponse(titlePrompt);
      conversation = await Conversation.create({
        user: userId,
        title: aiTitle,
      });
      conversation = await Conversation.findById(conversation._id).populate(
        "user"
      );
    }
  

    // console.log("ln 58", unsavedImage);
    const savedImage = {
      url: unsavedImage?.url || null,
      // filename: unsavedImage?.filename,
    };


    if(req.file){
      fs.unlinkSync(req.file.path);
    }


    // console.log("cloudurl",savedImage.url)
    // console.log("cloudurl",typeof savedImage.url)

    await Message.create({
      conversationId: conversation._id,
      role: "user",
      content: userPrompt || null,
      image: savedImage.url || null,
    });

    const pastMessages = await Message.find({
      conversationId: conversation._id,
    }).sort({ createdAt: 1 });
    
    // console.log("this is pastmessage",pastMessages)
    const history = pastMessages.map((msg) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
      image:msg.image
    }));

    // console.log("this is history",[...history])
    let contents = [];
    if (req.file) {
      contents.push({
        inlineData: {
          mimeType: req.file.mimetype,
          data: image,
        },
      });
    }
    if (history && history.length >0) {
      history.forEach((prompt)=>{
        if(prompt.parts[0]?.text){
          contents.push({text: prompt.parts[0]?.text});
        }
        // console.log(prompt.parts[0].text)
      })
    }

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: contents,
    });

    // console.log(result.text);

    const modelResponse = result.text;
await Message.create({
  conversationId: conversation._id,
  role: "model",
  content: modelResponse,
});

history.push({
  role: "model",
  parts: [{ text: modelResponse }],
});

// console.log("this is final history",[...history])
console.log("sending response ...");
return res.json({ conversation, modelResponse, history });

  } catch (error) {
    console.log(error, "line 71 chat controller post method error ");
    if (!res.headersSent) {
      return res.status(500).json({ message: "post method error in ln 71" });
    }
  }
};

//      const content = [
//    {
//      inlineData: {
//        mimeType:  req.file.mimetype,
//        data: image,
//      },
//    },
//    { text: userPrompt },
//  ];

// mimeType: req.file.mimetype,
//  {
// data: rawImage,
// name: req.file.originalname,
// },
// console.log("ln 34", image);

// contents: createUserContent([
//   history,
//    createPartFromUri(image.uri, image.mimeType),
//   {
//     inlineData: {
//       mimeType: req.file.mimetype,
//       data: base64Image2File,
//     },
//   },
// ]),

// model: "gemini-2.5-flash",
// // contents: history,
//  contents: [
// createUserContent([
//   history,
//   createPartFromUri(image.uri, image.mimeType),
// ]),
// ],
// const modelResponse = result.text;
// await Message.create({
//   conversationId: conversation._id,
//   role: "model",
//   content: modelResponse,
// });

// history.push({
//   role: "model",
//   parts: [{ text: modelResponse }],
// });

// console.log("sending response ...");
// return res.json({ conversation, modelResponse, history });

const getMessage = async (req, res) => {
  try {
    if (req.user) {
      const userId = req.user?.id || null;
      const conversation = await Conversation.find({ user: userId });
      const userDetails = await User.findById(userId);
      const userName = userDetails ? userDetails.username : null;
      console.log(userName);
      let allTitle = conversation.map((item) => ({
        title: item.title,
        conversationId: item._id,
      }));
      return res.json({ allTitle, userName });
    } else {
      return res.json({ allTitle: [], userName: null });
    }
  } catch {
    console.log("chatController line 85 error");
    res.json({ message: "titles are empty" });
  }
};
// console.log("ln 97" , userName)
// console.log("ln 97" , "hello")
// const userName = conversation.
// console.log("ln 103 empty title array")
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
