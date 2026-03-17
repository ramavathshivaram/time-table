import subjectRepository from "../repositorys/subject.repository.js";

const getSubjectGRPC = async (workflowId, subjectId) => {
  return await subjectRepository.getSubject(workflowId, subjectId);
};

const getSubjectsGRPC = async (workflowId) => {
  return await subjectRepository.getSubjects(workflowId);
};

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
  getSubjectGRPC,
  getSubjectsGRPC,
  addSubjectGRPC,
  removeSubjectGRPC,
  updateSubjectGRPC,
};
