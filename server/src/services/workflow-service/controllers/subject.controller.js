import subjectRepository from "../repositorys/subject.repository.js";

const addSubjectGRPC = async (workflowId, subject) => {
  await subjectRepository.addSubject(workflowId, subject);
};

const removeSubjectGRPC = async (workflowId, subject) => {
  await subjectRepository.removeSubject(workflowId, subject);
};

const updateSubjectGRPC = async (workflowId, subjectId, subjectData) => {
  await subjectRepository.updateSubject(workflowId, subjectId, subjectData);
};

export default {
  addSubjectGRPC,
  removeSubjectGRPC,
  updateSubjectGRPC,
};
