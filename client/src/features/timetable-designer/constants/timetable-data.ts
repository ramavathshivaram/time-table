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
        id: "institution-1",
        type: "institution",
        position: { x: 100, y: 220 },

        data: {
          label: "PVPSIT",

          time: {
            startTime: "09:00",
            endTime: "17:00",

            numberOfPeriods: 7,

            workingDays: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ],

            breaks: [
              {
                type: "lunch",
                startTime: "13:00",
                endTime: "14:00",
              },
            ],
          },
        },
      },
      {
        id: "program-cse",
        type: "program",
        position: { x: 100, y: 340 },

        data: {
          label: "Computer Science & Engineering",

          time: {
            startTime: "09:00",
            endTime: "17:00",
            numberOfPeriods: 7,

            workingDays: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ],

            breaks: [
              {
                type: "lunch",
                startTime: "13:00",
                endTime: "14:00",
              },
            ],
          },

          resources: {
            facultyIds: [],
            subjectIds: [],
            roomIds: [],
          },
        },
      },
      {
        id: "cse-year-1",
        type: "academic-year",
        position: { x: 100, y: 460 },
        data: {
          label: "1st Year",

          name: "1st Year",
          year: 1,
          semester: 1,

          time: {
            startTime: "09:00",
            endTime: "17:00",
            periodDuration: 60,
            numberOfPeriods: 7,

            workingDays: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ],

            breaks: [
              {
                type: "lunch",
                startTime: "13:00",
                endTime: "14:00",
              },
            ],
          },

          resources: {
            facultyIds: [],
            subjectIds: [],
            roomIds: [],
          },
        },
      },

      {
        id: "cse-year-1-section-a",
        type: "section",
        position: { x: 0, y: 580 },
        data: {
          label: "Section A",

          name: "Section A",
          strength: 60,

          time: {
            startTime: "09:00",
            endTime: "17:00",
            periodDuration: 60,
            numberOfPeriods: 7,

            workingDays: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ],

            breaks: [
              {
                type: "lunch",
                startTime: "13:00",
                endTime: "14:00",
              },
            ],
          },

          resources: {
            facultyIds: [],
            subjectIds: [],
            roomIds: [],
          },
        },
      },

      {
        id: "cse-year-1-section-b",
        type: "section",
        position: { x: 200, y: 580 },
        data: {
          label: "Section B",

          name: "Section B",
          strength: 60,

          time: {
            startTime: "09:00",
            endTime: "17:00",
            periodDuration: 60,
            numberOfPeriods: 7,

            workingDays: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ],

            breaks: [
              {
                type: "lunch",
                startTime: "13:00",
                endTime: "14:00",
              },
            ],
          },

          resources: {
            facultyIds: [],
            subjectIds: [],
            roomIds: [],
          },
        },
      },

      {
        id: "cse-year-1-section-c",
        type: "section",
        position: { x: 400, y: 580 },
        data: {
          label: "Section C",

          name: "Section C",
          strength: 60,

          time: {
            startTime: "09:00",
            endTime: "17:00",
            periodDuration: 60,
            numberOfPeriods: 7,

            workingDays: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ],

            breaks: [
              {
                type: "lunch",
                startTime: "13:00",
                endTime: "14:00",
              },
            ],
          },

          resources: {
            facultyIds: [],
            subjectIds: [],
            roomIds: [],
          },
        },
      },

      {
        id: "cse-year-2",
        type: "academic-year",
        position: { x: 100, y: 720 },
        data: {
          label: "2nd Year",

          name: "2nd Year",
          year: 2,
          semester: 3,

          time: {
            startTime: "09:00",
            endTime: "17:00",
            periodDuration: 60,
            numberOfPeriods: 7,

            workingDays: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ],

            breaks: [
              {
                type: "lunch",
                startTime: "13:00",
                endTime: "14:00",
              },
            ],
          },

          resources: {
            facultyIds: [],
            subjectIds: [],
            roomIds: [],
          },
        },
      },

      {
        id: "cse-year-2-section-a",
        type: "section",
        position: { x: 0, y: 840 },
        data: {
          label: "Section A",
          name: "Section A",
          strength: 60,

          time: {
            startTime: "09:00",
            endTime: "17:00",
            periodDuration: 60,
            numberOfPeriods: 7,
            workingDays: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ],
            breaks: [
              {
                type: "lunch",
                startTime: "13:00",
                endTime: "14:00",
              },
            ],
          },

          resources: {
            facultyIds: [],
            subjectIds: [],
            roomIds: [],
          },
        },
      },

      {
        id: "cse-year-2-section-b",
        type: "section",
        position: { x: 200, y: 840 },
        data: {
          label: "Section B",
          name: "Section B",
          strength: 60,

          time: {
            startTime: "09:00",
            endTime: "17:00",
            periodDuration: 60,
            numberOfPeriods: 7,
            workingDays: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ],
            breaks: [
              {
                type: "lunch",
                startTime: "13:00",
                endTime: "14:00",
              },
            ],
          },

          resources: {
            facultyIds: [],
            subjectIds: [],
            roomIds: [],
          },
        },
      },

      {
        id: "cse-year-2-section-c",
        type: "section",
        position: { x: 400, y: 840 },
        data: {
          label: "Section C",
          name: "Section C",
          strength: 60,

          time: {
            startTime: "09:00",
            endTime: "17:00",
            periodDuration: 60,
            numberOfPeriods: 7,
            workingDays: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ],
            breaks: [
              {
                type: "lunch",
                startTime: "13:00",
                endTime: "14:00",
              },
            ],
          },

          resources: {
            facultyIds: [],
            subjectIds: [],
            roomIds: [],
          },
        },
      },

      {
        id: "cse-year-3",
        type: "academic-year",
        position: { x: 100, y: 980 },
        data: {
          label: "3rd Year",

          name: "3rd Year",
          year: 3,
          semester: 5,

          time: {
            startTime: "09:00",
            endTime: "17:00",
            periodDuration: 60,
            numberOfPeriods: 7,

            workingDays: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ],

            breaks: [
              {
                type: "lunch",
                startTime: "13:00",
                endTime: "14:00",
              },
            ],
          },

          resources: {
            facultyIds: [],
            subjectIds: [],
            roomIds: [],
          },
        },
      },

      {
        id: "cse-year-3-section-a",
        type: "section",
        position: { x: 0, y: 1100 },
        data: {
          label: "Section A",
          name: "Section A",
          strength: 60,

          time: {
            startTime: "09:00",
            endTime: "17:00",
            periodDuration: 60,
            numberOfPeriods: 7,
            workingDays: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ],
            breaks: [
              {
                type: "lunch",
                startTime: "13:00",
                endTime: "14:00",
              },
            ],
          },

          resources: {
            facultyIds: [],
            subjectIds: [],
            roomIds: [],
          },
        },
      },

      {
        id: "cse-year-3-section-b",
        type: "section",
        position: { x: 200, y: 1100 },
        data: {
          label: "Section B",
          name: "Section B",
          strength: 60,

          time: {
            startTime: "09:00",
            endTime: "17:00",
            periodDuration: 60,
            numberOfPeriods: 7,
            workingDays: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ],
            breaks: [
              {
                type: "lunch",
                startTime: "13:00",
                endTime: "14:00",
              },
            ],
          },

          resources: {
            facultyIds: [],
            subjectIds: [],
            roomIds: [],
          },
        },
      },

      {
        id: "cse-year-3-section-c",
        type: "section",
        position: { x: 400, y: 1100 },
        data: {
          label: "Section C",
          name: "Section C",
          strength: 60,

          time: {
            startTime: "09:00",
            endTime: "17:00",
            periodDuration: 60,
            numberOfPeriods: 7,
            workingDays: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ],
            breaks: [
              {
                type: "lunch",
                startTime: "13:00",
                endTime: "14:00",
              },
            ],
          },

          resources: {
            facultyIds: [],
            subjectIds: [],
            roomIds: [],
          },
        },
      },
    ],

    edges: [
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
      labDetails: {
        isLab: false,
      },
      weeklyPeriods: 4,
      periodsPerDay: 1,
      consecutivePeriods: 1,
      roomRequirements: {
        type: "classroom",
        minimumCapacity: 60,
      },
    },
    {
      id: "sub-2",
      name: "Computer Networks",
      code: "CS302",
      duration: 60,
      labDetails: {
        isLab: false,
      },
      weeklyPeriods: 4,
      periodsPerDay: 1,
      consecutivePeriods: 1,
      roomRequirements: {
        type: "classroom",
        minimumCapacity: 60,
      },
    },
    {
      id: "sub-3",
      name: "Software Engineering",
      code: "CS303",
      duration: 60,
      labDetails: {
        isLab: false,
      },
      weeklyPeriods: 3,
      periodsPerDay: 1,
      consecutivePeriods: 1,
      roomRequirements: {
        type: "classroom",
        minimumCapacity: 60,
      },
    },
    {
      id: "sub-4",
      name: "Artificial Intelligence",
      code: "CS304",
      duration: 60,
      labDetails: {
        isLab: false,
      },
      weeklyPeriods: 4,
      periodsPerDay: 1,
      consecutivePeriods: 1,
      roomRequirements: {
        type: "classroom",
        minimumCapacity: 60,
      },
    },
    {
      id: "sub-5",
      name: "Web Technologies",
      code: "CS305",
      duration: 60,
      labDetails: {
        isLab: false,
      },
      weeklyPeriods: 3,
      periodsPerDay: 1,
      consecutivePeriods: 1,
      roomRequirements: {
        type: "classroom",
        minimumCapacity: 60,
      },
    },
    {
      id: "sub-6",
      name: "Cloud Computing",
      code: "CS306",
      duration: 60,
      labDetails: {
        isLab: false,
      },
      weeklyPeriods: 3,
      periodsPerDay: 1,
      consecutivePeriods: 1,
      roomRequirements: {
        type: "classroom",
        minimumCapacity: 60,
      },
    },
    {
      id: "sub-7",
      name: "Operating Systems",
      code: "CS307",
      duration: 60,
      labDetails: {
        isLab: false,
      },
      weeklyPeriods: 4,
      periodsPerDay: 1,
      consecutivePeriods: 1,
      roomRequirements: {
        type: "classroom",
        minimumCapacity: 60,
      },
    },
    {
      id: "sub-8",
      name: "Compiler Design",
      code: "CS308",
      duration: 60,
      labDetails: {
        isLab: false,
      },
      weeklyPeriods: 3,
      periodsPerDay: 1,
      consecutivePeriods: 1,
      roomRequirements: {
        type: "classroom",
        minimumCapacity: 60,
      },
    },
    {
      id: "sub-9",
      name: "DBMS Laboratory",
      code: "CS351",
      duration: 120,
      labDetails: {
        isLab: true,
        weeklyPeriods: 2,
      },
      weeklyPeriods: 2,
      periodsPerDay: 1,
      consecutivePeriods: 2,
      roomRequirements: {
        type: "laboratory",
        minimumCapacity: 30,
      },
    },
    {
      id: "sub-10",
      name: "Computer Networks Laboratory",
      code: "CS352",
      duration: 120,
      labDetails: {
        isLab: true,
        weeklyPeriods: 2,
      },
      weeklyPeriods: 2,
      periodsPerDay: 1,
      consecutivePeriods: 2,
      roomRequirements: {
        type: "laboratory",
        minimumCapacity: 30,
      },
    },
    {
      id: "sub-11",
      name: "AI Laboratory",
      code: "CS353",
      duration: 120,
      labDetails: {
        isLab: true,
        weeklyPeriods: 2,
      },
      weeklyPeriods: 2,
      periodsPerDay: 1,
      consecutivePeriods: 2,
      roomRequirements: {
        type: "laboratory",
        minimumCapacity: 30,
      },
    },
    {
      id: "sub-12",
      name: "Web Technologies Laboratory",
      code: "CS354",
      duration: 120,
      labDetails: {
        isLab: true,
        weeklyPeriods: 2,
      },
      weeklyPeriods: 2,
      periodsPerDay: 1,
      consecutivePeriods: 2,
      roomRequirements: {
        type: "laboratory",
        minimumCapacity: 30,
      },
    },
    {
      id: "sub-13",
      name: "Machine Learning",
      code: "CS309",
      duration: 60,
      labDetails: {
        isLab: false,
      },
      weeklyPeriods: 4,
      periodsPerDay: 1,
      consecutivePeriods: 1,
      roomRequirements: {
        type: "classroom",
        minimumCapacity: 60,
      },
    },
    {
      id: "sub-14",
      name: "Data Mining",
      code: "CS310",
      duration: 60,
      labDetails: {
        isLab: false,
      },
      weeklyPeriods: 3,
      periodsPerDay: 1,
      consecutivePeriods: 1,
      roomRequirements: {
        type: "classroom",
        minimumCapacity: 60,
      },
    },
    {
      id: "sub-15",
      name: "Cyber Security",
      code: "CS311",
      duration: 60,
      labDetails: {
        isLab: false,
      },
      weeklyPeriods: 3,
      periodsPerDay: 1,
      consecutivePeriods: 1,
      roomRequirements: {
        type: "classroom",
        minimumCapacity: 60,
      },
    },
    {
      id: "sub-16",
      name: "DevOps",
      code: "CS312",
      duration: 60,
      labDetails: {
        isLab: false,
      },
      weeklyPeriods: 3,
      periodsPerDay: 1,
      consecutivePeriods: 1,
      roomRequirements: {
        type: "classroom",
        minimumCapacity: 60,
      },
    },
    {
      id: "sub-17",
      name: "Machine Learning Laboratory",
      code: "CS355",
      duration: 120,
      labDetails: {
        isLab: true,
        weeklyPeriods: 2,
      },
      weeklyPeriods: 2,
      periodsPerDay: 1,
      consecutivePeriods: 2,
      roomRequirements: {
        type: "laboratory",
        minimumCapacity: 30,
      },
    },
    {
      id: "sub-18",
      name: "Cloud Computing Laboratory",
      code: "CS356",
      duration: 120,
      labDetails: {
        isLab: true,
        weeklyPeriods: 2,
      },
      weeklyPeriods: 2,
      periodsPerDay: 1,
      consecutivePeriods: 2,
      roomRequirements: {
        type: "laboratory",
        minimumCapacity: 30,
      },
    },
    {
      id: "sub-19",
      name: "Project",
      code: "CS399",
      duration: 120,
      labDetails: {
        isLab: false,
      },
      weeklyPeriods: 2,
      periodsPerDay: 1,
      consecutivePeriods: 2,
      roomRequirements: {
        type: "seminar-hall",
        minimumCapacity: 60,
      },
    },
    {
      id: "sub-20",
      name: "Professional Ethics",
      code: "HU301",
      duration: 60,
      labDetails: {
        isLab: false,
      },
      weeklyPeriods: 2,
      periodsPerDay: 1,
      consecutivePeriods: 1,
      roomRequirements: {
        type: "classroom",
        minimumCapacity: 60,
      },
    },
  ],

  faculties: [
    {
      id: "fac-1",
      name: "Dr. Rajesh Kumar",
      email: "rajesh.kumar@pvpsit.ac.in",
      department: "Computer Science & Engineering",
      subjectIds: ["sub-1", "sub-9"],
      unavailablePeriods: 1,
    },

    {
      id: "fac-2",
      name: "Dr. Priya Sharma",
      email: "priya.sharma@pvpsit.ac.in",
      department: "Computer Science & Engineering",
      subjectIds: ["sub-2", "sub-10"],
      unavailablePeriods: 1,
    },

    {
      id: "fac-3",
      name: "Prof. Anil Kumar",
      email: "anil.kumar@pvpsit.ac.in",
      department: "Computer Science & Engineering",
      subjectIds: ["sub-3"],
      unavailablePeriods: 0,
    },

    {
      id: "fac-4",
      name: "Dr. Sneha Reddy",
      email: "sneha.reddy@pvpsit.ac.in",
      department: "Computer Science & Engineering",
      subjectIds: ["sub-4", "sub-11"],
      unavailablePeriods: 1,
    },

    {
      id: "fac-5",
      name: "Prof. Kiran Rao",
      email: "kiran.rao@pvpsit.ac.in",
      department: "Computer Science & Engineering",
      subjectIds: ["sub-5", "sub-12"],
      unavailablePeriods: 0,
    },

    {
      id: "fac-6",
      name: "Dr. Arjun Mehta",
      email: "arjun.mehta@pvpsit.ac.in",
      department: "Computer Science & Engineering",
      subjectIds: ["sub-6", "sub-18"],
      unavailablePeriods: 1,
    },

    {
      id: "fac-7",
      name: "Dr. Venkatesh Rao",
      email: "venkatesh.rao@pvpsit.ac.in",
      department: "Computer Science & Engineering",
      subjectIds: ["sub-7"],
      unavailablePeriods: 0,
    },

    {
      id: "fac-8",
      name: "Prof. Meena Devi",
      email: "meena.devi@pvpsit.ac.in",
      department: "Computer Science & Engineering",
      subjectIds: ["sub-8"],
      unavailablePeriods: 1,
    },

    {
      id: "fac-9",
      name: "Dr. Rahul Verma",
      email: "rahul.verma@pvpsit.ac.in",
      department: "Computer Science & Engineering",
      subjectIds: ["sub-13", "sub-17"],
      unavailablePeriods: 1,
    },

    {
      id: "fac-10",
      name: "Dr. Kavitha Rao",
      email: "kavitha.rao@pvpsit.ac.in",
      department: "Computer Science & Engineering",
      subjectIds: ["sub-14"],
      unavailablePeriods: 0,
    },

    {
      id: "fac-11",
      name: "Prof. Suresh Babu",
      email: "suresh.babu@pvpsit.ac.in",
      department: "Computer Science & Engineering",
      subjectIds: ["sub-15"],
      unavailablePeriods: 1,
    },

    {
      id: "fac-12",
      name: "Dr. Naveen Kumar",
      email: "naveen.kumar@pvpsit.ac.in",
      department: "Computer Science & Engineering",
      subjectIds: ["sub-16"],
      unavailablePeriods: 0,
    },

    {
      id: "fac-13",
      name: "Dr. Swathi Priya",
      email: "swathi.priya@pvpsit.ac.in",
      department: "Computer Science & Engineering",
      subjectIds: ["sub-19"],
      unavailablePeriods: 1,
    },

    {
      id: "fac-14",
      name: "Prof. Lakshmi Narayan",
      email: "lakshmi.narayan@pvpsit.ac.in",
      department: "Humanities",
      subjectIds: ["sub-20"],
      unavailablePeriods: 0,
    },
  ],

  rooms: [
    {
      id: "room-1",
      name: "CSE Classroom 1",
      roomNumber: "CSE-101",
      capacity: 65,
      floor: 1,
      type: "classroom",
    },
    {
      id: "room-2",
      name: "CSE Classroom 2",
      roomNumber: "CSE-102",
      capacity: 65,
      floor: 1,
      type: "classroom",
    },
    {
      id: "room-3",
      name: "CSE Classroom 3",
      roomNumber: "CSE-103",
      capacity: 70,
      floor: 1,
      type: "classroom",
    },
    {
      id: "room-4",
      name: "CSE Classroom 4",
      roomNumber: "CSE-104",
      capacity: 70,
      floor: 1,
      type: "classroom",
    },
    {
      id: "room-5",
      name: "CSE Classroom 5",
      roomNumber: "CSE-201",
      capacity: 60,
      floor: 2,
      type: "classroom",
    },
    {
      id: "room-6",
      name: "CSE Classroom 6",
      roomNumber: "CSE-202",
      capacity: 60,
      floor: 2,
      type: "classroom",
    },
    {
      id: "room-7",
      name: "CSE Classroom 7",
      roomNumber: "CSE-203",
      capacity: 65,
      floor: 2,
      type: "classroom",
    },
    {
      id: "room-8",
      name: "Seminar Hall",
      roomNumber: "CSE-SH-1",
      capacity: 120,
      floor: 2,
      type: "seminar-hall",
    },
    {
      id: "lab-1",
      name: "DBMS Laboratory",
      roomNumber: "CSE-LAB-1",
      capacity: 60,
      floor: 1,
      type: "laboratory",
    },
    {
      id: "lab-2",
      name: "AI Laboratory",
      roomNumber: "CSE-LAB-2",
      capacity: 60,
      floor: 1,
      type: "laboratory",
    },
    {
      id: "lab-3",
      name: "Networks Laboratory",
      roomNumber: "CSE-LAB-3",
      capacity: 60,
      floor: 2,
      type: "laboratory",
    },
    {
      id: "lab-4",
      name: "Web Technologies Laboratory",
      roomNumber: "CSE-LAB-4",
      capacity: 60,
      floor: 2,
      type: "laboratory",
    },
    {
      id: "lab-5",
      name: "Cloud Computing Laboratory",
      roomNumber: "CSE-LAB-5",
      capacity: 60,
      floor: 3,
      type: "laboratory",
    },
    {
      id: "lab-6",
      name: "Machine Learning Laboratory",
      roomNumber: "CSE-LAB-6",
      capacity: 60,
      floor: 3,
      type: "laboratory",
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
