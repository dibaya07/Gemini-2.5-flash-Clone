import React, { useEffect, useRef, useState } from "react";
import "../../src/components/ChatArea.css";

import { v4 as uuidv4 } from "uuid";

// function WordByWordText({ text, speed = 300 }) {
//   const words = text.split(" ");
//   const [displayedText, setDisplayedText] = useState([]);
//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     if (index < words.length) {
//       const timer = setTimeout(() => {
//         setDisplayedText((prev) => [...prev, words[index]]);
//         setIndex(index + 1);
//       }, speed);
//       return () => clearTimeout(timer);
//     }
//   }, [index, words, speed]);

//   return <>{displayedText.join(" ")}</>;
// }

export default function ChatArea({
  history,
  recentPrompt,
  isOldHistory,
  setIsOldHistory,
}) {
  // useEffect(() => {
  //   setIsOldHistory(true)
  // }, [])

  const bottomRef = useRef(null);
  useEffect(() => {
    bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [history, recentPrompt]);

  return (
    <div className="flex-grow  overflow-y-scroll scrollbar-hide">
      <ul className="flex flex-col items-center">
        {history?.map((item, idx) => {
          // if( item.role === "model"){
          //   let answer = item.parts[0].text.split(" ")
          // }
          return item.role === "user" ? (
            <div
              className="flex justify-end px-4 py-2  w-3/4"
              key={item._id || idx}
            >
              <li className="text-white w-fit px-2 text-xl font-normal bg-[#3e3e3f] text-end  flex-wrap">
                {isOldHistory ? item.content : item.parts[0].text}
              </li>
            </div>
          ) : (
            <div
              className="flex justify-start px-4 py-2  w-3/4"
              key={item._id || idx}
            >
              <li className="text-white w-fit px-2 text-xl font-normal bg-[#3e3e3f]  flex-wrap">
                {isOldHistory ? item.content : item.parts[0].text}
                {/* <WordByWordText text={item.parts[0].text} speed={250} /> */}
              </li>
            </div>
          );
        })}
        {recentPrompt && (
          <>
            <div className="flex justify-end px-4 py-2  w-3/4">
              <li className="text-white w-fit px-2 text-xl font-normal bg-[#3e3e3f] text-end  flex-wrap">
                {recentPrompt}
              </li>
            </div>
            <div className="flex justify-start px-4 py-2  w-3/4">
              <li className="text-white w-fit px-2 text-xl font-normal bg-[#3e3e3f]  flex-wrap">
                Thinking ...
              </li>
            </div>
          </>
        )}
      </ul>
      <div ref={bottomRef} />
    </div>
  );
}
