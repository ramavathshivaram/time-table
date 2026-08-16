import { memo } from "react";
import { CalendarDays, Clock3 } from "lucide-react";

import DesignerNode from "./DesignerNode";
import { NodeInfo } from "./NodeInfo";

interface AcademicYearNodeProps {
  data: {
    name?: string;
    year?: number;
    semester?: number;

    time?: {
      startTime?: string;
      endTime?: string;
      periodDuration?: number;
      numberOfPeriods?: number;
    };
  };

  isConnectable?: boolean;
  selected?: boolean;
}

const AcademicYearNode = ({
  data,
  isConnectable,
  selected,
}: AcademicYearNodeProps) => {
  return (
    <DesignerNode
      type="academic-year"
      label={data?.name}
      subLabel={data?.year ? `Year ${data.year}` : "Academic Year"}
      selected={selected}
      showTarget
      showSource
      sourceConnectable={isConnectable}
    >
      <div className="space-y-1.5">
        {data?.semester && (
          <NodeInfo icon={CalendarDays}>Semester {data.semester}</NodeInfo>
        )}

        {data?.time?.startTime && data?.time?.endTime && (
          <NodeInfo icon={Clock3}>
            {data.time.startTime} – {data.time.endTime}
          </NodeInfo>
        )}
      </div>
    </DesignerNode>
  );
};

export default memo(AcademicYearNode);
