import React from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy, ArrowDownNarrowWide, Trash2 } from "lucide-react";

const WorkflowControls = () => {
  return (
    <Card className="flex items-center justify-between p-1">
      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          className="rounded-md hover:bg-gray-100 transition"
        >
          <Trash2 className="size-5" />
        </Button>
        <Button
          variant="outline"
          className="rounded-md hover:bg-gray-100 transition"
        >
          <Copy className="size-5" />
        </Button>
        <Button
          variant="outline"
          className="rounded-md hover:bg-gray-100 transition"
        >
          <ArrowDownNarrowWide className="size-5" />
        </Button>
      </div>
    </Card>
  );
};

export default WorkflowControls;
