import { Types } from "mongoose";
import Activity, { IActivity } from "../models/activityModel";

const calculateTimeSpent = (startTime?: string, endTime?: string): number | undefined => {
  if (!startTime || !endTime) return undefined;

  const [startH, startM] = startTime.split(":").map(Number);
  const [endH, endM] = endTime.split(":").map(Number);

  let spent = (endH * 60 + endM) - (startH * 60 + startM);

  if (spent < 0) {
    spent += 24 * 60;
  }

  return spent;
};

export const getAllActivitiesService = async (userId: string) => {
  return await Activity.find({ user: userId }).sort({ createdAt: -1 });
};

export const getActivityByIdService = async (userId: string, id: string) => {
  return await Activity.findOne({ _id: id, user: userId });
};

export const createActivityService = async (
  data: Partial<IActivity>,
  userId: string
) => {
  const timeSpent = calculateTimeSpent(data.startTime as string, data.endTime as string);

  return await Activity.create({
    ...data,
    timeSpent,
    user: new Types.ObjectId(userId),
  });
};

export const updateActivityService = async (
  userId: string,
  id: string,
  data: Partial<IActivity>
) => {
  const timeSpent = calculateTimeSpent(data.startTime as string, data.endTime as string);

  return await Activity.findOneAndUpdate(
    { _id: id, user: userId },
    { ...data, ...(timeSpent !== undefined && { timeSpent }) },
    { new: true }
  );
};

export const deleteActivityService = async (userId: string, id: string) => {
  return await Activity.findOneAndDelete({ _id: id, user: userId });
};

export const searchActivityService = async (
  userId: string,
  keyword?: string
) => {
  const query: any = { user: userId };

  if (keyword) {
    query.$or = [
      { title: { $regex: keyword, $options: "i" } },
      { description: { $regex: keyword, $options: "i" } },
      { category: { $regex: keyword, $options: "i" } },
      { tags: { $regex: keyword, $options: "i" } },
    ];
  }

  return await Activity.find(query).sort({ createdAt: -1 });
};