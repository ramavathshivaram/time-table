import { Play, School, GitBranch, Calendar, Layers } from "lucide-react";

export const designerNodes = {
  start: {
    title: "Start",
    icon: Play,
    description: "Start timetable configuration",
    color: "text-green-500",
    bg: "bg-green-100",

    allowedParent: null,
    allowedChildren: ["institution"],

    modal: null,

    defaultData: {
      label: "Start",
    },
  },

  institution: {
    title: "Institution",
    icon: School,
    description: "Configure institution details",
    color: "text-blue-500",
    bg: "bg-blue-100",

    allowedParent: "start",
    allowedChildren: ["program"],

    modal: "institution",

    defaultData: {
      label: "",
      timings: "",
      lunch: "",
      programs: 0,
    },
  },

  program: {
    title: "Program",
    icon: GitBranch,
    description: "Configure academic program",
    color: "text-purple-500",
    bg: "bg-purple-100",

    allowedParent: "institution",
    allowedChildren: ["academic-year"],

    modal: "program",

    defaultData: {
      label: "",
      timings: "",
      faculty: 0,
      subjects: 0,
    },
  },

  academicYear: {
    title: "Academic Year",
    icon: Calendar,
    description: "Configure academic year",
    color: "text-orange-500",
    bg: "bg-orange-100",

    allowedParent: "program",
    allowedChildren: ["section"],

    modal: "academic-year",

    defaultData: {
      label: "",
      semesters: 2,
    },
  },

  section: {
    title: "Section",
    icon: Layers,
    description: "Configure class section",
    color: "text-pink-500",
    bg: "bg-pink-100",

    allowedParent: "academic-year",
    allowedChildren: [],

    modal: "section",

    defaultData: {
      label: "",
      strength: 60,
    },
  },
} as const;
