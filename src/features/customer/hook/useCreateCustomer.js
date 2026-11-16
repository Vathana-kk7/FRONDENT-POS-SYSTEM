import { useMutation, useQueryClient } from "@tanstack/react-query";
import CustomerService from "../service/CustomerService";
import { showToast } from "../../../utils/toast";

export default function useCreateCustomer(){
    const queryClient= useQueryClient();
    const mutation =useMutation({
        mutationFn:CustomerService.create,
        onSuccess:async()=>{
            await queryClient.invalidateQueries({
                queryKey:["customers"],
                exact:false
            })
            await queryClient.invalidateQueries({
                queryKey:["customer-stats"],
            })
            showToast("បង្កើត Customers ថ្មីបានជោគជ័យ!", "success");
        },
        onError:(error)=>{
            const validationErrors = error?.response?.data?.errors;
            const firstValidationError = validationErrors
                ? Object.values(validationErrors).flat()[0]
                : null;
            const message =
                firstValidationError ||
                error?.response?.data?.message ||
                "បង្កើត Customer បរាជ័យ!";

            showToast(message, "error");
        }

    })
    return {
        createCustomer:mutation.mutate,
        createCustomerAsync:mutation.mutateAsync,
        isPending:mutation.isPending,
        isSuccess:mutation.isSuccess,
        isError:mutation.isError,
    }
}