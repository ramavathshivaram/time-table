import { useEffect, useMemo } from "react";
import debounce from "lodash.debounce";
import { updateWorkflowApi } from "@/lib/apis/workflow.api.js";

const delayTime = 1000;

const useDebounceSave = (workflowId) => {
  const debouncedSave = useMemo(() => {
    return debounce(async (data) => {
      try {
        await updateWorkflowApi(workflowId, data);
      } catch (error) {
        console.error("Auto-save failed:", error);
      }
    }, delayTime);
  }, [workflowId]);

  // cleanup on unmount
  useEffect(() => {
    return () => {
      debouncedSave.cancel();
    };
  }, [debouncedSave]);

  return debouncedSave;
};

export default useDebounceSave;