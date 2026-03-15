import facultyRepository from "../repositorys/faculty.repository.js";

const getFacultiesGRPC = async (workflowId) => {
  return await facultyRepository.getFaculties(workflowId);
};

const getFacultyGRPC = async (workflowId, facultyId) => {
  return await facultyRepository.getFaculty(workflowId, facultyId);
};

const addFacultyGRPC = async (workflowId, faculty) => {
  await facultyRepository.addFaculty(workflowId, faculty);
};

const removeFacultyGRPC = async (workflowId, faculty) => {
  await facultyRepository.removeFaculty(workflowId, faculty);
};

const updateFacultyGRPC = async (workflowId, facultyId, facultyData) => {
  await facultyRepository.updateFaculty(workflowId, facultyId, facultyData);
};

export default {
  getFacultiesGRPC,
  getFacultyGRPC,
  addFacultyGRPC,
  removeFacultyGRPC,
  updateFacultyGRPC,
};
