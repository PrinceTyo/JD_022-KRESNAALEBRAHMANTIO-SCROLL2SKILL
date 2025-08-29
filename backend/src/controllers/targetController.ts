import { Request, Response } from "express";
import { sendSuccess, sendError } from "../utils/response";
import {
  getAllTargetsService,
  getTargetByIdService,
  createTargetService,
  updateTargetService,
  deleteTargetService,
  searchTargetService,
  updatePinnedService,
} from "../services/targetService";

export const getAllTargets = async (req: Request, res: Response) => {
    try {
        const targets = await getAllTargetsService(req.user!.id);
        return sendSuccess(res, targets, "Targets fetched successfully");
    } catch (error) {
        return sendError(res, error, 500);
    }
};

export const getTargetById = async (req: Request, res: Response) => {
    try {
        const target = await getTargetByIdService(req.user!.id, req.params.id);
        if (!target) {
            return sendError(res, { messasge: "Target not found" }, 404);
        }
        return sendSuccess(res, target, "Target fetched successfully");
    } catch (error) {
        return sendError(res, error, 500);
    }
};

export const createTarget = async (req: Request, res: Response) => {
    try {
        const newTarget = await createTargetService(req.body, req.user!.id);
        return sendSuccess(res, newTarget, "Target created successfully", 201);
    } catch (error) {
        return sendError(res, error, 500);
    }
};

export const updateTarget = async (req: Request, res: Response) => {
    try {
        const updated = await updateTargetService(
            req.user!.id,
            req.params.id,
            req.body
        );
        if (!updated) {
            return sendError(res, { message: "Target not found" }, 404);
        }
        return sendSuccess(res, updated, "Target updated successfully");
    } catch (error) {
        return sendError(res, error, 500);
    }
};

export const updatePinned = async (req: Request, res: Response) => {
    try {
        const { isPinned } = req.body;

        const updated = await updatePinnedService(
            req.user!.id,
            req.params.id,
            isPinned
        );

        if (!updated) {
            return sendError(res, { message: "Target not found" }, 404);
        }

        return sendSuccess(res, updated, "Target pinned status updated successfully");
    } catch (error) {
        return sendError(res, error, 500);
    }
};

export const deleteTarget = async (req: Request, res: Response) => {
    try {
        const deleted = await deleteTargetService(req.user!.id, req.params.id);
        if (!deleted) {
            return sendError(res, { message: "Target not found" }, 404);
        }
        return sendSuccess(res, deleted, "Target deleted successfully");
    } catch (error) {
        return sendError(res, error, 500);
    }
};
export const searchTarget = async (req: Request, res: Response) => {
    try {
        const { keyword } = req.query as { keyword?: string };
        const results = await searchTargetService(req.user!.id, keyword);
        return sendSuccess(res, results, "Search results fetched successfully");
    } catch (error) {
        return sendError(res, error, 500);
    }
};