import { memo } from "react";

import { Dialog, DialogContent } from "@/shared/ui/dialog";

import { useModalStore } from "../../store/modal.store";

import Catalog from "../catalog/Catalog";
import InstitutionModal from "./InstitutionModal";
import ProgramModal from "./ProgramModal";
import AcademicYearModal from "./AcademicYearModal";
import SectionModal from "./SectionModal";

const Modal = () => {
  const isOpen = useModalStore((s) => s.isOpen);
  const data = useModalStore((s) => s.data);
  const type = useModalStore((s) => s.type);
  const close = useModalStore((s) => s.close);

  const modalContent = {
    institution: <InstitutionModal data={data} />,
    program: <ProgramModal data={data} />,
    "academic-year": <AcademicYearModal data={data} />,
    section: <SectionModal data={data} />,
    catalog: <Catalog />,
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
      <DialogContent className="sm:max-w-md">
        {type && modalContent[type]}
      </DialogContent>
    </Dialog>
  );
};

export default memo(Modal);
