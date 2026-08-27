import { privateApi } from "../../../services/api";

const BrandService = {
  async getAll(params = {}) {
    const response = await privateApi.get("/brand", { params });
    return response.data;
  },

  async getStats() {
    try {
      const response = await privateApi.get("/brand/stats");
      return response.data;
    } catch (error) {
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

  async update(id, data) {
    const response = await privateApi.put(`/brand/${id}`, data);
    return response.data;
  },

  async importBrands(file) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await privateApi.post('/brand/import', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  },

 async exportBrands(type = "excel", filters = {}) {
    const response = await privateApi.get(
        `/brand/export/${type}`,
        {
            params: filters,
            responseType: "blob",
        }
    );

    return response;
},

  // Alias so calling BrandService.export(...) also works
  export(type, filters) {
    return this.exportBrands(type, filters);
  }
};

export default BrandService;