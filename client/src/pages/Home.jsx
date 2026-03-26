import PinnedWorkflows from "@/components/sections/home/PinnedWorkflows";
import RecentWorkflows from "@/components/sections/home/RecentWorkflows";
import AllWorkflows from "@/components/sections/home/AllWorkflows";

const Home = () => {
  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      <PinnedWorkflows />
      <RecentWorkflows />
      <AllWorkflows />
    </div>
  );
};

export default Home;
