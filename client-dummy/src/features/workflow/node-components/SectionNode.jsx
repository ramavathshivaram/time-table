import { memo } from "react";
import { useNodeConnections } from "@xyflow/react";
import nodeTypes from "../nodeTypes.js";
import NodeWrapper from "./NodeWrapper";

const SectionNode = ({ data, type, selected }) => {
  const connections = useNodeConnections({ handleType: "target" });

  const node = nodeTypes.find((n) => n.type === type) || {};

  return (
    <NodeWrapper
      icon={node.icon}
      iconColor={node.color}
      label={data?.label}
      subLabel="Section"
      selected={selected}
      showTarget
      targetConnectable={connections.length < 1}
    />
  );
};

export default memo(SectionNode);