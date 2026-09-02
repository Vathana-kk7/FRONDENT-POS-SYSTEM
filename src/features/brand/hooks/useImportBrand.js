import { useMutation, useQueryClient } from '@tanstack/react-query';
import BrandService from '../service/BrandService';
import { showToast } from '../../../utils/toast'; //  ត្រូវ Path

export const useImportBrand = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (file) => BrandService.importBrands(file),
        onSuccess: (data) => {
            queryClient.invalidateQueries(['brands']);
            queryClient.invalidateQueries(['brandStats']);
            // brand-stats

            // 🔔 បង្ហាញ Toast Slide ពីឆ្វេងទៅស្តាំ
            showToast(data?.message || 'ការបញ្ចូលទិន្នន័យ Brand បានជោគជ័យ!', 'success');
        },
        onError: (error) => {
            const errorMessage = error?.response?.data?.message || 'មានបញ្ហាក្នុងការ Import File!';
            showToast(errorMessage, 'error');
        },
    });
};