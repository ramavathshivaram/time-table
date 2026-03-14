import "@xyflow/react/dist/style.css";
import useUserStore from "@/store/user.store.js";
import React, { useRef, useMemo } from "react";
import { ReactFlow, Background } from "@xyflow/react";

import ReactflowPanels from "./panels/ReactflowPanels";
import useDnD from "./workflows-hooks/useDnD.js";
import useWorkflowInteractions from "./workflows-hooks/useWorkflowInteractions.js";

import CollegeNode from "./node-components/CollegeNode";
import DefaultNode from "./node-components/DefaultNode";
import SectionNode from "./node-components/SectionNode";
import Modal from "./modals/ModalWrapper.jsx";
import StartNode from "./node-components/StartNode";
import useWorkflowStore from "@/store/workflow.store.js";

const WorkflowEditor = ({ initialWorkflowData, workflowId }) => {
  const darkMode = useUserStore((s) => s.darkMode);

  const nodes=useWorkflowStore((s) => s.nodes);
  
  const reactFlowInstanceRef = useRef(null);

  const {
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

  const nodeTypes = useMemo(
    () => ({
      start: StartNode,
      college: CollegeNode,
      branch: DefaultNode,
      year: DefaultNode,
      section: SectionNode,
      room: DefaultNode,
      subject: DefaultNode,
      faculty: DefaultNode,
      lab: DefaultNode,
    }),
    [],
  );

  return (
    <div className="w-screen h-screen">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onDragOver={onDragOver}
        onDrop={onDrop}
        colorMode={darkMode ? "dark" : "light"}
        deleteKeyCode={["Delete", "Backspace"]}
        selectionKeyCode={["Shift", "Meta"]}
        multiSelectionKeyCode={["Shift", "Control"]}
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

      <Modal />
    </div>
  );
};

export default WorkflowEditor;
