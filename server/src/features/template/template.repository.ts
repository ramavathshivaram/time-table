import { type Types } from "mongoose";

import { TemplateModel, type Template } from "./template.model.js";

export const templateRepository = {
  // -----------------------------------------
  // GET BY ID
  // -----------------------------------------

  async get(id: string) {
    return TemplateModel.findById(id).lean<Template | null>();
  },

  // -----------------------------------------
  // GET ALL - USER TEMPLATES
  // -----------------------------------------

  async getAll(userId: Types.ObjectId | string) {
    return TemplateModel.find({
      userId,
    })
      .sort({ createdAt: -1 })
      .lean<Template[]>();
  },

  // -----------------------------------------
  // GET PRIVATE
  // -----------------------------------------

  async getPrivate(userId: Types.ObjectId | string) {
    return TemplateModel.find({
      userId,
      visibility: "private",
    })
      .sort({ createdAt: -1 })
      .lean<Template[]>();
  },

  // -----------------------------------------
  // GET PUBLIC
  // -----------------------------------------

  async getPublic() {
    return TemplateModel.find({
      visibility: "public",
    })
      .sort({ createdAt: -1 })
      .lean<Template[]>();
  },

  async create({
    userId,
    name,
    description,
    visibility = "private",
  }: Partial<Template>) {
    return TemplateModel.create({
      userId,
      name,
      description,
      visibility,
    });
  },

  // -----------------------------------------
  // UPDATE
  // -----------------------------------------

  async update(id: string, data: Partial<Template>) {
    return TemplateModel.findByIdAndUpdate(
      id,
      {
        $set: data,
      },
      {
        new: true,
        runValidators: true,
      },
    ).lean<Template | null>();
  },

  // -----------------------------------------
  // DELETE
  // -----------------------------------------

  async remove(id: string) {
    return TemplateModel.findByIdAndDelete(id).lean<Template | null>();
  },
};
