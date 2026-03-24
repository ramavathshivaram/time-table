import { GitBranch, Calendar, Layers, School, Play } from "lucide-react";

const nodeTypes = [
  {
    type: "start",
    title: "Start",
    icon: Play,
    description: "Start of the workflow",
    color: "text-green-500",
    bg: "bg-green-100",
    parent: null,
  },
  {
    type: "college",
    title: "College",
    icon: School,
    description: "College selection",
    color: "text-blue-500",
    bg: "bg-blue-100",
    parent: "start",
  },
  {
    type: "branch",
    title: "Branch",
    icon: GitBranch,
    description: "Conditional logic",
    color: "text-purple-500",
    bg: "bg-purple-100",
    parent: "college",
  },
  {
    type: "year",
    title: "Year",
    icon: Calendar,
    description: "Academic year",
    color: "text-orange-500",
    bg: "bg-orange-100",
    parent: "branch",
  },
  {
    type: "section",
    title: "Section",
    icon: Layers,
    description: "Class sections",
    color: "text-pink-500",
    bg: "bg-pink-100",
    parent: "year",
  },
];

export default nodeTypes;
