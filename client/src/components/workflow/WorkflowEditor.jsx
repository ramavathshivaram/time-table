import "@xyflow/react/dist/style.css";
import useUserStore from "@/store/user.store.js";
import React, { useRef } from "react";
import { ReactFlow, Background, ReactFlowProvider } from "@xyflow/react";
import ReactflowPanels from "./panels/ReactflowPanels";
import useDnD from "./workflows-hooks/useDnD.js";
import useWorkflowInteractions from "./workflows-hooks/useWorkflowStates.js";

import CollegeNode from "./node-components/CollegeNode";
import DefaultNode from "./node-components/DefaultNode";
import Madal from "./madals/ModalWrapper.jsx";
import SectionNode from "./node-components/SectionNode";

const WorkflowEditor = ({ initialWorkflowData, workflowId }) => {
  const darkMode = useUserStore((s) => s.darkMode);
  const reactFlowInstanceRef = useRef(null);

  const {
    nodes,
    setNodes,
    onNodesChange,
    edges,
    onEdgesChange,
    onConnect,
    isValidConnection,
    onNodeDoubleClick,
    onConnectEnd,
  } = useWorkflowInteractions(
    initialWorkflowData,
    workflowId,
    reactFlowInstanceRef,
  );

  const { onDragOver, onDrop, onDragStart } = useDnD({
    setNodes,
    reactFlowInstanceRef,
  });

  const nodeTypes = {
    college: CollegeNode,
    branch: DefaultNode,
    year: DefaultNode,
    section: SectionNode,
    room: DefaultNode,
    subject: DefaultNode,
    faculty: DefaultNode,
    lab: DefaultNode,
  };

  return (
    <div className="w-screen h-screen">
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          //? node types
          nodeTypes={nodeTypes}
          //? drag and drop
          onDragOver={onDragOver}
          onDrop={onDrop}
          colorMode={darkMode ? "dark" : "light"}
          deleteKeyCode={["Delete", "Backspace"]}
          selectionKeyCode={["Shift", "Meta"]}
          multiSelectionKeyCode={["Shift", "Control"]}
          //? init
          isValidConnection={isValidConnection}
          onNodeDoubleClick={onNodeDoubleClick}
          onConnectEnd={onConnectEnd}
          onInit={(instance) => (reactFlowInstanceRef.current = instance)}
          proOptions={{ hideAttribution: true }}
          fitView
        >
          <Background />

          <ReactflowPanels
            workflowId={workflowId}
            title={initialWorkflowData.title}
            onDragStart={onDragStart}
          />
        </ReactFlow>
        <Madal />
      </ReactFlowProvider>
    </div>
  );
};

export default WorkflowEditor;
