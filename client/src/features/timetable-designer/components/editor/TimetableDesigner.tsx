import { ReactFlowProvider } from "@xyflow/react";

import { timetableData } from "../../constants/timetable-data";
import DesignerCanvas from "./DesignerCanvas";
import Modal from "../modals/Modal";

interface Props {
  timetableId: string;
}

const TimetableDesigner = ({ timetableId }: Props) => {
  const data = timetableData.blueprint;

  return (
    <ReactFlowProvider>
      <div className="flex h-screen w-screen flex-col">
        <main className="relative flex-1">
          <DesignerCanvas
            timetableId={timetableId}
            initialNodes={data.nodes}
            initialEdges={data.edges}
          />
        </main>

        <Modal />
      </div>
    </ReactFlowProvider>
  );
};

export default TimetableDesigner;
