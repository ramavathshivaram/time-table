import {
  useMutation,
  useQuery,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";

import {
  getWorkflowsApi,
  getWorkflowDetailsApi,
  createWorkflowApi,
  getRecentWorkflowsApi,
} from "@/lib/apis/workflow.api.js";

export const useGetWorkflows = () => {
  return useInfiniteQuery({
    queryKey: ["workflows"],
    queryFn: getWorkflowsApi,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length === 0) return undefined;
      return pages.length;
    },
  });
};

export const useGetRecentWorkflows = () => {
  return useQuery({
    queryKey: ["recent-workflows"],
    queryFn: getRecentWorkflowsApi,
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
