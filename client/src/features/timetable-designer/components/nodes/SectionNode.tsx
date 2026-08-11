import { memo } from "react";
import { Layers } from "lucide-react";
import { useNodeConnections } from "@xyflow/react";

import DesignerNode from "./DesignerNode";

const SectionNode = ({ data, selected }) => {
  const connections = useNodeConnections({
    handleType: "target",
  });

  const hasParent = connections.length > 0;

  return (
    <DesignerNode
      icon={Layers}
      iconColor="text-pink-600"
      label={data?.label}
      subLabel="Section"
      selected={selected}
      showTarget
      targetConnectable={!hasParent}
    />
  );
};

export default memo(SectionNode);
