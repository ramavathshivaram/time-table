import { Panel } from "@xyflow/react";
import React, { memo } from "react";
import GenerateSchedule from "./GenerateSchedule";
import DesignerControls from "./DesignerControls";
import TimetableTitle from "./TimetableTitle";
import DesignerPalette from "./DesignerPalette";

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
        <DesignerPalette />
      </Panel>

      {/* <Panel position="bottom-right">
        <AIChatBotWrapper />
      </Panel> */}
    </>
  );
};

export default memo(DesignerPanels);
