import { privateApi } from "../../../services/api";
  
const BrandService = {
  async getAll(params = {}) {
    const response = await privateApi.get("/brand", {
      params,
    });

    return response.data;
  },
  //Get State
  async getStats() {
  try {
    const response = await privateApi.get("/brand/stats");

    return response.data;
  } catch (error) {
    console.log("Brand Stats Error:", error.response?.data);
    console.log("Full Error:", error);

    throw error;
  }
},
  async create(data) {
    const response = await privateApi.post("/brand", data);
    return response.data;
  },

  async delete(id) {
    const response = await privateApi.delete(`/brand/${id}`);
    return response.data;
  },

  // ✅ Update Brand
  async update(id, data) {
    const response = await privateApi.put(`/brand/${id}`, data);
    return response.data;
  },

  
};

export default BrandService;