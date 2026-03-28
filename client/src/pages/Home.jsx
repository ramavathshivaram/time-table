import RecentWorkflows from "@/components/sections/home/RecentWorkflows";
import WorkflowsPage from "@/components/sections/home/WorkflowsPage";

const Home = () => {
  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      <RecentWorkflows />
      <WorkflowsPage />
    </div>
  );
};

export default Home;
