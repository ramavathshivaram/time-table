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

const ProgramModal = ({ data }: Props) => {
  const close = useModalStore((state) => state.close);
  const { getNode } = useReactFlow();

  const program = data?.id ? getNode(data.id) : undefined;

  return (
    <>
      <DialogHeader>
        <DialogTitle>{program?.data.label || "Program"}</DialogTitle>

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

export default ProgramModal;
