import { useGetAllUserWorkflows } from "@/hooks/react-query/workflow.query.js";

const Home = () => {
  const { data } = useGetAllUserWorkflows();

  console.log(data)

  return <div className="">Home</div>;
};

export default Home;
