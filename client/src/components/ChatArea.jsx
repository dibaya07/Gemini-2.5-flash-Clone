import React from "react";
import "../../src/components/ChatArea.css";

import { v4 as uuidv4 } from "uuid";

export default function ChatArea({ history,recentPrompt }) {
  return (
    <div className="flex-grow  overflow-y-scroll scrollbar-hide">

      <ul className="flex flex-col items-center">
        {history?.map((item) => {
          return (
            item.role === "user" ? (
              <div className="flex justify-end px-4 py-2  w-3/4" key={uuidv4()}>
                <li className="text-white w-fit px-2 text-xl font-normal bg-[#3e3e3f] text-end  flex-wrap">
                  {item.parts[0].text}
                </li>
              </div>
            ) : (
              <div className="flex justify-start px-4 py-2  w-3/4" key={uuidv4()}>
                <li className="text-white w-fit px-2 text-xl font-normal bg-[#3e3e3f]  flex-wrap">
                  {item.parts[0].text}
                </li>
              </div>
            )
          );
        })}
        {
          recentPrompt &&  <><div className="flex justify-end px-4 py-2  w-3/4" >
                <li className="text-white w-fit px-2 text-xl font-normal bg-[#3e3e3f] text-end  flex-wrap">
                  {recentPrompt}
                </li>
              </div>
              <div className="flex justify-start px-4 py-2  w-3/4" key={uuidv4()}>
                <li className="text-white w-fit px-2 text-xl font-normal bg-[#3e3e3f]  flex-wrap">
                  Thinking ...
                </li>
              </div></>
        }
      </ul>
    </div>
  );
}
