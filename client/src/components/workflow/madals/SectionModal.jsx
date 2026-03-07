import React, { useState } from "react";

const SectionModal = ({ activeNode, setNodes, closeModal }) => {
  const [section, setSection] = useState(activeNode?.data?.section || "");

  const handleSave = () => {
    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === activeNode.id
          ? {
              ...node,
              data: {
                ...node.data,
                section,
              },
            }
          : node
      )
    );

    closeModal();
  };

  return (
    <div className="flex flex-col gap-3 w-[300px]">
      <h2 className="text-lg font-semibold">Section Settings</h2>

      <input
        value={section}
        onChange={(e) => setSection(e.target.value)}
        placeholder="Section (A, B, C...)"
        className="border rounded p-2"
      />

      <div className="flex justify-end gap-2">
        <button
          onClick={closeModal}
          className="px-3 py-1 border rounded"
        >
          Cancel
        </button>

        <button
          onClick={handleSave}
          className="px-3 py-1 bg-black text-white rounded"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default SectionModal;