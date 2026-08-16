import { memo } from "react";
import { Clock3, Users, BookOpen, DoorOpen } from "lucide-react";

import DesignerNode from "./DesignerNode";
import { NodeInfo } from "./NodeInfo";

interface ProgramNodeProps {
  data: {
    name?: string;
    code?: string;

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
      label={data?.name}
      subLabel={data?.code}
      selected={selected}
      showTarget
      showSource
      sourceConnectable={isConnectable}
    >
      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
        {data?.time?.startTime && data?.time?.endTime && (
          <NodeInfo icon={Clock3}>
            {data.time.startTime} – {data.time.endTime}
          </NodeInfo>
        )}

        {data?.resources?.facultyIds && (
          <NodeInfo icon={Users}>
            {data.resources.facultyIds.length} faculty
          </NodeInfo>
        )}

        {data?.resources?.subjectIds && (
          <NodeInfo icon={BookOpen}>
            {data.resources.subjectIds.length} subjects
          </NodeInfo>
        )}

        {data?.resources?.roomIds && (
          <NodeInfo icon={DoorOpen}>
            {data.resources.roomIds.length} rooms
          </NodeInfo>
        )}
      </div>
    </DesignerNode>
  );
};

export default memo(ProgramNode);
