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
    async create(data){
        const respones = await privateApi.post("/customer",data);
        return respones.data;
    },
    async update(id, data) {
        const response = await privateApi.put(`/customer/${id}`, data);
        return response.data;
    },


}
export default CustomerService;