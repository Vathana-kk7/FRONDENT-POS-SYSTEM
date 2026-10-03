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
            showToast("បង្កើត Customers ថ្មីបានជោគជ័យ!", "success");
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