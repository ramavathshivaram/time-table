import { useMemo } from "react";
import type { NodeTypes } from "@xyflow/react";

import StartNode from "../components/nodes/StartNode.js";
import InstitutionNode from "../components/nodes/InstitutionNode.js";
import SectionNode from "../components/nodes/SectionNode.js";
import AcademicYearNode from "../components/nodes/AcademicYearNode.js";
import ProgramNode from "../components/nodes/ProgramNode.js";

export const useNodeTypes = (): NodeTypes => {
  return useMemo(
    () => ({
      start: StartNode,
      institution: InstitutionNode,
      section: SectionNode,
      program: ProgramNode,
      academicYear: AcademicYearNode,
    }),
    [],
  );
};
