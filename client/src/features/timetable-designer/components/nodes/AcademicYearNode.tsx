import { memo } from "react";

import DesignerNode from "./DesignerNode";

const AcademicYearNode = ({ data, isConnectable, selected }) => {
  return (
    <DesignerNode
      type="academic-year"
      label={data?.label}
      selected={selected}
      showTarget
      showSource
      sourceConnectable={isConnectable}
    />
  );
};

export default memo(AcademicYearNode);
