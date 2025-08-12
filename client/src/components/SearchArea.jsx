import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { IoSend } from "react-icons/io5";
import { GoogleGenAI } from "@google/genai";
// import { json } from "stream/consumers";

const SearchArea = ({
  searchRes,
  modelRes,
  userPromptData,
  displayPrompt,
  historyHandler,
  recentHistory,
  setRecentHistory,
}) => {
  // const [history, setHistory] = useState([])
  // const [prompt, setPrompt] = useState("");
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const ai = new GoogleGenAI({ apiKey });

  async function main() {
   try{
    
     const chat = ai.chats.create({
      model: "gemini-2.5-flash",
      history: [
        {
          role: "user",
          parts: [{ text: displayPrompt }],
        },
        {
          role: "model",
          parts: [{ text: modelRes }],
        },
      ],
      config: {
      thinkingConfig: {
        thinkingBudget: 0, // Disables thinking
      },
    }
    });

    const response1 = await chat.sendMessage({
      message: displayPrompt,
    });
    
    let fullResponse = response1.text
    fullResponse = fullResponse.split(/[:?!]/)
// console.log(fullResponse)
    await searchRes(response1.text);
    if (localStorage.getItem("History")) {
      let history = JSON.parse(localStorage.getItem("History"));
      history.includes(displayPrompt)?  history = [...history] : history = [displayPrompt, ...history];
      localStorage.setItem("History", JSON.stringify(history));
      await setRecentHistory(history);
    } else {
      localStorage.setItem("History", JSON.stringify([displayPrompt]));
      await setRecentHistory([displayPrompt]);
    }

    await historyHandler(displayPrompt, [...fullResponse]);
    await userPromptData("");
   }
   catch(e) {
    console.error(e)
   }
  }

  return (
    <>
      <div className="h-36 w-3/4 bg-transparent rounded-3xl border border-solid border-white text-white flex flex-col justify-center">
        <div className="input h-1/4 w-full flex justify-center items-center my-4">
          <input
            className="h-4/5 w-11/12 text-white bg-transparent "
            type="text"
            placeholder="enter your text"
            value={displayPrompt}
            onChange={(e) => userPromptData(e.target.value)}
          ></input>
        </div>

        <div className="submitBtn w-full text-center flex justify-between items-center my-4">
          <span className="ml-7 text-3xl">
            <IoMdAdd />
          </span>
          <button onClick={main} className="mr-7 text-3xl">
            <IoSend />
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchArea;

// const payload = {contents: [{parts: [{ text: prompt,},],},],};
// const main = async () => {
//   let response = await fetch(URL + apiKey, {
//     method: "POST",
//     body:JSON.stringify(payload)
//   });
//   response = await response.json()
// };
// console.log(response.candidates[0].content.parts[0].text)

// async function main() {
//   const response = await ai.models.generateContent({
//     model: "gemini-2.5-flash",
//     contents: prompt,
//      config: {
//     thinkingConfig: {
//       thinkingBudget: 0, // Disables thinking
//     },
//   }
//   });
//   console.log(response.text);
//   await searchRes(response.text);
// }

//   async function main() {
//   const chat = ai.chats.create({
//     model: "gemini-2.5-flash",
//     history: [
//       {
//         role: "user",
//       parts: [{ text: displayPrompt }],
//       },
//       {
//         role: "model",
//         parts: [{ text: modelRes }],
//       },
//     ],
//   });

//   const response1 = await chat.sendMessage({
//     message: displayPrompt ,
//   });
//   console.log("Chat response 1:", response1.text);

//   await searchRes(response1.text);

// }

// console.log(response.text);
// const response2 = await chat.sendMessage({
//   message: prompt,
// });
// console.log("Chat response 2:", response2.text);

// <p>{response}</p>

// console.log(allHistory)

// let results = {displayPrompt,modelRes}
// console.log(results)
// await setHistory(...allHistoryTaker,results)
// console.log(allHistoryTaker)
// await  historyHandler(
//     {
//       role: "user",
//     parts: [{ text: displayPrompt }],
//     },
//     {
//       role: "model",
//       parts: [{ text: modelRes }],
//     },)

// await historyHandler(history)
// console.log(historyHandler)

{
  /* <div className="extraBtns w-full flex justify-between"> </div> */
}
{
  /* <div className="inputBnts flex justify-evenly w-2/4 bg-red-400">
            <button>deep</button>
            <button>deep</button>
            </div> */
}


// userPromptData("")

    // console.log("Chat response 1:", response1.text);