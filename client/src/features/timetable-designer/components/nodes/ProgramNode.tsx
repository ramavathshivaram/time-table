import { memo } from "react";

import DesignerNode from "./DesignerNode";

interface ProgramNodeProps {
  data: {
    label: string;

    time?: {
      startTime?: string;
      endTime?: string;
      periodDuration?: number;
      numberOfPeriods?: number;
    };

    resources?: {
      facultyIds?: string[];
      subjectIds?: string[];
      roomIds?: string[];
    };
  };

  isConnectable?: boolean;
  selected?: boolean;
}

const ProgramNode = ({ data, isConnectable, selected }: ProgramNodeProps) => {
  return (
    <DesignerNode
      type="program"
      label={data?.label}
      subLabel={"Program"}
      selected={selected}
      showTarget
      showSource
      sourceConnectable={isConnectable}
    ></DesignerNode>
  );
};

export default memo(ProgramNode);
