import { memo } from "react";

import DesignerNode from "./DesignerNode";

interface InstitutionNodeProps {
  data: {
    label: string;

    time?: {
      startTime?: string;
      endTime?: string;
      numberOfPeriods?: number;
      workingDays?: string[];

      breaks?: {
        type: "lunch" | "short-break";
        startTime: string;
        endTime: string;
      }[];
    };
  };

  isConnectable?: boolean;
  selected?: boolean;
}

const InstitutionNode = ({
  data,
  isConnectable,
  selected,
}: InstitutionNodeProps) => {
  const time = data.time;

  return (
    <DesignerNode
      type="institution"
      label={data.label}
      selected={selected}
      showSource
      sourceConnectable={isConnectable}
    ></DesignerNode>
  );
};

export default memo(InstitutionNode);
