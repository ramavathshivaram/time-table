import { useEffect, useMemo } from "react";
import debounce from "lodash.debounce";
import nodeService from "@/services/workflow/node.service";

const delayTime = 500;

const useNodeUpdateDebounce = () => {
  const debouncedSave = useMemo(() => {
    return debounce(async (nodeId, positions) => {
      nodeService.updateNodePosition(nodeId, positions);
    }, delayTime);
  }, []);

  // cleanup on unmount
  useEffect(() => {
    return () => {
      debouncedSave.cancel();
    };
  }, [debouncedSave]);

  return debouncedSave;
};

export default useNodeUpdateDebounce;
