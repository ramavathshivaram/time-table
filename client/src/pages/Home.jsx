import { useGetAllUserWorkflows } from "@/hooks/react-query/workflow.query.js";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { data } = useGetAllUserWorkflows();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Your Workflows</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.map((workflow) => (
          <div
            key={workflow._id}
            className="bg-white shadow-md rounded-2xl p-4 border hover:shadow-lg transition"
          >
            <h2 className="text-lg font-semibold text-gray-800">
              {workflow.title}
            </h2>

            <p className="text-sm text-gray-500 mt-2">
              Created: {new Date(workflow.createdAt).toLocaleString()}
            </p>

            <p className="text-sm text-gray-500">
              Updated: {new Date(workflow.updatedAt).toLocaleString()}
            </p>

            <button
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              onClick={() => navigate(`/workflow/${workflow._id}`)}
            >
              Open Workflow
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
