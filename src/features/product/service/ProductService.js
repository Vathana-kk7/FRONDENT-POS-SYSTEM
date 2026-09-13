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
  async importProduct(file){
    const formData=new FormData();
    formData.append("file",file);

    const response= await privateApi.post("/product/import", formData,{
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return response.data;
  }
};

export default ProductService;