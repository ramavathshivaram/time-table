import { ReactFlowProvider } from "@xyflow/react";

import { timetableData } from "../../constants/timetable-data";
import DesignerCanvas from "./DesignerCanvas";
import { useDesignerStore } from "../../store/designer.store";

interface Props {
  timetableId: string;
}

const TimetableDesigner = ({ timetableId }: Props) => {
  const init = useDesignerStore((s) => s.init);

  init(timetableData.blueprint);

  return (
    <ReactFlowProvider>
      <div className="flex h-screen w-screen flex-col">
        <main className="relative flex-1">
          <DesignerCanvas timetableId={timetableId} />
        </main>

        {/* <Modal /> */}
      </div>
    </ReactFlowProvider>
  );
};

export default TimetableDesigner;
