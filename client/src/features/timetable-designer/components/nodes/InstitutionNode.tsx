import { memo } from "react";
import { School } from "lucide-react";

import DesignerNode from "./DesignerNode";

const InstitutionNode = ({ data, isConnectable, selected }) => {
  return (
    <DesignerNode
      icon={School}
      iconColor="text-blue-600"
      label={data?.label}
      subLabel="Institution"
      selected={selected}
      showTarget
      showSource
      sourceConnectable={isConnectable}
    />
  );
};

export default memo(InstitutionNode);
