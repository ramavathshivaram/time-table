import { Button } from "@/shared/ui/button";

import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/shared/ui/dialog";

import { useModalStore } from "../../store/modal.store";
import { useReactFlow } from "@xyflow/react";

interface Props {
  data: {
    id?: string;
  } | null;
}

const SectionModal = ({ data }: Props) => {
  const close = useModalStore((state) => state.close);
  const { getNode } = useReactFlow();

  const section = data?.id ? getNode(data.id) : undefined;

  return (
    <>
      <DialogHeader>
        <DialogTitle>{section?.data.label || "Section"}</DialogTitle>

        <DialogDescription>Configure academic year details.</DialogDescription>
      </DialogHeader>

      <DialogFooter>
        <Button variant="outline" onClick={close}>
          Cancel
        </Button>

        <Button onClick={close}>Save</Button>
      </DialogFooter>
    </>
  );
};

export default SectionModal;
