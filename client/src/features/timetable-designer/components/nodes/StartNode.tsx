import { memo } from "react";
import { Play } from "lucide-react";

import DesignerNode from "./DesignerNode";

const StartNode = ({ data, isConnectable, selected }) => {
  return (
    <DesignerNode
      icon={Play}
      iconColor="text-green-600"
      label={data?.label}
      subLabel="Start"
      selected={selected}
      showSource
      sourceConnectable={isConnectable}
    />
  );
};

export default memo(StartNode);
