import axiosInstance from "./axiosInstance";

export interface TargetData {
  _id?: string;
  title: string;
  description: string;
  sourceType: "youtube" | "course" | "others";
  sourceLink?: string;
  progress?: number;
  targetDone: string;
  isPinned?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export const targetApi = {
  getAll: () => axiosInstance.get("/targets"),
  getById: (_id: string) => axiosInstance.get(`/targets/${_id}`),
  create: (data: TargetData) => axiosInstance.post("/targets/create", data),
  update: (_id: string, data: Partial<TargetData>) =>
    axiosInstance.put(`/targets/${_id}/edit`, data),
  updatePinned: (_id: string, isPinned: boolean) =>
    axiosInstance.put(`/targets/${_id}/update-pinned`, { isPinned }),
  delete: (_id: string) => axiosInstance.delete(`/targets/${_id}/delete`),
  search: (keyword: string) =>
    axiosInstance.get(`/targets/search?keyword=${keyword}`),
};
