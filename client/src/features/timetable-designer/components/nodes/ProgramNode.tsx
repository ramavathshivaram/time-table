import { memo } from "react";

import DesignerNode from "./DesignerNode";

const ProgramNode = ({ data, isConnectable, selected }) => {
  return (
    <DesignerNode
      type="program"
      label={data?.label}
      selected={selected}
      showTarget
      showSource
      sourceConnectable={isConnectable}
    />
  );
};

export default memo(ProgramNode);
