import { privateApi } from "../../../services/api";

const BrandService = {
  async getAll(params = {}) {
    const response = await privateApi.get("/brand", {
      params,
    });

    return response.data;
  },

  async create(data) {
    const response = await privateApi.post("/brand", data);

    return response.data;
  },
    async delete(id){
        const res=await privateApi.delete(`/brand/${id}`);
        return res;
    }
};

export default BrandService;