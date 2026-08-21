import { useEffect } from "react";

import { registerMessageListeners } from "../socket/message.listeners";

export const useMessageListeners = () => {
  useEffect(() => {
    return registerMessageListeners();
  }, []);
};
