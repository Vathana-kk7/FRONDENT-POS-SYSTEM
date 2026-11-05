import privateApi from '../../../../services/api/privateApi'

const PurchaseService = {

    // Get all purchases
    getAll: async (search={}) => {
        const response = await privateApi.get('/purchase',{
            params:search,
        });
        return response.data;
    },

    // Get purchase by ID
    getById: async (id) => {
        const response = await privateApi.get(`/purchase/${id}`);
        return response.data;
    },

    // Create purchase
    create: async (data) => {
        const response = await privateApi.post('/purchase', data);
        return response.data;
    },

    // Update purchase
    update: async (id, data) => {
        const response = await privateApi.put(`/purchase/${id}`, data);
        return response.data;
    },

    // Delete purchase
    delete: async (id) => {
        const response = await privateApi.delete(`/purchase/${id}`);
        return response.data;
    },

    // Receive stock
    receiveStock: async (id, data) => {
        const response = await privateApi.post(
            `/purchase/${id}/receive`,
            data
        );

        return response.data;
    },
    createPayment: async (id, data) => {
        const response = await privateApi.post(`/purchase/${id}/payments`, data, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
    },
    getstate:async ()=>{
        const response=await privateApi.get('/purchase/state');
        return response.data;
    }
};

export default PurchaseService;