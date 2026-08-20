import type { Request, Response } from "express";

import { templateService } from "./template.service.js";

export const templateController = {
  // -----------------------------------------
  // GET BY ID
  // -----------------------------------------

  async get(req: Request, res: Response) {
    const { id } = req.params;

    const template = await templateService.get(id, req.userId);

    res.status(200).json({
      success: true,
      data: template,
    });
  },

  // -----------------------------------------
  // GET ALL - USER TEMPLATES
  // -----------------------------------------

  async getAll(req: Request, res: Response) {
    const templates = await templateService.getAll(req.userId);

    res.status(200).json({
      success: true,
      data: templates,
    });
  },

  // -----------------------------------------
  // GET PRIVATE
  // -----------------------------------------

  async getPrivate(req: Request, res: Response) {
    const templates = await templateService.getPrivate(req.userId);

    res.status(200).json({
      success: true,
      data: templates,
    });
  },

  // -----------------------------------------
  // GET PUBLIC
  // -----------------------------------------

  async getPublic(req: Request, res: Response) {
    const templates = await templateService.getPublic();

    res.status(200).json({
      success: true,
      data: templates,
    });
  },
};
