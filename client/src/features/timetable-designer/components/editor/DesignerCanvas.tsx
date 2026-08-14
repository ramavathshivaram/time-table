import "@xyflow/react/dist/style.css";

import { Background, ReactFlow } from "@xyflow/react";

import DesignerPanels from "../panels/DesignerPanels";

import { usePreferencesStore } from "@/shared/preferences/preferences.store";

import {
  useDesignerDnD,
  useDesignerInteractions,
  useEdgeTypes,
  useNodeTypes,
} from "../../hooks";

interface Props {
  timetableId: string;
}

const DesignerCanvas = ({ timetableId }: Props) => {
  const darkMode = usePreferencesStore((state) => state.darkMode);

  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    isValidConnection,
    onNodeDoubleClick,
    onConnectEnd,
  } = useDesignerInteractions();

  const { onDragOver, onDrop } = useDesignerDnD();

  const nodeTypes = useNodeTypes();
  const edgeTypes = useEdgeTypes();

  return (
    <div className="absolute inset-0">
      <ReactFlow
        key={timetableId}
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        isValidConnection={isValidConnection}
        onNodeDoubleClick={onNodeDoubleClick}
        onConnectEnd={onConnectEnd}
        onDragOver={onDragOver}
        onDrop={onDrop}
        colorMode={darkMode ? "dark" : "light"}
        deleteKeyCode={["Delete", "Backspace"]}
        selectionKeyCode={["Shift", "Meta"]}
        multiSelectionKeyCode={["Shift", "Control"]}
        proOptions={{
          hideAttribution: true,
        }}
        fitView
        minZoom={0.5}
        maxZoom={1.5}
        snapToGrid
        snapGrid={[20, 20]}
        panOnScroll
        panOnDrag
      >
        <Background />

        <DesignerPanels />
      </ReactFlow>
    </div>
  );
};

export default DesignerCanvas;
