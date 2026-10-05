import privateApi from "../../../../services/api/privateApi";


const PurchaseItemService = {

    getById: async (id) => {
        const response = await privateApi.get(`/purchaseItem/${id}`);
        return response.data;
    },

    create: async (data) => {
        const response = await privateApi.post('/purchaseItem', data);
        return response.data;
    },

    update: async (id, data) => {
        const response = await privateApi.put(
            `/purchaseItem/${id}`,
            data
        );

        return response.data;
    },

    delete: async (id) => {
        const response = await privateApi.delete(
            `/purchaseItem/${id}`
        );

        return response.data;
    },
};

export default PurchaseItemService;