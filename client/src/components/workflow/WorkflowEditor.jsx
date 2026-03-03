import React, { useRef } from "react";
import {
  ReactFlow,
  Background,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import ReactflowPanels from "./panels/ReactflowPanels";
import useDnD from "./workflows-hooks/useDnd.js";

const WorkflowEditor = ({ initialWorkflowData, workflowId }) => {
  const reactFlowInstanceRef = useRef(null);

  const [nodes, setNodes, onNodesChange] = useNodesState(
    initialWorkflowData.nodes,
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState(
    initialWorkflowData.edges,
  );

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
        // drag and drop
        onDragOver={onDragOver}
        onDrop={onDrop}
        // init
        onInit={(instance) => (reactFlowInstanceRef.current = instance)}
        proOptions={{ hideAttribution: true }}
      >
        <Background />

        <ReactflowPanels
          workflowId={workflowId}
          title={initialWorkflowData.title}
          onDragStart={onDragStart}
        />
      </ReactFlow>
    </div>
  );
};

export default WorkflowEditor;
