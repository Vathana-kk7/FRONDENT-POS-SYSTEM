import { privateApi } from "../../../services/api";

const PendingOrderService = {
  async getAll(params = {}) {
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(([, value]) => value !== undefined && value !== null && value !== "")
    );
    const response = await privateApi.get("/orders", { params: cleanParams });
    return response.data;
  },

  async create(data) {
    const response = await privateApi.post("/orders/pending", data);
    return response.data;
  },

  async updateSpecs(id, data) {
    const response = await privateApi.patch(`/orders/${id}/specs`, data);
    return response.data;
  },

  async addDeposit(id, data) {
    const response = await privateApi.post(`/orders/${id}/deposit`, data);
    return response.data;
  },

  async convertToSale(id) {
    const response = await privateApi.post(`/orders/${id}/convert-to-sale`);
    return response.data;
  },

  async cancel(id) {
    const response = await privateApi.post(`/orders/${id}/cancel`);
    return response.data;
  },
};

export default PendingOrderService;
