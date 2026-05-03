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
    children: ["college"],

    modal: null,

    defaultData: {
      label: "Start",
    },
  },

  {
    type: "college",
    title: "College",
    icon: School,
    description: "College selection",
    color: "text-blue-500",
    bg: "bg-blue-100",

    parent: "start",
    children: ["branch"],

    modal: "college",

    defaultData: {
      label: "",
      timings: "",
      lunch: "",
      branches: 0,
    },
  },

  {
    type: "branch",
    title: "Branch",
    icon: GitBranch,
    description: "Branch logic",
    color: "text-purple-500",
    bg: "bg-purple-100",

    parent: "college",
    children: ["year"],

    modal: "branch",

    defaultData: {
      label: "",
      timings: "",
      faculty: 0,
      subjects: 0,
    },
  },

  {
    type: "year",
    title: "Year",
    icon: Calendar,
    description: "Academic year",
    color: "text-orange-500",
    bg: "bg-orange-100",

    parent: "branch",
    children: ["section"],

    modal: "year",

    defaultData: {
      label: "",
      semesters: 2,
    },
  },

  {
    type: "section",
    title: "Section",
    icon: Layers,
    description: "Class sections",
    color: "text-pink-500",
    bg: "bg-pink-100",

    parent: "year",
    children: [],

    modal: "section",

    defaultData: {
      label: "",
      strength: 60,
    },
  },
];

export default nodeTypes;