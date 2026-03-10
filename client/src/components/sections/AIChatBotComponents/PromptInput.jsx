import { Send } from "lucide-react";
import React from "react";
import PromptInputsubmit from "./PromptInputsubmit";

const PromptInput = () => {
  return (
    <div className="absolute bottom-0 w-full flex items-center border-t p-2 gap-2">
      <input
        className="flex-1 text-sm px-2 py-1 outline-none"
        placeholder="Ask something..."
      />

      <PromptInputsubmit />
    </div>
  );
};

export default PromptInput;
