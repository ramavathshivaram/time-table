import React, { useState, useRef, useEffect, memo } from "react";
import useDebounceSave from "../workflows-hooks/useDebounceSave.js";

const WorkflowTitle = ({ title, workflowId }) => {
  const [workflowTitle, setWorkflowTitle] = useState(title);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);

  const debouncedSave = useDebounceSave(workflowId);

  useEffect(() => {
    if (isEditing) inputRef.current?.focus();
  }, [isEditing]);

  const handleTitleChange = (e) => {
    const value = e.target.value;
    setWorkflowTitle(value);
    debouncedSave({
      title: value,
    });
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
          className="w-full border-none rounded-md text-lg font-semibold outline-none underline underline-offset-4 px-2"
        />
      ) : (
        <h1
          className="text-lg font-semibold cursor-pointer underline underline-offset-4 px-2"
          onClick={() => setIsEditing(true)}
        >
          {workflowTitle}
        </h1>
      )}
    </div>
  );
};

export default memo(WorkflowTitle);
