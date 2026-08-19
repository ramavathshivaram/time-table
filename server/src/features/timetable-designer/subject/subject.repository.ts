import { Subject, SubjectModel } from "./subject.model.js";

export const subjectRepository = {
  // -----------------------------------------
  // GET BY ID
  // -----------------------------------------

  findById: async (designerId: string, id: string) => {
    return SubjectModel.findOne({
      designerId,
      id,
    }).lean();
  },

  // -----------------------------------------
  // GET ALL
  // -----------------------------------------

  findAll: async (designerId: string) => {
    return SubjectModel.find({
      designerId,
    })
      .sort({ createdAt: 1 })
      .lean();
  },

  // -----------------------------------------
  // FIND BY CODE
  // -----------------------------------------

  findByCode: async (designerId: string, code: string) => {
    return SubjectModel.findOne({
      designerId,
      code,
    }).lean();
  },

  // -----------------------------------------
  // CREATE
  // -----------------------------------------

  create: async (data: Subject) => {
    const subject = await SubjectModel.create(data);

    return subject.toObject();
  },

  // -----------------------------------------
  // UPDATE
  // -----------------------------------------

  updateById: async (id: string, data: Partial<Subject>) => {
    return SubjectModel.findOneAndUpdate(
      {
        id,
      },
      {
        $set: data,
      },
      {
        new: true,
        runValidators: true,
      },
    ).lean();
  },

  // -----------------------------------------
  // DELETE
  // -----------------------------------------

  deleteById: async (id: string) => {
    const result = await SubjectModel.deleteOne({
      id,
    });

    return result.deletedCount > 0;
  },
};
