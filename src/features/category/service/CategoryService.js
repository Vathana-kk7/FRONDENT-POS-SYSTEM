import { privateApi } from "../../../services/api";

const CategoryService = {
  // 1. Get All Categories
  async getAll(params = {}) {
    const response = await privateApi.get("/category", { params });
    return response.data;
  },

  // 2. Get Single Category Details
  async getById(id) {
    const response = await privateApi.get(`/category/${id}`);
    return response.data;
  },

  // 3. Create New Category
  async create(data) {
    const response = await privateApi.post("/category", data);
    return response.data;
  },

  // 4. Update Category (Enterprise Update Method)
  async update(id, data) {
    // ប្រើ PUT ឬ PATCH ទៅតាម API Backend របស់អ្នក (ភាគច្រើន RESTful API ប្រើ PUT/PATCH)
    const response = await privateApi.put(`/category/${id}`, data);
    return response.data;
  },

  // 5. Delete Category
  async delete(id) {
    const response = await privateApi.delete(`/category/${id}`);
    return response.data;
  },
};

export default CategoryService;