import messageListenerInit from "./message.listener.js";
import nodesListenerInit from "./nodes.listener.js";

const initSocketListeners = () => {
  messageListenerInit();
  nodesListenerInit();
};

export default initSocketListeners;
