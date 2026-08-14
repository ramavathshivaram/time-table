export const timetableData = {
  _id: "66b7a1c9e123456789abcd01",
  userId: "66b7a100e123456789abcd00",

  title: "CSE 3rd Year - Section A",
  description:
    "Weekly timetable for CSE 3rd Year Section A with theory classes and laboratory sessions.",
  stage: "complete",

  blueprintId: "66b7a2d9e123456789abcd02",

  createdAt: "2026-08-10T10:30:00.000Z",
  updatedAt: "2026-08-14T15:45:00.000Z",

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
        id: "institution-1",
        type: "institution",
        position: { x: 100, y: 220 },
        data: {
          label: "PVPSIT",
          timings: "09:00 - 17:00",
          lunch: "13:00 - 14:00",
          programs: 1,
        },
      },

      {
        id: "program-cse",
        type: "program",
        position: { x: 100, y: 340 },
        data: {
          label: "Computer Science & Engineering",
          type: "CSE",
          timings: "09:00 - 17:00",
          faculty: 18,
          subjects: 12,
        },
      },

      {
        id: "cse-year-1",
        type: "academic-year",
        position: { x: 100, y: 460 },
        data: {
          label: "1st Year",
          type: "I",
          semesters: 2,
        },
      },

      {
        id: "cse-year-1-section-a",
        type: "section",
        position: { x: 0, y: 580 },
        data: {
          label: "Section A",
          type: "A",
          strength: 60,
        },
      },

      {
        id: "cse-year-1-section-b",
        type: "section",
        position: { x: 200, y: 580 },
        data: {
          label: "Section B",
          type: "B",
          strength: 60,
        },
      },

      {
        id: "cse-year-1-section-c",
        type: "section",
        position: { x: 400, y: 580 },
        data: {
          label: "Section C",
          type: "C",
          strength: 60,
        },
      },

      {
        id: "cse-year-2",
        type: "academic-year",
        position: { x: 100, y: 720 },
        data: {
          label: "2nd Year",
          type: "II",
          semesters: 2,
        },
      },

      {
        id: "cse-year-2-section-a",
        type: "section",
        position: { x: 0, y: 840 },
        data: {
          label: "Section A",
          type: "A",
          strength: 60,
        },
      },

      {
        id: "cse-year-2-section-b",
        type: "section",
        position: { x: 200, y: 840 },
        data: {
          label: "Section B",
          type: "B",
          strength: 60,
        },
      },

      {
        id: "cse-year-2-section-c",
        type: "section",
        position: { x: 400, y: 840 },
        data: {
          label: "Section C",
          type: "C",
          strength: 60,
        },
      },

      {
        id: "cse-year-3",
        type: "academic-year",
        position: { x: 100, y: 980 },
        data: {
          label: "3rd Year",
          type: "III",
          semesters: 2,
        },
      },

      {
        id: "cse-year-3-section-a",
        type: "section",
        position: { x: 0, y: 1100 },
        data: {
          label: "Section A",
          type: "A",
          strength: 60,
        },
      },

      {
        id: "cse-year-3-section-b",
        type: "section",
        position: { x: 200, y: 1100 },
        data: {
          label: "Section B",
          type: "B",
          strength: 60,
        },
      },

      {
        id: "cse-year-3-section-c",
        type: "section",
        position: { x: 400, y: 1100 },
        data: {
          label: "Section C",
          type: "C",
          strength: 60,
        },
      },
    ],

    edges: [
      {
        id: "edge-start-institution",
        source: "start-1",
        target: "institution-1",
        type: "bezier",
      },

      {
        id: "edge-institution-cse",
        source: "institution-1",
        target: "program-cse",
        type: "bezier",
      },

      {
        id: "edge-cse-year-1",
        source: "program-cse",
        target: "cse-year-1",
        type: "bezier",
      },

      {
        id: "edge-cse-year-2",
        source: "program-cse",
        target: "cse-year-2",
        type: "bezier",
      },

      {
        id: "edge-cse-year-3",
        source: "program-cse",
        target: "cse-year-3",
        type: "bezier",
      },

      {
        id: "edge-cse-y1-a",
        source: "cse-year-1",
        target: "cse-year-1-section-a",
        type: "bezier",
      },

      {
        id: "edge-cse-y1-b",
        source: "cse-year-1",
        target: "cse-year-1-section-b",
        type: "bezier",
      },

      {
        id: "edge-cse-y1-c",
        source: "cse-year-1",
        target: "cse-year-1-section-c",
        type: "bezier",
      },

      {
        id: "edge-cse-y2-a",
        source: "cse-year-2",
        target: "cse-year-2-section-a",
        type: "bezier",
      },

      {
        id: "edge-cse-y2-b",
        source: "cse-year-2",
        target: "cse-year-2-section-b",
        type: "bezier",
      },

      {
        id: "edge-cse-y2-c",
        source: "cse-year-2",
        target: "cse-year-2-section-c",
        type: "bezier",
      },

      {
        id: "edge-cse-y3-a",
        source: "cse-year-3",
        target: "cse-year-3-section-a",
        type: "bezier",
      },

      {
        id: "edge-cse-y3-b",
        source: "cse-year-3",
        target: "cse-year-3-section-b",
        type: "bezier",
      },

      {
        id: "edge-cse-y3-c",
        source: "cse-year-3",
        target: "cse-year-3-section-c",
        type: "bezier",
      },
    ],
  },

  subjects: [
    {
      id: "sub-1",
      name: "Database Management Systems",
      code: "CS301",
      duration: 60,
      credits: 4,
      isLab: false,
    },
    {
      id: "sub-2",
      name: "Computer Networks",
      code: "CS302",
      duration: 60,
      credits: 4,
      isLab: false,
    },
    {
      id: "sub-3",
      name: "Software Engineering",
      code: "CS303",
      duration: 60,
      credits: 3,
      isLab: false,
    },
    {
      id: "sub-4",
      name: "Artificial Intelligence",
      code: "CS304",
      duration: 60,
      credits: 4,
      isLab: false,
    },
    {
      id: "sub-5",
      name: "Web Technologies",
      code: "CS305",
      duration: 60,
      credits: 3,
      isLab: false,
    },
    {
      id: "sub-6",
      name: "Cloud Computing",
      code: "CS306",
      duration: 60,
      credits: 3,
      isLab: false,
    },
    {
      id: "sub-7",
      name: "Operating Systems",
      code: "CS307",
      duration: 60,
      credits: 4,
      isLab: false,
    },
    {
      id: "sub-8",
      name: "Compiler Design",
      code: "CS308",
      duration: 60,
      credits: 3,
      isLab: false,
    },
    {
      id: "sub-9",
      name: "DBMS Laboratory",
      code: "CS351",
      duration: 120,
      credits: 2,
      isLab: true,
    },
    {
      id: "sub-10",
      name: "Computer Networks Laboratory",
      code: "CS352",
      duration: 120,
      credits: 2,
      isLab: true,
    },
    {
      id: "sub-11",
      name: "AI Laboratory",
      code: "CS353",
      duration: 120,
      credits: 2,
      isLab: true,
    },
    {
      id: "sub-12",
      name: "Web Technologies Laboratory",
      code: "CS354",
      duration: 120,
      credits: 2,
      isLab: true,
    },
    {
      id: "sub-13",
      name: "Machine Learning",
      code: "CS309",
      duration: 60,
      credits: 4,
      isLab: false,
    },
    {
      id: "sub-14",
      name: "Data Mining",
      code: "CS310",
      duration: 60,
      credits: 3,
      isLab: false,
    },
    {
      id: "sub-15",
      name: "Cyber Security",
      code: "CS311",
      duration: 60,
      credits: 3,
      isLab: false,
    },
    {
      id: "sub-16",
      name: "DevOps",
      code: "CS312",
      duration: 60,
      credits: 3,
      isLab: false,
    },
    {
      id: "sub-17",
      name: "Machine Learning Laboratory",
      code: "CS355",
      duration: 120,
      credits: 2,
      isLab: true,
    },
    {
      id: "sub-18",
      name: "Cloud Computing Laboratory",
      code: "CS356",
      duration: 120,
      credits: 2,
      isLab: true,
    },
    {
      id: "sub-19",
      name: "Project",
      code: "CS399",
      duration: 120,
      credits: 4,
      isLab: false,
    },
    {
      id: "sub-20",
      name: "Professional Ethics",
      code: "HU301",
      duration: 60,
      credits: 2,
      isLab: false,
    },
  ],

  faculties: [
    {
      id: "fac-1",
      name: "Dr. Rajesh Kumar",
      email: "rajesh.kumar@pvpsit.ac.in",
      subjects: ["sub-1", "sub-9"],
    },
    {
      id: "fac-2",
      name: "Dr. Priya Sharma",
      email: "priya.sharma@pvpsit.ac.in",
      subjects: ["sub-2", "sub-10"],
    },
    {
      id: "fac-3",
      name: "Prof. Anil Kumar",
      email: "anil.kumar@pvpsit.ac.in",
      subjects: ["sub-3"],
    },
    {
      id: "fac-4",
      name: "Dr. Sneha Reddy",
      email: "sneha.reddy@pvpsit.ac.in",
      subjects: ["sub-4", "sub-11"],
    },
    {
      id: "fac-5",
      name: "Dr. Ravi Teja",
      email: "ravi.teja@pvpsit.ac.in",
      subjects: ["sub-5", "sub-12"],
    },
    {
      id: "fac-6",
      name: "Prof. Kiran Rao",
      email: "kiran.rao@pvpsit.ac.in",
      subjects: ["sub-6", "sub-18"],
    },
    {
      id: "fac-7",
      name: "Dr. Mahesh Babu",
      email: "mahesh.babu@pvpsit.ac.in",
      subjects: ["sub-7"],
    },
    {
      id: "fac-8",
      name: "Dr. Lakshmi Devi",
      email: "lakshmi.devi@pvpsit.ac.in",
      subjects: ["sub-8"],
    },
    {
      id: "fac-9",
      name: "Dr. Arjun Varma",
      email: "arjun.varma@pvpsit.ac.in",
      subjects: ["sub-13", "sub-17"],
    },
    {
      id: "fac-10",
      name: "Prof. Swathi Rao",
      email: "swathi.rao@pvpsit.ac.in",
      subjects: ["sub-14"],
    },
    {
      id: "fac-11",
      name: "Dr. Naveen Kumar",
      email: "naveen.kumar@pvpsit.ac.in",
      subjects: ["sub-15"],
    },
    {
      id: "fac-12",
      name: "Prof. Harsha Vardhan",
      email: "harsha@pvpsit.ac.in",
      subjects: ["sub-16"],
    },
    {
      id: "fac-13",
      name: "Dr. Anusha Reddy",
      email: "anusha.reddy@pvpsit.ac.in",
      subjects: ["sub-17"],
    },
    {
      id: "fac-14",
      name: "Prof. Suresh Babu",
      email: "suresh.babu@pvpsit.ac.in",
      subjects: ["sub-18"],
    },
    {
      id: "fac-15",
      name: "Dr. Venkatesh Rao",
      email: "venkatesh.rao@pvpsit.ac.in",
      subjects: ["sub-19"],
    },
    {
      id: "fac-16",
      name: "Prof. Divya Sri",
      email: "divya.sri@pvpsit.ac.in",
      subjects: ["sub-20"],
    },
    {
      id: "fac-17",
      name: "Dr. Pavan Kumar",
      email: "pavan.kumar@pvpsit.ac.in",
      subjects: ["sub-1", "sub-7"],
    },
    {
      id: "fac-18",
      name: "Prof. Meghana Rao",
      email: "meghana.rao@pvpsit.ac.in",
      subjects: ["sub-5", "sub-6"],
    },
  ],

  rooms: [
    {
      id: "room-1",
      name: "CSE Classroom 1",
      roomNumber: "CSE-101",
      capacity: 65,
      floor: 1,
      isLab: false,
    },
    {
      id: "room-2",
      name: "CSE Classroom 2",
      roomNumber: "CSE-102",
      capacity: 65,
      floor: 1,
      isLab: false,
    },
    {
      id: "room-3",
      name: "CSE Classroom 3",
      roomNumber: "CSE-103",
      capacity: 70,
      floor: 1,
      isLab: false,
    },
    {
      id: "room-4",
      name: "CSE Classroom 4",
      roomNumber: "CSE-104",
      capacity: 70,
      floor: 1,
      isLab: false,
    },
    {
      id: "room-5",
      name: "CSE Classroom 5",
      roomNumber: "CSE-201",
      capacity: 60,
      floor: 2,
      isLab: false,
    },
    {
      id: "room-6",
      name: "CSE Classroom 6",
      roomNumber: "CSE-202",
      capacity: 60,
      floor: 2,
      isLab: false,
    },
    {
      id: "room-7",
      name: "CSE Classroom 7",
      roomNumber: "CSE-203",
      capacity: 65,
      floor: 2,
      isLab: false,
    },
    {
      id: "room-8",
      name: "Seminar Hall",
      roomNumber: "CSE-SH-1",
      capacity: 120,
      floor: 2,
      isLab: false,
    },
    {
      id: "lab-1",
      name: "DBMS Laboratory",
      roomNumber: "CSE-LAB-1",
      capacity: 60,
      floor: 1,
      isLab: true,
    },
    {
      id: "lab-2",
      name: "AI Laboratory",
      roomNumber: "CSE-LAB-2",
      capacity: 60,
      floor: 1,
      isLab: true,
    },
    {
      id: "lab-3",
      name: "Networks Laboratory",
      roomNumber: "CSE-LAB-3",
      capacity: 60,
      floor: 2,
      isLab: true,
    },
    {
      id: "lab-4",
      name: "Web Technologies Laboratory",
      roomNumber: "CSE-LAB-4",
      capacity: 60,
      floor: 2,
      isLab: true,
    },
    {
      id: "lab-5",
      name: "Cloud Computing Laboratory",
      roomNumber: "CSE-LAB-5",
      capacity: 60,
      floor: 3,
      isLab: true,
    },
    {
      id: "lab-6",
      name: "Machine Learning Laboratory",
      roomNumber: "CSE-LAB-6",
      capacity: 60,
      floor: 3,
      isLab: true,
    },
  ],

  messages: [
    {
      id: "msg-1",
      role: "system",
      content: "Timetable configuration initialized.",
      createdAt: "2026-08-14T09:00:00.000Z",
    },
    {
      id: "msg-2",
      role: "user",
      content: "Generate timetable for CSE 3rd Year Section A.",
      createdAt: "2026-08-14T09:01:00.000Z",
    },
    {
      id: "msg-3",
      role: "assistant",
      content: "I have all required subjects, faculty and room information.",
      createdAt: "2026-08-14T09:01:05.000Z",
    },
  ],
};
