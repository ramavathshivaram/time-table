import React, { useState } from "react";

const BranchModal = ({ activeNode, setNodes, closeModal }) => {
  const [branchName, setBranchName] = useState(
    activeNode?.data?.branchName || "",
  );

  const handleSave = () => {
    closeModal();
  };

  return (
    <div className="flex flex-col gap-3 w-[300px]">
      <h2 className="text-lg font-semibold">Branch Settings</h2>

      <input
        value={branchName}
        onChange={(e) => setBranchName(e.target.value)}
        placeholder="Branch Name"
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

export default BranchModal;
