import { memo } from "react";
import { useNodeConnections } from "@xyflow/react";

import DesignerNode from "./DesignerNode";

const SectionNode = ({ data, selected }) => {
  const connections = useNodeConnections({
    handleType: "target",
  });

  return (
    <DesignerNode
      type="section"
      label={data?.label}
      selected={selected}
      showTarget
      targetConnectable={connections.length === 0}
    />
  );
};

export default memo(SectionNode);
