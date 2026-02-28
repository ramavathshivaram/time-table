import { useGetUserDetails } from "../hooks/react-query/user.query.js";

const Home = () => {
  const { data } = useGetUserDetails();
  console.log(data);

  return <div className="min-h-screen bg-background p-6">Home</div>;
};

export default Home;
