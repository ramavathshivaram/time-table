import { useQuery } from "@tanstack/react-query";
import {
  getAllUserWorkflowsApi,
  getWorkflowDetailsApi,
} from "@/lib/apis/workflow.api.js";

export const useGetAllUserWorkflows = () => {
  return useQuery({
    queryKey: ["workflows"],
    queryFn: getAllUserWorkflowsApi,
    staleTime: 5 * 60 * 1000,
  });
};

export const useGetWorkflowDetails = (workflowId) => {
  return useQuery({
    queryKey: ["workflow", workflowId],
    queryFn: () => getWorkflowDetailsApi(workflowId),
    staleTime: 5 * 60 * 1000,
  });
};
