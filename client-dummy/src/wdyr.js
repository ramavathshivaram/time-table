import React from "react";
import whyDidYouRender from "@welldone-software/why-did-you-render";

const NODE_ENV = import.meta.env.VITE_NODE_ENV;

if (NODE_ENV === "development") {
  whyDidYouRender(React, {
    include: [/./], // track ALL components
    logOnDifferentValues: true,
  });
}
