import { useGetRecentWorkflows } from "@/hooks/react-query/workflow.query.js";
import React from "react";
import WorkflowCard from "./WorkflowCard";

const RecentWorkflows = () => {
  const { data = [], isLoading, isError } = useGetRecentWorkflows();

  if (isLoading) return <div className="text-sm">Loading...</div>;

  if (isError) return <div className="text-sm">Failed to load workflows</div>;

  if (!data.length) return null;

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Recent Workflows</h2>

        <p className="text-sm text-muted-foreground">{data.length} recent</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {data.map((workflow) => (
          <WorkflowCard key={workflow._id} workflow={workflow} />
        ))}
      </div>
    </section>
  );
};

export default RecentWorkflows;
