import { useGetAllUserWorkflows } from "@/hooks/react-query/workflow.query.js";
import { useNavigate } from "react-router-dom";
import { Workflow, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Home = () => {
  const navigate = useNavigate();
  const { data } = useGetAllUserWorkflows();

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Your Workflows</h1>

        <p className="text-sm text-muted-foreground">
          {data?.length || 0} workflows
        </p>
      </div>

      {/* Workflow Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.map((workflow) => (
          <div
            key={workflow._id}
            className="group rounded-xl border bg-card p-5 shadow-sm 
            hover:shadow-md transition-all duration-200 cursor-pointer"
          >
            {/* Title */}
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-muted">
                <Workflow size={18} />
              </div>

              <h2 className="text-lg font-semibold line-clamp-1">
                {workflow.title}
              </h2>
            </div>

            {/* Dates */}
            <div className="text-sm text-muted-foreground space-y-1">
              <p>
                Created: {new Date(workflow.createdAt).toLocaleDateString()}
              </p>

              <p>
                Updated: {new Date(workflow.updatedAt).toLocaleDateString()}
              </p>
            </div>

            {/* Action */}
            <Button
              className="mt-5 w-full flex items-center justify-center gap-2"
              onClick={() => navigate(`/workflow/${workflow._id}`)}
            >
              Open Workflow
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
