import privateApi from "../../../services/api/privateApi";

const transferData = (response) => response.data?.data;

const StockTransferService = {
  async getRequests(params = {}) {
    const response = await privateApi.get("/stock-transfer-requests", { params });
    return transferData(response);
  },

  async getTransfers(params = {}) {
    const response = await privateApi.get("/stock-transfers", { params });
    return transferData(response);
  },

  async getStats() {
    const response = await privateApi.get("/stock-transfers/summary");
    return transferData(response);
  },

  async getById(id) {
    const response = await privateApi.get(`/stock-transfers/${id}`);
    return transferData(response);
  },

  async getWarehouses() {
    const response = await privateApi.get("/warehouses");
    return transferData(response);
  },

  async createWarehouse(data) {
    const response = await privateApi.post("/warehouses", data);
    return transferData(response);
  },

  async getWarehouseStocks(warehouseId) {
    const response = await privateApi.get(`/warehouses/${warehouseId}/stocks`);
    return transferData(response);
  },

  async getProducts() {
    const response = await privateApi.get("/product", {
      params: { per_page: 1000 },
    });
    const data = transferData(response);
    return Array.isArray(data) ? data : data?.data ?? [];
  },

  async createRequest(data) {
    const response = await privateApi.post("/stock-transfer-requests", data);
    return transferData(response);
  },

  async updateRequest(id, data) {
    const response = await privateApi.put(`/stock-transfer-requests/${id}`, data);
    return transferData(response);
  },

  async deleteRequest(id) {
    const response = await privateApi.delete(`/stock-transfer-requests/${id}`);
    return transferData(response);
  },

  async createTransfer(data) {
    const response = await privateApi.post("/stock-transfers", data);
    return transferData(response);
  },

  async updateTransfer(id, data) {
    const response = await privateApi.put(`/stock-transfers/${id}`, data);
    return transferData(response);
  },

  async deleteTransfer(id) {
    const response = await privateApi.delete(`/stock-transfers/${id}`);
    return transferData(response);
  },

  async changeStatus(id, status) {
    const response = await privateApi.patch(`/stock-transfers/${id}/status`, { status });
    return transferData(response);
  },
};

export default StockTransferService;
