import { privateApi } from "../../../services/api";

function toCustomerFormData(data) {
    if (data instanceof FormData) return data;

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
        if (key === "image") {
            if (value instanceof File) formData.append(key, value);
        } else if (value !== undefined && value !== null) {
            formData.append(key, String(value));
        }
    });
    return formData;
}

function hasCustomerImage(data) {
    if (data instanceof FormData) {
        const image = data.get("image");
        return typeof File !== "undefined" && image instanceof File;
    }
    return typeof File !== "undefined" && data.image instanceof File;
}

const CustomerService={
    async getAll(params={}){
        //លុប​ key ណាដែរមានvalue ទទេស្អាតចេញ
        const cleanParams=Object.fromEntries(
            Object.entries(params).filter(([_,v]) => v !== undefined && v !== null && v !== '')
        );
        const response= await privateApi.get("/customer",{params:cleanParams});
        return response;
    },
    async getStats(){
        const response = await privateApi.get("/customer/stats");
        return response.data.data;
    },
    async importCustomers(file){
        const formData = new FormData();
        formData.append("file", file);

        const response = await privateApi.post("/customer/import", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    },
    async exportCustomers(type, params = {}){
        return privateApi.get(`/customer/export/${type}`, {
            params,
            responseType: "blob",
        });
    },
    async create(data){
        const respones = hasCustomerImage(data)
            ? await privateApi.post("/customer",toCustomerFormData(data), {
                headers: { "Content-Type": "multipart/form-data" },
            })
            : await privateApi.post("/customer", data);
        return respones.data;
    },
    async update(id, data) {
        if (!hasCustomerImage(data)) {
            const response = await privateApi.put(`/customer/${id}`, data);
            return response.data;
        }

        const formData = toCustomerFormData(data);
        formData.append("_method", "PUT");
        const response = await privateApi.post(`/customer/${id}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
    },
    async delete(id) {
        const response = await privateApi.delete(`/customer/${id}`);
        return response.data;
    },

}
export default CustomerService;