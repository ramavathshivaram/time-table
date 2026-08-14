import { memo } from "react";

import DesignerNode from "./DesignerNode";

const InstitutionNode = ({ data, isConnectable, selected }) => {
  return (
    <DesignerNode
      type="institution"
      label={data?.label}
      selected={selected}
      showTarget
      showSource
      sourceConnectable={isConnectable}
    />
  );
};

export default memo(InstitutionNode);
