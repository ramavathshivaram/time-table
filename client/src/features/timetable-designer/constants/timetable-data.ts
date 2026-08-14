export const timetableData = {
  _id: "66b7a1c9e123456789abcd01",
  userId: "66b7a100e123456789abcd00",
  title: "CSE 3rd Year - Section A",
  description:
    "Weekly timetable for CSE 3rd Year Section A with theory classes and laboratory sessions.",
  stage: "complete",

  blueprintId: "66b7a2d9e123456789abcd02",

  createdAt: "2026-08-10T10:30:00.000Z",
  updatedAt: "2026-08-10T15:45:00.000Z",

  blueprint: {
    nodes: [
      {
        id: "start-1",
        type: "start",
        position: { x: 100, y: 100 },
        data: {
          label: "Start",
        },
      },
      {
        id: "college-1",
        type: "institution",
        position: { x: 100, y: 200 },
        data: {
          label: "PVPSIT",
        },
      },
      {
        id: "branch-1",
        type: "program",
        position: { x: 100, y: 300 },
        data: {
          label: "Computer Science & Engineering",
          type: "CSE",
        },
      },
      {
        id: "year-1",
        type: "academic-year",
        position: { x: 100, y: 400 },
        data: {
          label: "3rd Year",
          type: "III",
        },
      },
      {
        id: "section-1",
        type: "section",
        position: { x: 100, y: 500 },
        data: {
          label: "Section A",
          type: "A",
        },
      },
    ],

    edges: [
      {
        id: "edge-1",
        source: "start-1",
        target: "college-1",
        type: "bezier",
      },
      {
        id: "edge-2",
        source: "college-1",
        target: "branch-1",
        type: "bezier",
      },
      {
        id: "edge-3",
        source: "branch-1",
        target: "year-1",
        type: "bezier",
      },
      {
        id: "edge-4",
        source: "year-1",
        target: "section-1",
        type: "bezier",
      },
    ],
  },

  subjects: [
    {
      id: "sub-1",
      name: "Database Management Systems",
      duration: 60,
      isLab: false,
    },
    {
      id: "sub-2",
      name: "Computer Networks",
      duration: 60,
      isLab: false,
    },
    {
      id: "sub-3",
      name: "Software Engineering",
      duration: 60,
      isLab: false,
    },
    {
      id: "sub-4",
      name: "Artificial Intelligence",
      duration: 60,
      isLab: false,
    },
    {
      id: "sub-5",
      name: "DBMS Laboratory",
      duration: 120,
      isLab: true,
    },
    {
      id: "sub-6",
      name: "AI Laboratory",
      duration: 120,
      isLab: true,
    },
  ],

  faculty: [
    {
      id: "fac-1",
      name: "Dr. Rajesh Kumar",
      subjects: ["sub-1", "sub-5"],
    },
    {
      id: "fac-2",
      name: "Dr. Priya Sharma",
      subjects: ["sub-2"],
    },
    {
      id: "fac-3",
      name: "Prof. Anil Kumar",
      subjects: ["sub-3"],
    },
    {
      id: "fac-4",
      name: "Dr. Sneha Reddy",
      subjects: ["sub-4", "sub-6"],
    },
  ],

  rooms: [
    {
      id: "room-1",
      name: "CSE Classroom 1",
      roomNumber: "CSE-101",
      isLab: false,
    },
    {
      id: "room-2",
      name: "CSE Classroom 2",
      roomNumber: "CSE-102",
      isLab: false,
    },
    {
      id: "lab-1",
      name: "DBMS Laboratory",
      roomNumber: "CSE-LAB-1",
      isLab: true,
    },
    {
      id: "lab-2",
      name: "AI Laboratory",
      roomNumber: "CSE-LAB-2",
      isLab: true,
    },
  ],
};
