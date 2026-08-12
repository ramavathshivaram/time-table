import { memo } from "react";

import { designerNodes } from "../../constants/designer-nodes.data";
import DesignerNode from "./DesignerNode";

const DefaultNode = ({ data, type, selected, isConnectable }) => {
  const config = designerNodes[type];

  return (
    <DesignerNode
      icon={config?.icon}
      iconColor={config?.color}
      label={data?.label}
      subLabel={config?.title}
      selected={selected}
      showTarget
      showSource
      sourceConnectable={isConnectable}
    />
  );
};

export default memo(DefaultNode);
