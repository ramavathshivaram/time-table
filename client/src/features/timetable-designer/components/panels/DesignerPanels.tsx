import { Panel } from "@xyflow/react";
import React, { memo } from "react";
import NodePalette from "./NodePalette";
import GenerateSchedule from "./GenerateSchedule";
import DesignerControls from "./DesignerControls";
import TimetableTitle from "./TimetableTitle";

const DesignerPanels = () => {
  return (
    <>
      <Panel position="top-left">
        <TimetableTitle />
      </Panel>

      <Panel position="top-center">
        <DesignerControls />
      </Panel>

      <Panel position="top-right">
        <GenerateSchedule />
      </Panel>

      <Panel position="top-left">
        <NodePalette />
      </Panel>

      {/* <Panel position="bottom-right">
        <AIChatBotWrapper />
      </Panel>

      <Panel position="bottom-left">
        <Resources />
      </Panel> */}
    </>
  );
};

export default memo(DesignerPanels);
