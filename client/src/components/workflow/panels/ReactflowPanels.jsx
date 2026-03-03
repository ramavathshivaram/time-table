import React, { memo } from "react";

import { Panel } from "@xyflow/react";

import NodeLibrary from "./NodeLibrary";
import WorkflowTitle from "./WorkflowTitle";
import WorkflowControls from "./WorkflowControls";
import GenerateTimeTable from "./GenerateTimeTable";

const ReactflowPanels = ({
  workflowId,
  title,
  onDragStart,
  autoArrangement,
  duplicateSelected,
}) => {
  return (
    <>
      <Panel position="top-left">
        <WorkflowTitle title={title} workflowId={workflowId} />
      </Panel>

      <Panel position="top-center">
        <WorkflowControls
          autoArrangement={autoArrangement}
          duplicateSelected={duplicateSelected}
        />
      </Panel>

      <Panel position="top-right">
        <GenerateTimeTable />
      </Panel>

      <Panel position="left">
        <NodeLibrary onDragStart={onDragStart} />
      </Panel>
    </>
  );
};

export default memo(ReactflowPanels);
