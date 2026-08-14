import "@xyflow/react/dist/style.css";

import { useRef } from "react";
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
  const reactFlowInstanceRef = useRef<unknown>(null);
  const darkMode = usePreferencesStore((s) => s.darkMode);
  const interactions = useDesignerInteractions();
  const { onDragOver, onDrop } = useDesignerDnD();

  const nodeTypes = useNodeTypes();
  const edgeTypes = useEdgeTypes();

  return (
    <div className="absolute inset-0">
      <ReactFlow
        key={timetableId}
        nodes={interactions.nodes}
        edges={interactions.edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={interactions.onNodesChange}
        onEdgesChange={interactions.onEdgesChange}
        onConnect={interactions.onConnect}
        onDragOver={onDragOver}
        onDrop={onDrop}
        colorMode={darkMode ? "dark" : "light"}
        deleteKeyCode={["Delete", "Backspace"]}
        selectionKeyCode={["Shift", "Meta"]}
        multiSelectionKeyCode={["Shift", "Control"]}
        isValidConnection={interactions.isValidConnection}
        onNodeDoubleClick={interactions.onNodeDoubleClick}
        onConnectEnd={interactions.onConnectEnd}
        onInit={(instance) => {
          reactFlowInstanceRef.current = instance;
        }}
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
