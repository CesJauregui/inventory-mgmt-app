import { api } from "./api.ts";

export const getCategories = () => api.get("/categories");
export const createCategory = (data: any) => api.post("/categories", data);
export const updateCategory = (id: number, data: any) =>
  api.put(`/categories/${id}`, data);
export const deleteCategory = (id: number) => api.delete(`/categories/${id}`);
