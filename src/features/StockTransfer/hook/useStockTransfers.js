import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { showToast } from "../../../utils/toast";
import StockTransferService from "../service/StockTransferService";

const transferQueryKeys = {
  all: ["stock-transfers"],
  requests: ["stock-transfer-requests"],
  stats: ["stock-transfer-stats"],
  warehouses: ["warehouses"],
};

function showMutationError(error, fallback) {
  const validationErrors = error?.response?.data?.errors;
  const firstError = validationErrors && Object.values(validationErrors)[0];
  showToast(
    (Array.isArray(firstError) ? firstError[0] : null)
      || error?.response?.data?.message
      || error?.message
      || fallback,
    "error",
  );
}

function useStockTransferRequests(params) {
  return useQuery({
    queryKey: [...transferQueryKeys.requests, params],
    queryFn: () => StockTransferService.getRequests(params),
  });
}

function useStockTransfers(params) {
  return useQuery({
    queryKey: [...transferQueryKeys.all, params],
    queryFn: () => StockTransferService.getTransfers(params),
  });
}

function useStockTransferStats() {
  return useQuery({
    queryKey: transferQueryKeys.stats,
    queryFn: StockTransferService.getStats,
  });
}

function useStockTransferMutations() {
  const queryClient = useQueryClient();
  const invalidate = async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: transferQueryKeys.all }),
      queryClient.invalidateQueries({ queryKey: transferQueryKeys.requests }),
      queryClient.invalidateQueries({ queryKey: transferQueryKeys.stats }),
    ]);
  };
  const mutationOptions = (fallback) => ({
    onSuccess: invalidate,
    onError: (error) => showMutationError(error, fallback),
  });

  return {
    createRequest: useMutation({
      mutationFn: StockTransferService.createRequest,
      ...mutationOptions("Failed to create transfer request."),
    }),
    updateRequest: useMutation({
      mutationFn: ({ id, data }) => StockTransferService.updateRequest(id, data),
      ...mutationOptions("Failed to update transfer request."),
    }),
    deleteRequest: useMutation({
      mutationFn: StockTransferService.deleteRequest,
      ...mutationOptions("Failed to delete transfer request."),
    }),
    createTransfer: useMutation({
      mutationFn: StockTransferService.createTransfer,
      ...mutationOptions("Failed to create stock transfer."),
    }),
    updateTransfer: useMutation({
      mutationFn: ({ id, data }) => StockTransferService.updateTransfer(id, data),
      ...mutationOptions("Failed to update stock transfer."),
    }),
    deleteTransfer: useMutation({
      mutationFn: StockTransferService.deleteTransfer,
      ...mutationOptions("Failed to delete stock transfer."),
    }),
    changeStatus: useMutation({
      mutationFn: ({ id, status }) => StockTransferService.changeStatus(id, status),
      ...mutationOptions("Failed to update transfer status."),
    }),
  };
}

export {
  useStockTransferMutations,
  useStockTransferRequests,
  useStockTransferStats,
  useStockTransfers,
};
