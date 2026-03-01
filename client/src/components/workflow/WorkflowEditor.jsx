import React from "react";
import { ReactFlow, Background, Controls, Panel } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import NodeLibrary from "./panels/NodeLibary";

const WorkflowEditor = () => {
  return (
    <div className="w-screen h-screen">
      <ReactFlow>
        <Background />
        <Controls />

        <Panel position="top-left">
          <NodeLibrary />
        </Panel>
      </ReactFlow>
    </div>
  );
};

export default WorkflowEditor;
