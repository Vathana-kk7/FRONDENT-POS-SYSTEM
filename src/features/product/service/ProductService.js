import { privateApi } from "../../../services/api";

const ProductService = {
  async create(formData) {
    // formData ត្រូវបានបង្កើតរួចស្រេចពី ModelProduct.jsx
    const response = await privateApi.post("/product", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  },
  update: async (id, data) => {
    if (!id) { 
      throw new Error("Product ID is required"); 
    } 

    let formData = data;

    // If 'data' is a plain JS object instead of FormData, convert it
    if (!(data instanceof FormData)) {
      formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (data[key] !== undefined && data[key] !== null) {
          formData.append(key, data[key]);
        }
      });
    }

    // Laravel method spoofing 
    formData.append("_method", "PUT"); 

    const response = await privateApi.post(`/product/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }); 

    return response.data; 
  },
  async GetAllProduct({params={}}) {
    try {
      const cleanParams = Object.fromEntries(
      Object.entries(params).filter(([_, v]) => v !== '' && v !== null && v !== undefined)
    );
      const response = await privateApi.get("/product", { params: cleanParams });
      return response.data;
    } catch (error) {
      console.error("Failed to fetch products:", error.response?.data || error.message);
      throw error; // Re-throw if the calling function needs to handle it
    }
  },
  async delete(id) {
    const response = await privateApi.delete(`/product/${id}`);
    return response.data;
  },


  async importProduct(file){
    const formData=new FormData();
    formData.append("file",file);

    const response= await privateApi.post("/product/import", formData,{
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return response.data;
  },
  async state(){
    try {
      const repsonse=await privateApi.get("/product/state");
      return repsonse;
    } catch (error) {
      throw error;
    }
  }
};

export default ProductService;