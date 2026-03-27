import React, { useState, useRef, useEffect, memo } from "react";

const WorkflowTitle = ({ title }) => {
  const [workflowTitle, setWorkflowTitle] = useState(title);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing) inputRef.current?.focus();
  }, [isEditing]);

  const handleTitleChange = (e) => {
    const value = e.target.value;
    setWorkflowTitle(value);
    //todo save the title using debounce
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={workflowTitle}
          onChange={handleTitleChange}
          onBlur={() => setIsEditing(false)}
          onKeyDown={handleKeyDown}
          className="roboto w-full border-none rounded-md text-xl font-semibold outline-none underline underline-offset-4 px-2"
        />
      ) : (
        <h1
          className="roboto text-xl font-semibold cursor-pointer underline underline-offset-4 px-2"
          onClick={() => setIsEditing(true)}
        >
          {workflowTitle}
        </h1>
      )}
    </div>
  );
};

export default memo(WorkflowTitle);
