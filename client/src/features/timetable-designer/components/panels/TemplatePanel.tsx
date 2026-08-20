import { memo } from "react";

import { Button } from "@/shared/ui/button";

import { useModalStore } from "../../store/modal.store";

const TemplatePanel = () => {
  const handleOpenModal = useModalStore((s) => s.open);

  return (
    <Button
      onClick={() => handleOpenModal("template")}
      className="from-primary via-primary/60 to-primary bg-transparent bg-gradient-to-r [background-size:200%_auto] hover:bg-transparent hover:bg-[99%_center]"
    >
      Save template
    </Button>
  );
};

export default memo(TemplatePanel);
