import {
  GitBranch,
  Calendar,
  Layers,
  DoorOpen,
  BookOpen,
  User,
  FlaskConical,
  School,
} from "lucide-react";

const nodeTypes = [
  {
    type: "college",
    title: "College",
    icon: School,
    description: "College selection",
    color: "text-blue-500",
    bg: "bg-blue-100",
    parent: null,
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
  {
    type: "room",
    title: "Room",
    icon: DoorOpen,
    description: "Room allocation",
    color: "text-teal-500",
    bg: "bg-teal-100",
  },
  {
    type: "subject",
    title: "Subject",
    icon: BookOpen,
    description: "Course subjects",
    color: "text-indigo-500",
    bg: "bg-indigo-100",
  },
  {
    type: "faculty",
    title: "Faculty",
    icon: User,
    description: "Teacher assignment",
    color: "text-yellow-500",
    bg: "bg-yellow-100",
  },
  {
    type: "lab",
    title: "Lab",
    icon: FlaskConical,
    description: "Laboratory sessions",
    color: "text-red-500",
    bg: "bg-red-100",
  },
];

export default nodeTypes;
