import { memo } from "react";

import DesignerNode from "./DesignerNode";

const StartNode = ({ data, isConnectable, selected }) => {
  return (
    <DesignerNode
      type="start"
      label={data?.label}
      selected={selected}
      showSource
      sourceConnectable={isConnectable}
    />
  );
};

export default memo(StartNode);
