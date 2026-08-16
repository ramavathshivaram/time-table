export interface Institution {
  id: string;
  name: string;
  code: string;

  time: {
    startTime: string;
    endTime: string;
    periodDuration: number;
    numberOfPeriods: number;

    workingDays: string[];

    breaks: {
      type: "lunch" | "short-break";
      startTime: string;
      endTime: string;
    }[];
  };
}

export interface Program {
  id: string;
  name: string;
  code: string;

  time?: {
    startTime?: string;
    endTime?: string;
    periodDuration?: number;
    numberOfPeriods?: number;

    workingDays?: string[];

    breaks?: {
      type: "lunch" | "short-break";
      startTime: string;
      endTime: string;
    }[];
  };

  resources?: {
    facultyIds?: string[];
    subjectIds?: string[];
    roomIds?: string[];
  };
}

export interface AcademicYear {
  id: string;
  name: string;

  year: number;
  semester: number;

  time?: {
    startTime?: string;
    endTime?: string;
    periodDuration?: number;
    numberOfPeriods?: number;

    workingDays?: string[];

    breaks?: {
      type: "lunch" | "short-break";
      startTime: string;
      endTime: string;
    }[];
  };

  resources?: {
    facultyIds?: string[];
    subjectIds?: string[];
    roomIds?: string[];
  };
}

export interface Section {
  id: string;
  name: string;
  strength: number;

  time?: {
    startTime?: string;
    endTime?: string;
    periodDuration?: number;
    numberOfPeriods?: number;

    workingDays?: string[];

    breaks?: {
      type: "lunch" | "short-break";
      startTime: string;
      endTime: string;
    }[];
  };

  resources?: {
    facultyIds?: string[];
    subjectIds?: string[];
    roomIds?: string[];
  };
}
