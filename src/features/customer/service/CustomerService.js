import { privateApi } from "../../../services/api";

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
        const respones = await privateApi.post("/customer",data);
        return respones.data;
    },
    async update(id, data) {
        const response = await privateApi.put(`/customer/${id}`, data);
        return response.data;
    },
    async delete(id) {
        const response = await privateApi.delete(`/customer/${id}`);
        return response.data;
    },

}
export default CustomerService;