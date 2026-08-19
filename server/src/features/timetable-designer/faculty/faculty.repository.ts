import { Faculty, FacultyModel } from "./faculty.model.js";

export const facultyRepository = {
  findById: async (designerId: string, id: string) => {
    return FacultyModel.findOne({
      designerId,
      id,
    }).lean();
  },

  findAll: async (designerId: string) => {
    return FacultyModel.find({
      designerId,
    })
      .sort({ createdAt: 1 })
      .lean();
  },

  findByEmail: async (designerId: string, email: string) => {
    return FacultyModel.findOne({
      designerId,
      email: email.toLowerCase(),
    }).lean();
  },

  create: async (data: Faculty) => {
    const faculty = await FacultyModel.create(data);

    return faculty.toObject();
  },

  updateById: async (id: string, data: Partial<Faculty>) => {
    return FacultyModel.findOneAndUpdate(
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

  deleteById: async (id: string) => {
    const result = await FacultyModel.deleteOne({
      id,
    });

    return result.deletedCount > 0;
  },
};
