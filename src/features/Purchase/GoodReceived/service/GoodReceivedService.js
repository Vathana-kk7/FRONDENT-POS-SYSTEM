import privateApi from "../../../../services/api/privateApi";

const GoodReceivedService = {
  async getAll() {
    const response = await privateApi.get("/goods-received");
    return response.data;
  },
  async getById(id) {
    const response = await privateApi.get(`/goods-received/${id}`);
    return response.data;
  },
  async receive({ purchaseId, items }) {
    const response = await privateApi.post("/goods-received", {
      purchase_id: purchaseId,
      items,
    });
    return response.data;
  },
};

export default GoodReceivedService;
