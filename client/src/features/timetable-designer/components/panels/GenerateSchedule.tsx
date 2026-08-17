import { memo } from "react";

import { Button } from "@/shared/ui/button";

import useValidateGraph from "../../hooks/useValidateGraph";
import { toast } from "sonner";

const GenerateSchedule = () => {
  const { validateGraph } = useValidateGraph();

  const handleGenerate = () => {
    const result = validateGraph();

    if (!result.valid) {
      toast.error(result.message);
      return;
    }

    toast.success("Generate schedule");
  };

  return (
    <Button
      onClick={handleGenerate}
      className="from-primary via-primary/60 to-primary bg-transparent bg-gradient-to-r [background-size:200%_auto] hover:bg-transparent hover:bg-[99%_center]"
    >
      Generate
    </Button>
  );
};

export default memo(GenerateSchedule);
