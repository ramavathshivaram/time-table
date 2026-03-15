import edgesListenerInit from "./edges.listener.js";
import facultyListenerInit from "./faculty.listener.js";
import messageListenerInit from "./message.listener.js";
import nodesListenerInit from "./nodes.listener.js";
import roomListenerInit from "./room.listener.js";
import subjectListenerInit from "./subject.listener.js";

const initSocketListeners = () => {
  messageListenerInit();
  edgesListenerInit();
  facultyListenerInit();
  subjectListenerInit();
  roomListenerInit();
  nodesListenerInit();
};

export default initSocketListeners;
