import { Button } from "@/components/ui/button";
import React, { memo } from "react";

const GenerateTimeTable = () => {
  return (
    <Button className="from-primary via-primary/60 to-primary bg-transparent bg-gradient-to-r [background-size:200%_auto] hover:bg-transparent hover:bg-[99%_center]">
      Generate
    </Button>
  );
};

export default memo(GenerateTimeTable);
