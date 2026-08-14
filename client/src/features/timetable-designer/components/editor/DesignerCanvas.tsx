import "@xyflow/react/dist/style.css";

import {
  Background,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";

import DesignerPanels from "../panels/DesignerPanels";

import { usePreferencesStore } from "@/shared/preferences/preferences.store";

import {
  useDesignerDnD,
  useDesignerInteractions,
  useEdgeTypes,
  useNodeTypes,
} from "../../hooks";

import type { Edge, Node } from "../../types";

interface Props {
  timetableId: string;
  initialNodes: Node[];
  initialEdges: Edge[];
}

const DesignerCanvas = ({ timetableId, initialNodes, initialEdges }: Props) => {
  const darkMode = usePreferencesStore((state) => state.darkMode);

  /*
   * React Flow owns local canvas state.
   * Server data is only used as the initial snapshot.
   */
  const [nodes, setNodes] = useNodesState(initialNodes);

  const [edges, setEdges] = useEdgesState(initialEdges);

  /*
   * Designer interactions
   */
  const {
    onNodesChange: handleNodesChange,
    onEdgesChange: handleEdgesChange,
    onConnect,
    isValidConnection,
    onNodeDoubleClick,
    onConnectEnd,
  } = useDesignerInteractions({
    setNodes,
    setEdges,
  });

  /*
   * Drag & Drop
   */
  const { onDragOver, onDrop } = useDesignerDnD();

  /*
   * React Flow component mappings
   */
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
        onNodesChange={handleNodesChange}
        onEdgesChange={handleEdgesChange}
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
