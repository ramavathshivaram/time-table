import "@xyflow/react/dist/style.css";
import React, { useRef } from "react";
import { ReactFlow, Background } from "@xyflow/react";
import ReactflowPanels from "./panels/ReactflowPanels";
import useDnD from "./workflows-hooks/useDnd.js";
import useWorkflowInteractions from "./workflows-hooks/useWorkflowStates.js";

const WorkflowEditor = ({ initialWorkflowData, workflowId }) => {
  const reactFlowInstanceRef = useRef(null);

  const {
    nodes,
    setNodes,
    onNodesChange,
    edges,
    onEdgesChange,
    onConnect,
    autoArrangement,
    duplicateSelected
  } = useWorkflowInteractions(initialWorkflowData,workflowId, reactFlowInstanceRef);

  const { onDragOver, onDrop, onDragStart } = useDnD({
    setNodes,
    reactFlowInstanceRef,
  });

  return (
    <div className="w-screen h-screen">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        // drag and drop
        onDragOver={onDragOver}
        onDrop={onDrop}
        colorMode="light"
        deleteKeyCode={["Delete", "Backspace"]}
        selectionKeyCode={["Shift", "Meta"]}
        multiSelectionKeyCode={["Shift", "Control"]}
        // init
        onInit={(instance) => (reactFlowInstanceRef.current = instance)}
        proOptions={{ hideAttribution: true }}
        fitView
      >
        <Background />

        <ReactflowPanels
          workflowId={workflowId}
          title={initialWorkflowData.title}
          onDragStart={onDragStart}
          autoArrangement={autoArrangement}
          duplicateSelected={duplicateSelected}
        />
      </ReactFlow>
    </div>
  );
};

export default WorkflowEditor;
