import { memo } from "react";

import DesignerNode from "./DesignerNode";

interface SectionNodeProps {
  data: {
    label?: string;
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
      label={data?.label}
      subLabel="Section"
      selected={selected}
      showTarget
      showSource={false}
      sourceConnectable={isConnectable}
    ></DesignerNode>
  );
};

export default memo(SectionNode);
