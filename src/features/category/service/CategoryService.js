import { privateApi } from "../../../services/api";

const CategoryService = {
  // 1. Get All Categories
  async getAll(params = {}) {
    // លុប key ណាដែលមាន value ទទេស្អាតចេញ
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(([_, v]) => v !== '' && v !== null && v !== undefined)
    );
    const response = await privateApi.get("/category", { params: cleanParams });
    console.log("CATEGORY RESPONSE:", response.data);

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
  // 6. Import Category (កែសម្រួលបន្ថែម formData)
  async importCategory(file) {
    const formData = new FormData();
    formData.append("file", file);

    const response = await privateApi.post("/category/import", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
  async state() {
    try {
      // កែពី /categories/state ទៅ /category/state
      const response = await privateApi.get("/category/state");
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  async exportCategory(type = "excel", filters = {}) {
    const response = await privateApi.get(
        `/category/export/${type}`,
        {
            params: filters,
            responseType: "blob",
        }
    );
      return response;
  },

  // Alias so calling BrandService.export(...) also works
  export(type, filters) {
    return this.exportCategory(type, filters);
  }
};

export default CategoryService;