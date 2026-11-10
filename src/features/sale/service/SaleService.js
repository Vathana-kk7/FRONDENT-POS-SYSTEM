import { privateApi } from "../../../services/api";

const SaleService = {
  async getAll(params = {}) {
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(([, value]) => value !== undefined && value !== null && value !== "")
    );
    const response = await privateApi.get("/sales", { params: cleanParams });
    return response.data;
  },

  async getById(id) {
    const response = await privateApi.get(`/sales/${id}`);
    return response.data;
  },

  async create(data) {
    const response = await privateApi.post("/sales", data);
    return response.data;
  },
};

export default SaleService;
