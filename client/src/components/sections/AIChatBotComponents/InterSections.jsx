import React, { memo, useEffect } from "react";
import messageService from "@/services/workflow/message.service";

const InterSections = () => {
  //todo implementation od inter-section-observer

  useEffect(() => {
    messageService.getAllMessages(1, 10);
  }, []);
  return <div>Inter section</div>;
};

export default memo(InterSections);
