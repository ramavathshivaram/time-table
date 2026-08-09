import { memo } from "react";
import nodeTypes from "../nodeTypes.js";
import NodeWrapper from "./NodeWrapper";

const DefaultNode = ({ data, isConnectable, type, selected }) => {
  const node = nodeTypes.find((n) => n.type === type) || {};

  return (
    <NodeWrapper
      icon={node.icon}
      iconColor={node.color}
      label={data?.label}
      subLabel={node.label || node.title}
      selected={selected}
      showSource
      showTarget
      isConnectable={isConnectable}
    />
  );
};

export default memo(DefaultNode);