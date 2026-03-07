import React, { useState } from "react";

const YearModal = ({ activeNode, setNodes, closeModal }) => {
  const [year, setYear] = useState(activeNode?.data?.year || "");

  const handleSave = () => {
    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === activeNode.id
          ? {
              ...node,
              data: {
                ...node.data,
                year,
              },
            }
          : node,
      ),
    );

    closeModal();
  };

  return (
    <div className="flex flex-col gap-3 w-[300px]">
      <h2 className="text-lg font-semibold">Year Settings</h2>

      <input
        value={year}
        onChange={(e) => setYear(e.target.value)}
        placeholder="Year (1,2,3,4)"
        className="border rounded p-2"
      />

      <div className="flex justify-end gap-2">
        <button onClick={closeModal} className="px-3 py-1 border rounded">
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

export default YearModal;
