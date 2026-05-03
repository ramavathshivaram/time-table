import { School } from "lucide-react";
import { memo } from "react";
import NodeWrapper from "./NodeWrapper";

const CollegeNode = ({ data, isConnectable, selected }) => {
  return (
    <NodeWrapper
      icon={School}
      iconColor="text-blue-600"
      label={data?.label}
      subLabel="College"
      selected={selected}
      showSource
      showTarget
      isConnectable={isConnectable}
    />
  );
};

export default memo(CollegeNode);