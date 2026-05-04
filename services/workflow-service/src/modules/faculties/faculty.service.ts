import facultyRepository from "./faculty.repository.js";
import type { IFaculty } from "./faculty.model.js";

// GET ALL
const getFaculties = async (
  workflowId: IFaculty["workflowId"]
): Promise<IFaculty[]> => {
  const faculties = await facultyRepository.getFaculties(workflowId);

  if (!faculties.length) {
    throw new Error("No faculties found");
  }

  return faculties;
};

// GET ONE
const getFaculty = async (
  facultyId: IFaculty["id"]
): Promise<IFaculty> => {
  const faculty = await facultyRepository.getFaculty(
    facultyId
  );

  if (!faculty) {
    throw new Error("Faculty not found");
  }

  return faculty;
};

// ADD
const addFaculty = async (
  workflowId: IFaculty["workflowId"],
  faculty: Partial<IFaculty>
): Promise<IFaculty> => {
  if (!faculty?.id) {
    throw new Error("Faculty id is required");
  }

  return facultyRepository.addFaculty(workflowId, faculty);
};

// REMOVE
const removeFaculty = async (
  facultyId: IFaculty["id"]
) => {
  const result: any = await facultyRepository.removeFaculty(
    facultyId
  );

  if (!result?.deletedCount) {
    throw new Error("Faculty not found or already deleted");
  }

  return result;
};

// UPDATE
const updateFaculty = async (
  facultyId: IFaculty["id"],
  updateFields: Partial<IFaculty>
): Promise<IFaculty> => {
  const updated = await facultyRepository.updateFaculty(
    facultyId,
    updateFields
  );

  if (!updated) {
    throw new Error("Faculty not found");
  }

  return updated;
};

const facultyService = {
  getFaculties,
  getFaculty,
  addFaculty,
  removeFaculty,
  updateFaculty,
};

export default facultyService;