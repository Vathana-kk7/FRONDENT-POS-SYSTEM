import { privateApi } from "../../../services/api";

const SupplierService = {
  async getAll(params = {}) {
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(([, value]) => value !== undefined && value !== null && value !== "")
    );
    return privateApi.get("/supplier", { params: cleanParams });
  },
  async getStats() {
    const response = await privateApi.get("/supplier/stats");
    return response.data.data;
  },
  async create(data) {
    const response = await privateApi.post("/supplier", data);
    return response.data;
  },
  async update({ id, data }) {
    const response = await privateApi.put(`/supplier/${id}`, data);
    return response.data;
  },
  async delete(id) {
    const response = await privateApi.delete(`/supplier/${id}`);
    return response.data;
  },
  async import(file) {
    const formData = new FormData();
    formData.append("file", file);
    const response = await privateApi.post("/supplier/import", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },
  async export(type, params = {}) {
    return privateApi.get(`/supplier/export/${type}`, {
      params,
      responseType: "blob",
    });
  },
};

export default SupplierService;
