import { useQuery } from "@tanstack/react-query";
import { getAllUserWorkflowsApi } from "@/lib/apis/workflow.api.js";

export const useGetAllUserWorkflows = () => {
  return useQuery({
    queryKey: ["workflows"],
    queryFn: getAllUserWorkflowsApi,
    staleTime: 5 * 60 * 1000,
  });
};
