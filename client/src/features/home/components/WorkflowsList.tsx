import { useGetWorkflows } from "@/hooks/react-query/workflow.query.js";
import React, { useEffect } from "react";
import WorkflowCard from "./WorkflowCard";
import { useInView } from "react-intersection-observer";

const WorkflowsList = ({ query }) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useGetWorkflows(query);

  const { ref, inView } = useInView({ threshold: 0, rootMargin: "200px" });

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView, fetchNextPage, hasNextPage]);

  const workflows = data?.pages?.flat() || [];

  if (status === "loading")
    return (
      <div className="text-sm text-muted-foreground">Loading workflows...</div>
    );

  if (status === "error")
    return <div className="text-sm text-red-500">Error fetching workflows</div>;

  if (!workflows.length)
    return (
      <div className="text-center text-muted-foreground py-10">
        No workflows found
      </div>
    );

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
        {workflows.map((workflow) => (
          <WorkflowCard key={workflow._id} workflow={workflow} />
        ))}
      </div>

      <div ref={ref} className="flex justify-center py-4">
        {isFetchingNextPage && (
          <div className="text-sm text-muted-foreground animate-pulse">
            Loading more...
          </div>
        )}
        {!hasNextPage && (
          <div className="text-xs text-muted-foreground">No more workflows</div>
        )}
      </div>
    </div>
  );
};

export default WorkflowsList;
