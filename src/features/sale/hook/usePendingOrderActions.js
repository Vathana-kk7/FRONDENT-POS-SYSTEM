import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getOrder,
  PENDING_ORDERS_QUERY_KEY,
  removeOrderCollectionItem,
  updateOrderCollection,
} from "./usePendingOrders";
import PendingOrderService from "../service/PendingOrderService";

export default function usePendingOrderActions() {
  const queryClient = useQueryClient();
  const invalidateOrders = () => queryClient.invalidateQueries({ queryKey: PENDING_ORDERS_QUERY_KEY });
  const updateCachedOrder = (orderId, update) => {
    queryClient.setQueriesData(
      { queryKey: PENDING_ORDERS_QUERY_KEY },
      (cachedOrders) => updateOrderCollection(cachedOrders, orderId, update)
    );
  };
  const removeCachedOrder = (orderId) => {
    queryClient.setQueriesData(
      { queryKey: PENDING_ORDERS_QUERY_KEY },
      (cachedOrders) => removeOrderCollectionItem(cachedOrders, orderId)
    );
  };

  const create = useMutation({
    mutationFn: PendingOrderService.create,
    onSuccess: invalidateOrders,
  });
  const deposit = useMutation({
    mutationFn: ({ id, data }) => PendingOrderService.addDeposit(id, data),
    onSuccess: async (response, variables) => {
      const order = getOrder(response);
      if (order) updateCachedOrder(variables.id, (cachedOrder) => ({ ...cachedOrder, ...order }));
      await invalidateOrders();
    },
  });
  const updateSpecs = useMutation({
    mutationFn: ({ id, data }) => PendingOrderService.updateSpecs(id, data),
    onSuccess: async (response, variables) => {
      const order = getOrder(response);
      if (order) updateCachedOrder(variables.id, (cachedOrder) => ({ ...cachedOrder, ...order }));
      await invalidateOrders();
    },
  });
  const convert = useMutation({
    mutationFn: PendingOrderService.convertToSale,
    onSuccess: async (_response, orderId) => {
      removeCachedOrder(orderId);
      await Promise.all([
        invalidateOrders(),
        queryClient.invalidateQueries({ queryKey: ["sales"] }),
        queryClient.invalidateQueries({ queryKey: ["product"] }),
        queryClient.invalidateQueries({ queryKey: ["product-state"] }),
      ]);
    },
  });
  const cancel = useMutation({
    mutationFn: PendingOrderService.cancel,
    onSuccess: async (_response, orderId) => {
      removeCachedOrder(orderId);
      await invalidateOrders();
    },
  });

  return {
    createOrder: create.mutateAsync,
    addDeposit: deposit.mutateAsync,
    updateSpecs: updateSpecs.mutateAsync,
    convertToSale: convert.mutateAsync,
    cancelOrder: cancel.mutateAsync,
    isCreating: create.isPending,
    isAddingDeposit: deposit.isPending,
    isUpdatingSpecs: updateSpecs.isPending,
    isConverting: convert.isPending,
    isCancelling: cancel.isPending,
  };
}
