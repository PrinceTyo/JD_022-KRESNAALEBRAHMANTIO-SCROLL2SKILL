import { Types } from "mongoose";
import Target, { ITarget } from "../models/targetModel";

export const getAllTargetsService = async (userId: string) => {
  return await Target.find({ user: userId }).sort({ createdAt: -1 });
};

export const getTargetByIdService = async (userId: string, id: string) => {
  return await Target.findOne({ _id: id, user: userId });
};

export const createTargetService = async (data: Partial<ITarget>, userId: string) => {
  return await Target.create({
    ...data,
    user: new Types.ObjectId(userId),
  });
};

export const updateTargetService = async (
  userId: string,
  id: string,
  data: Partial<ITarget>
) => {
  return await Target.findOneAndUpdate(
    { _id: id, user: userId },
    data,
    { new: true }
  );
};


export const deleteTargetService = async (userId: string, id: string) => {
  return await Target.findOneAndDelete({ _id: id, user: userId });
};

export const searchTargetService = async (userId: string, keyword?: string) => {
  const query: any = { user: userId };

  if (keyword) {
    query.$or = [
      { title: { $regex: keyword, $options: "i" } },
      { description: { $regex: keyword, $options: "i" } },
      { targetDone: { $regex: keyword, $options: "i" } },
    ];
  }

  return await Target.find(query).sort({ createdAt: -1 });
};

export const updatePinnedService = async (
  userId: string,
  id: string,
  isPinned: boolean
) => {
  return await Target.findOneAndUpdate(
    { _id: id, user: userId },
    { isPinned },
    { new: true }
  );
};