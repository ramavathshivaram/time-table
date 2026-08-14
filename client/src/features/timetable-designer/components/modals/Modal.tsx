import React from "react";

import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { useModalStore } from "../../store/modal.store";

const Modal = () => {
  const isOpen = useModalStore((s) => s.isOpen);
  const data = useModalStore((s) => s.data);
  const close = useModalStore((s) => s.close);

  return (
    <div>
      <Dialog
        open={isOpen}
        onOpenChange={(value) => {
          if (!value) {
            close();
          }
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Subject</DialogTitle>

            <DialogDescription>Update subject information.</DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose
              render={
                <Button type="button" variant="outline">
                  Close
                </Button>
              }
            />

            <Button>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Modal;
