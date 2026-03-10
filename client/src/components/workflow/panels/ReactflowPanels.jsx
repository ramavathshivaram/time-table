import React, { memo } from "react";

import { Panel } from "@xyflow/react";

import NodeLibrary from "./NodeLibrary";
import WorkflowTitle from "./WorkflowTitle";
import WorkflowControls from "./WorkflowControls";
import GenerateTimeTable from "./GenerateTimeTable";
import AIChatBot from "./AIChatBot";

const ReactflowPanels = ({ workflowId, title, onDragStart }) => {
  return (
    <>
      <Panel position="top-left">
        <WorkflowTitle title={title} workflowId={workflowId} />
      </Panel>

      <Panel position="top-center">
        <WorkflowControls />
      </Panel>

      <Panel position="top-right">
        <GenerateTimeTable />
      </Panel>

      <Panel position="left">
        <NodeLibrary onDragStart={onDragStart} />
      </Panel>

      <Panel position="bottom-right">
        <AIChatBot />
      </Panel>
    </>
  );
};

export default memo(ReactflowPanels);
