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
import ModalWrapper from "./modals/ModalWrapper.jsx";
import StartNode from "./node-components/StartNode";
import ResourcesModal from "./modals/ResourcesModal";

const WorkflowEditor = ({ initialWorkflowData, workflowId }) => {
  const darkMode = useUserStore((s) => s.darkMode);

  const reactFlowInstanceRef = useRef(null);

  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,

    onConnect,
    isValidConnection,
    onNodeDoubleClick,
    onConnectEnd,
  } = useWorkflowInteractions(reactFlowInstanceRef);

  const { onDragOver, onDrop, onDragStart } = useDnD({
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

      <ModalWrapper />
      <ResourcesModal />
    </div>
  );
};

export default WorkflowEditor;
