import { useGetWorkflows } from "@/hooks/react-query/workflow.query.js";
import React from "react";
import WorkflowCard from "./WorkflowCard";

const AllWorkflows = () => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useGetWorkflows();

  if (status === "loading") {
    return (
      <div className="text-sm text-muted-foreground">Loading workflows...</div>
    );
  }

  if (status === "error") {
    return (
      <div className="text-sm text-muted-foreground">
        Error fetching workflows
      </div>
    );
  }

  if (!data?.pages?.length) {
    return (
      <div className="text-center text-muted-foreground py-10">
        No workflows created yet
      </div>
    );
  }

  return (
    <section className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">All Workflows</h2>

        <p className="text-sm text-muted-foreground">{data.length} workflows</p>
      </div>

      {/* Workflow Grid */}
      <div className="grid grid-cols-3 gap-6">
        {data.pages.map((group, i) => (
          <React.Fragment key={i}>
            {group.map((workflow) => (
              <WorkflowCard key={workflow._id} workflow={workflow} />
            ))}
          </React.Fragment>
        ))}
        <div>
          <button
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetching}
          >
            {isFetchingNextPage
              ? "Loading more..."
              : hasNextPage
                ? "Load More"
                : "Nothing more to load"}
          </button>
        </div>
        <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
      </div>
    </section>
  );
};

export default AllWorkflows;
