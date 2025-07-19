import { api } from "./api";

export const getBrands = () => api.get("/brands");
export const createBrand = (data: any) => api.post("/brands", data);
export const updateBrand = (id: number, data: any) =>
  api.put(`/brands/${id}`, data);
export const deleteBrand = (id: number) => api.delete(`/brands/${id}`);
