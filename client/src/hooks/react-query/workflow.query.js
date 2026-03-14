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
  deleteWorkflowApi,
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

export const useDeleteWorkflow = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ workflowId }) => deleteWorkflowApi(workflowId),

    onMutate: async ({ workflowId }) => {
      await queryClient.cancelQueries({ queryKey: ["workflows"] });
      await queryClient.cancelQueries({ queryKey: ["recent-workflows"] });

      const previousWorkflows = queryClient.getQueryData(["workflows"]);
      const previousRecent = queryClient.getQueryData(["recent-workflows"]);

      // update infinite workflows
      queryClient.setQueryData(["workflows"], (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          pages: oldData.pages.map((page) =>
            page.filter((workflow) => workflow._id !== workflowId),
          ),
        };
      });

      // update recent workflows
      queryClient.setQueryData(["recent-workflows"], (old = []) =>
        old.filter((workflow) => workflow._id !== workflowId),
      );

      return { previousWorkflows, previousRecent };
    },

    onError: (err, variables, context) => {
      if (context?.previousWorkflows) {
        queryClient.setQueryData(["workflows"], context.previousWorkflows);
      }

      if (context?.previousRecent) {
        queryClient.setQueryData(["recent-workflows"], context.previousRecent);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["workflows"] });
      queryClient.invalidateQueries({ queryKey: ["recent-workflows"] });
    },
  });
};
