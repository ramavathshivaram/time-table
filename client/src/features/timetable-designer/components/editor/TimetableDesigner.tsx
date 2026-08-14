import { ReactFlowProvider } from "@xyflow/react";

import { timetableData } from "../../constants/timetable-data";
import DesignerCanvas from "./DesignerCanvas";
import Modal from "../modals/Modal";
import { useDesignerStore } from "../../store/designer.store";

interface Props {
  timetableId: string;
}

const TimetableDesigner = ({ timetableId }: Props) => {
  const data = timetableData.blueprint;

  const init = useDesignerStore((s) => s.init);

  init({
    faculties: timetableData.faculties,
    subjects: timetableData.subjects,
    rooms: timetableData.rooms,
  });

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
