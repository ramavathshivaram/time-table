import { useUserStore } from "@/shared/user/user.store";

const Home = () => {
  const user = useUserStore((s) => s.user);

  console.log(user);
  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      {/* <RecentWorkflows />
      <WorkflowsPage /> */}
      home
    </div>
  );
};

export default Home;
