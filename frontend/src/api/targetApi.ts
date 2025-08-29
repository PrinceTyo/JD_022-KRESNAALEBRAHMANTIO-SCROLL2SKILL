import axiosInstance from "./axiosInstance";

export interface TargetData {
  _id?: string;
  title: string;
  description: string;
  sourceType: "youtube" | "course" | "others" ;
  sourceLink?: string;
  progress?: number;
  targetDone: string;
  isPinned?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export const targetApi = {
  getAll: () => axiosInstance.get("targets"),
  getById: (_id: string) => axiosInstance.get(`/targets/${_id}`),
};