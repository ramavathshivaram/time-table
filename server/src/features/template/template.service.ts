import { Types } from "mongoose";

import { templateRepository } from "./template.repository.js";
import type { Template } from "./template.model.js";

const isOwner = (template: Template, userId: string | Types.ObjectId) => {
  return template.userId.toString() === userId.toString();
};

export const templateService = {
  // -----------------------------------------
  // GET BY ID
  // -----------------------------------------

  async get(id: string, userId?: string) {
    const template = await templateRepository.get(id);

    if (!template) {
      throw new Error("Template not found");
    }

    // Private templates can only be accessed by owner
    if (
      template.visibility === "private" &&
      (!userId || !isOwner(template, userId))
    ) {
      throw new Error("You do not have access to this template");
    }

    return template;
  },

  // -----------------------------------------
  // GET ALL - USER TEMPLATES
  // -----------------------------------------

  async getAll(userId: string) {
    return templateRepository.getAll(userId);
  },

  // -----------------------------------------
  // GET PRIVATE
  // -----------------------------------------

  async getPrivate(userId: string) {
    return templateRepository.getPrivate(userId);
  },

  // -----------------------------------------
  // GET PUBLIC
  // -----------------------------------------

  async getPublic() {
    return templateRepository.getPublic();
  },

  async create(
    designerId: string,
    {
      userId,
      name = "util",
      description = "desc",
      visibility = "private",
    }: Partial<Template>,
  ) {
    //TODO: handle the resourse move to designer
    return templateRepository.create({
      userId,
      name,
      description,
      visibility,
    });
  },

  // -----------------------------------------
  // UPDATE
  // -----------------------------------------

  async update(id: string, userId: string, data: Partial<Template>) {
    const template = await templateRepository.get(id);

    if (!template) {
      throw new Error("Template not found");
    }

    if (!isOwner(template, userId)) {
      throw new Error("You are not allowed to update this template");
    }

    // Prevent changing ownership
    delete data.userId;

    const updatedTemplate = await templateRepository.update(id, data);

    if (!updatedTemplate) {
      throw new Error("Failed to update template");
    }

    return updatedTemplate;
  },

  // -----------------------------------------
  // DELETE
  // -----------------------------------------

  async remove(id: string, userId: string) {
    const template = await templateRepository.get(id);

    if (!template) {
      throw new Error("Template not found");
    }

    if (!isOwner(template, userId)) {
      throw new Error("You are not allowed to delete this template");
    }

    const deletedTemplate = await templateRepository.remove(id);

    if (!deletedTemplate) {
      throw new Error("Failed to delete template");
    }

    return deletedTemplate;
  },
};
