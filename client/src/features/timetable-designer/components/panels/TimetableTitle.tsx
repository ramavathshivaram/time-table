import { memo, useState } from "react";

const TimetableTitle = () => {
  const [title, setTitle] = useState("timetable 1");
  const [isEditing, setIsEditing] = useState(false);

  return isEditing ? (
    <input
      autoFocus
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      onBlur={() => setIsEditing(false)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          setIsEditing(false);
        }
      }}
      className="roboto w-full rounded-md border-none px-2 text-xl font-semibold outline-none underline underline-offset-4"
    />
  ) : (
    <h1
      onClick={() => setIsEditing(true)}
      className="roboto cursor-pointer px-2 text-xl font-semibold underline underline-offset-4"
    >
      {title}
    </h1>
  );
};

export default memo(TimetableTitle);
