import { useCallback } from "react";

const useSelectAll = ({ setEdges, setNodes }) => {
  return useCallback(() => {
    setNodes((nds) => nds.map((node) => ({ ...node, selected: true })));
    setEdges((eds) => eds.map((edge) => ({ ...edge, selected: true })));
  }, [setEdges, setNodes]);
};

export default useSelectAll;
