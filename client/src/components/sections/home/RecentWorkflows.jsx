import { useGetRecentWorkflows } from "@/hooks/react-query/workflow.query.js";
import React from "react";
import RecentWorkflowCard from "./RecentWorkflowCard";

const RecentWorkflows = () => {
  const { data = [], isLoading, isError } = useGetRecentWorkflows();

  if (isLoading) {
    return (
      <section className="space-y-4">
        <div className="text-sm text-muted-foreground">
          Loading workflows...
        </div>
      </section>
    );
  }

  if (isError) {
    return <div className="text-sm text-red-500">Failed to load workflows</div>;
  }

  if (!data.length) {
    return (
      <div className="text-sm text-muted-foreground">No recent workflows</div>
    );
  }

  return (
    <section className="space-y-5 surface-muted p-3 rounded-xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Recent Workflows</h2>

        <span className="text-xs px-2 rounded-md bg-surface-muted/10 text-muted-foreground">
          {data.length} recent
        </span>
      </div>

      {/* Grid */}
      <div
        className="
          flex gap-2 overflow-x-auto pb-2 scrollbar
          snap-x snap-mandatory 
        "
      >
        {data.map((workflow) => (
          <div key={workflow._id} className="snap-start shrink-0">
            <RecentWorkflowCard workflow={workflow} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentWorkflows;
