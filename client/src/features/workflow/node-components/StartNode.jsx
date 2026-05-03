import { Play } from "lucide-react";
import NodeWrapper from "./NodeWrapper";
import { memo } from "react";

const StartNode = ({ data, isConnectable, selected }) => {
  return (
    <NodeWrapper
      icon={Play}
      iconColor="text-green-600"
      label={data?.label}
      subLabel="Start"
      selected={selected}
      showSource
      isConnectable={isConnectable}
    />
  );
};

export default memo(StartNode);