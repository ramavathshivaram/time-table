import React, { memo } from "react";
import { Panel } from "@xyflow/react";

import NodeLibrary from "./NodeLibrary";
import WorkflowTitle from "./WorkflowTitle";
import WorkflowControls from "./WorkflowControls";
import GenerateTimeTable from "./GenerateTimeTable";
import Resources from "./resources/Resources";
import AIChatBotWrapper from "./AIChatBotWrapper";

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
        <AIChatBotWrapper />
      </Panel>

      <Panel position="bottom-left">
        <Resources />
      </Panel>
    </>
  );
};

export default memo(ReactflowPanels);
