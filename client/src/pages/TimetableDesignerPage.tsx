import { useSearchParams } from "react-router-dom";

const TimetableDesignerPage = () => {
  const [searchParams] = useSearchParams();

  const timetableId = searchParams.get("timetableId");

  return <div></div>;
};

export default TimetableDesignerPage;
