import { Request, Response } from "express";
import { sendSuccess, sendError } from "../utils/response";
import {
  getAllActivitiesService,
  getActivityByIdService,
  createActivityService,
  updateActivityService,
  deleteActivityService,
  searchActivityService
} from "../services/activityService";

export const getAllActivities = async (req: Request, res: Response) => {
  try {
    const activities = await getAllActivitiesService(req.user!.id);
    return sendSuccess(res, activities, "Activities fetched successfully");
  } catch (error) {
    return sendError(res, error, 500);
  }
};

export const getActivityById = async (req: Request, res: Response) => {
  try {
    const activity = await getActivityByIdService(req.user!.id, req.params.id);
    if (!activity) {
      return sendError(res, { message: "Activity not found" }, 404);
    }
    return sendSuccess(res, activity, "Activity fetched successfully");
  } catch (error) {
    return sendError(res, error, 500);
  }
};

export const createActivity = async (req: Request, res: Response) => {
  try {
    if (!req.body.startTime || !req.body.endTime) {
      return sendError(res, { message: "Start time and end time are required" }, 400);
    }

    const { timeSpent, ...rest } = req.body;

    const newActivity = await createActivityService(rest, req.user!.id);
    return sendSuccess(res, newActivity, "Activity created successfully", 201);
  } catch (error) {
    return sendError(res, error, 500);
  }
};

export const updateActivity = async (req: Request, res: Response) => {
  try {
    const { timeSpent, ...rest } = req.body;

    const updated = await updateActivityService(req.user!.id, req.params.id, rest);
    if (!updated) {
      return sendError(res, { message: "Activity not found" }, 404);
    }
    return sendSuccess(res, updated, "Activity updated successfully");
  } catch (error) {
    return sendError(res, error, 500);
  }
};

export const deleteActivity = async (req: Request, res: Response) => {
  try {
    const deleted = await deleteActivityService(req.user!.id, req.params.id);
    if (!deleted) {
      return sendError(res, { message: "Activity not found" }, 404);
    }
    return sendSuccess(res, deleted, "Activity deleted successfully");
  } catch (error) {
    return sendError(res, error, 500);
  }
};

export const searchActivity = async (req: Request, res: Response) => {
  try {
    const { keyword } = req.query as { keyword?: string };
    const results = await searchActivityService(req.user!.id, keyword);
    return sendSuccess(res, results, "Search results fetched successfully");
  } catch (error) {
    return sendError(res, error, 500);
  }
};