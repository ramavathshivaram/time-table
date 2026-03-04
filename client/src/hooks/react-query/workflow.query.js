import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getAllUserWorkflowsApi,
  getWorkflowDetailsApi,
  createWorkflowApi,
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
    enabled: !!workflowId,
    staleTime: 5 * 60 * 1000,
  });
};

export const useCreateWorkflow = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createWorkflowApi,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["workflows"],
      });
    },
  });
};
