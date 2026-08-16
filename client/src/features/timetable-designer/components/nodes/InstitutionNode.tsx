import { memo } from "react";
import { CalendarDays, Clock3 } from "lucide-react";

import DesignerNode from "./DesignerNode";
import { NodeInfo } from "./NodeInfo";

interface InstitutionNodeProps {
  data: {
    name?: string;
    code?: string;
    time?: {
      startTime?: string;
      endTime?: string;
      periodDuration?: number;
      numberOfPeriods?: number;
      workingDays?: string[];
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
  return (
    <DesignerNode
      type="institution"
      label={data?.name}
      subLabel={data?.code}
      selected={selected}
      showSource
      sourceConnectable={isConnectable}
    >
      <div className="space-y-1.5">
        {data?.time?.startTime && data?.time?.endTime && (
          <NodeInfo icon={Clock3}>
            {data.time.startTime} – {data.time.endTime}
          </NodeInfo>
        )}

        {data?.time?.periodDuration && (
          <NodeInfo icon={Clock3}>
            {data.time.periodDuration} min × {data.time.numberOfPeriods ?? 0}{" "}
            periods
          </NodeInfo>
        )}

        {data?.time?.workingDays && (
          <NodeInfo icon={CalendarDays}>
            {data.time.workingDays.length} working days
          </NodeInfo>
        )}
      </div>
    </DesignerNode>
  );
};

export default memo(InstitutionNode);
