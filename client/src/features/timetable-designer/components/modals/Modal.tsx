import { memo } from "react";

import { Dialog, DialogContent } from "@/shared/ui/dialog";

import { useModalStore } from "../../store/modal.store";

import InstitutionModal from "./InstitutionModal";
import ProgramModal from "./ProgramModal";
import AcademicYearModal from "./AcademicYearModal";
import SectionModal from "./SectionModal";
import Faculties from "./faculties/Faculties";
import Subjects from "./subjects/Subjects";
import Rooms from "./rooms/Rooms";

const Modal = () => {
  const isOpen = useModalStore((s) => s.isOpen);
  const data = useModalStore((s) => s.data);
  const type = useModalStore((s) => s.type);
  const close = useModalStore((s) => s.close);

  const modalContent: Record<string, React.ReactNode> = {
    institution: <InstitutionModal data={data} />,
    program: <ProgramModal data={data} />,
    "academic-year": <AcademicYearModal data={data} />,
    section: <SectionModal data={data} />,
    faculties: <Faculties />,
    subjects: <Subjects />,
    rooms: <Rooms />,
    default: null,
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          close();
        }
      }}
    >
      <DialogContent className="w-[95vw] max-w-4xl max-h-[85vh] max-h-4xl overflow-hidden">
        <div className="flex max-h-[85vh] flex-col pt-6">
          {type && modalContent[type]}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default memo(Modal);
