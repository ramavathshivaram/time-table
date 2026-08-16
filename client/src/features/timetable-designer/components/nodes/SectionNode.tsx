import { memo } from "react";
import { Users, Clock3 } from "lucide-react";

import DesignerNode from "./DesignerNode";
import { NodeInfo } from "./NodeInfo";

interface SectionNodeProps {
  data: {
    name?: string;
    strength?: number;

    time?: {
      startTime?: string;
      endTime?: string;
    };
  };

  isConnectable?: boolean;
  selected?: boolean;
}

const SectionNode = ({ data, isConnectable, selected }: SectionNodeProps) => {
  return (
    <DesignerNode
      type="section"
      label={data?.name}
      subLabel="Section"
      selected={selected}
      showTarget
      showSource
      sourceConnectable={isConnectable}
    >
      <div className="flex items-center gap-4">
        {data?.strength !== undefined && (
          <NodeInfo icon={Users}>{data.strength} students</NodeInfo>
        )}

        {data?.time?.startTime && data?.time?.endTime && (
          <NodeInfo icon={Clock3}>
            {data.time.startTime} – {data.time.endTime}
          </NodeInfo>
        )}
      </div>
    </DesignerNode>
  );
};

export default memo(SectionNode);
