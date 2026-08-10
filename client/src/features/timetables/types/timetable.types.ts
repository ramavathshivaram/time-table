export type Timetable = {
  _id: string;
  title: string;
  userId: string;
  stage: "incomplete" | "complete";
  blueprintId: string;
  createdAt: string;
  updatedAt: string;
};
