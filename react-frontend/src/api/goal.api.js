import axiosInstance from "./axiosInstance";

const baseURL = import.meta.env.VITE_API_BASE_URL;

export const createGoal = async (data) =>
  await axiosInstance.post(baseURL + "goals", data);

export const getGoals = async () => await axiosInstance.get(baseURL + "goals");
export const updateGoal = async (id, data) =>
  await axiosInstance.put(baseURL + `goals/${id}`, data);
