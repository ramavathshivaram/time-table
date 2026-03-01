import React from "react";
import { ReactFlow, Background, Panel } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import NodeLibrary from "./panels/NodeLibrary";
import WorkflowTitle from "./panels/WorkflowTitle";
import WorkflowControls from "./panels/WorkflowControls";
import GenerateTimeTable from "./panels/GenerateTimeTable";

const WorkflowEditor = () => {
  return (
    <div className="w-screen h-screen">
      <ReactFlow proOptions={{ hideAttribution: true }}>
        <Background />

        <Panel position="top-left">
          <WorkflowTitle />
        </Panel>

        <Panel position="top-center">
          <WorkflowControls />
        </Panel>

        <Panel position="top-right">
          <GenerateTimeTable />
        </Panel>

        <Panel position="left">
          <NodeLibrary />
        </Panel>
      </ReactFlow>
    </div>
  );
};

export default WorkflowEditor;
