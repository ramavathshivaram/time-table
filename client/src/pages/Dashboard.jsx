import { useGetUserDetails } from "../hooks/react-query/user.query.js";

const Dashboard = () => {
  const { data } = useGetUserDetails();
  console.log(data);

  return <div className="min-h-screen bg-background p-6">Dashboard</div>;
};

export default Dashboard;
