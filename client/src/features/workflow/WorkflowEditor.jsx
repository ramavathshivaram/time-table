import "@xyflow/react/dist/style.css";
import useUserStore from "@/store/user.store.js";
import React, { useRef, useMemo } from "react";
import { ReactFlow, Background, BezierEdge } from "@xyflow/react";

import ReactflowPanels from "./panels/ReactflowPanels";
import useDnD from "./workflows-hooks/useDnD.js";
import useWorkflowInteractions from "./workflows-hooks/useWorkflowInteractions.js";

import CollegeNode from "./node-components/CollegeNode";
import DefaultNode from "./node-components/DefaultNode";
import SectionNode from "./node-components/SectionNode";
import StartNode from "./node-components/StartNode";

import ModalWrapper from "./modals/ModalWrapper.jsx";
import ResourcesModal from "./modals/ResourcesModal";

import nodeTypesConfig from "./nodeTypes.js";

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

  /* ------------------ Dynamic Node Mapping ------------------ */
  const nodeComponentMap = useMemo(() => {
    const map = {};

    nodeTypesConfig.forEach((node) => {
      switch (node.type) {
        case "start":
          map[node.type] = StartNode;
          break;
        case "college":
          map[node.type] = CollegeNode;
          break;
        case "section":
          map[node.type] = SectionNode;
          break;
        default:
          map[node.type] = DefaultNode;
      }
    });

    return map;
  }, []);

  /* ------------------ Edge Types ------------------ */
  const edgeTypes = useMemo(
    () => ({
      bezier: (props) => (
        <BezierEdge
          {...props}
          style={{ strokeWidth: 2 }}
        />
      ),
    }),
    []
  );

  return (
    <div className="w-screen h-screen">
      <ReactFlow
        key={workflowId}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeComponentMap}
        edgeTypes={edgeTypes}
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

        minZoom={0.5}
        maxZoom={1.5}
        snapToGrid
        snapGrid={[20, 20]}
        panOnScroll
        panOnDrag
      >
        <Background />

        <ReactflowPanels
          workflowId={workflowId}
          title={initialWorkflowData?.title}
          onDragStart={onDragStart}
        />
      </ReactFlow>

      <ModalWrapper />
      <ResourcesModal />
    </div>
  );
};

export default WorkflowEditor;