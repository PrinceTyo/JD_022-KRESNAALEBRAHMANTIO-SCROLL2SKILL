import axiosInstance from "./axiosInstance";

export interface ActivityData {
  _id?: string;
  type: "productive" | "distraction";
  category: string;
  title: string;
  description: string;
  tags?: string[];
  startTime: string;
  endTime: string;
  timeSpent?: number;
  createdAt?: string;
  updatedAt?: string;
}

export const activityApi = {
  getAll: () => axiosInstance.get("/activities"),
  getById: (_id: string) => axiosInstance.get(`/activities/${_id}`),
  create: (data: ActivityData) =>
    axiosInstance.post("/activities/create", data),
  update: (_id: string, data: Partial<ActivityData>) =>
    axiosInstance.put(`/activities/${_id}/edit`, data),
  delete: (_id: string) => axiosInstance.delete(`/activities/${_id}/delete`),
  search: (keyword: string) =>
    axiosInstance.get(`/activities/search?keyword=${keyword}`),
};