import { useUserStore } from "@/shared/user/user.store";

const TimetablesPage = () => {
  const user = useUserStore((s) => s.user);

  console.log(user);
  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      {/* <RecentWorkflows /> */}
      {/* // <WorkflowsPage /> */}
      TimetablesPage
    </div>
  );
};

export default TimetablesPage;
