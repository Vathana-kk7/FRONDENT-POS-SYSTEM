import { privateApi } from "../../../services/api";

const CustomerService={
    async getAll(params={}){
        //លុប​ key ណាដែរមានvalue ទទេស្អាតចេញ
        const cleanParams=Object.fromEntries(
            Object.entries(params).filter(([_,v]) => v !== undefined && v !== null && v !== '')
        );
        const response= await privateApi.get("/customer",{params:cleanParams});
        return response;
    }
}
export default CustomerService;