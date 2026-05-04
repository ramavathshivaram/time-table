import nodeTools from "./node.tools.js";
import edgeTools from "./edge.tools.js";
import facultyTools from "./faculty.tools.js";
import subjectTools from "./subject.tools.js";
import roomTools from "./room.tools.js";

const allTools = [
  ...Object.values(nodeTools),
  ...Object.values(edgeTools),
  ...Object.values(facultyTools),
  ...Object.values(subjectTools),
  ...Object.values(roomTools),
];

export const toolsByName = Object.fromEntries(
  allTools.map((tool) => [tool.name, tool]),
);

export default Object.values(toolsByName);
