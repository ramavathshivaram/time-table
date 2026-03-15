import facultyRepository from "../repositorys/faculty.repository.js";

const addFacultyGRPC = async (workflowId, faculty) => {
  await facultyRepository.addFaculty(workflowId, faculty);
};

const removeFacultyGRPC = async (workflowId, faculty) => {
  await facultyRepository.removeFaculty(workflowId, faculty);
};

const updateFacultyGRPC = async (workflowId, facultyId, facultyData) => {
  await facultyRepository.updateFaculty(workflowId, facultyId, facultyData);
};

export default { addFacultyGRPC, removeFacultyGRPC, updateFacultyGRPC };