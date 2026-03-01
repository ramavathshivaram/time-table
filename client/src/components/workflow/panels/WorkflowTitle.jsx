import React, { useState, useRef, useEffect, memo } from "react";

const WorkflowTitle = () => {
  const [workflowTitle, setWorkflowTitle] = useState("jvdbajdbdjbvdf");
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);

  // Auto focus when editing starts
  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const handleTitleChange = (e) => {
    setWorkflowTitle(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setIsEditing(false);
    }
  };

  return (
    <div>
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          placeholder="Workflow Title"
          value={workflowTitle}
          onChange={handleTitleChange}
          onBlur={() => setIsEditing(false)} // click outside
          onKeyDown={handleKeyDown} // press Enter
          className="w-full border-none rounded-md text-lg font-semibold outline-none underline underline-offset-4"
        />
      ) : (
        <h1
          className="text-lg font-semibold cursor-pointer underline underline-offset-4"
          onClick={() => setIsEditing(true)}
        >
          {workflowTitle}
        </h1>
      )}
    </div>
  );
};

export default memo(WorkflowTitle);
