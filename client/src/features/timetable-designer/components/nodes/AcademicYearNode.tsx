import { memo } from "react";

import DesignerNode from "./DesignerNode";

interface AcademicYearNodeProps {
  data: {
    label?: string;
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
      label={data?.label}
      subLabel={data?.year ? `Year ${data.year}` : "Academic Year"}
      selected={selected}
      showTarget
      showSource
      sourceConnectable={isConnectable}
    ></DesignerNode>
  );
};

export default memo(AcademicYearNode);
