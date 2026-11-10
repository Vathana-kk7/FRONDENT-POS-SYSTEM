import { useQuery } from "@tanstack/react-query";
import PendingOrderService from "../service/PendingOrderService";

export const PENDING_ORDERS_QUERY_KEY = ["pending-orders"];

export function getOrderCollection(value) {
  let result = value;
  for (let depth = 0; depth < 4 && result && !Array.isArray(result); depth += 1) {
    if (Array.isArray(result)) return result;
    if (result.data === undefined) return [];
    result = result.data;
  }
  return Array.isArray(result) ? result : [];
}

export function getOrder(value) {
  let result = value;
  for (let depth = 0; depth < 4 && result && !Array.isArray(result); depth += 1) {
    if (result.id !== undefined) return result;
    result = result.data;
  }
  return null;
}

export function updateOrderCollection(value, orderId, update) {
  if (Array.isArray(value)) {
    return value.map((order) => (
      String(order?.id) === String(orderId) ? update(order) : order
    ));
  }
  if (!value || typeof value !== "object") return value;
  if (Array.isArray(value.data)) {
    return { ...value, data: updateOrderCollection(value.data, orderId, update) };
  }
  if (value.data && typeof value.data === "object") {
    return { ...value, data: updateOrderCollection(value.data, orderId, update) };
  }
  return value;
}

export function removeOrderCollectionItem(value, orderId) {
  if (Array.isArray(value)) {
    return value.filter((order) => String(order?.id) !== String(orderId));
  }
  if (!value || typeof value !== "object") return value;
  if (Array.isArray(value.data)) {
    const hasOrder = value.data.some((order) => String(order?.id) === String(orderId));
    return {
      ...value,
      data: removeOrderCollectionItem(value.data, orderId),
      ...(hasOrder ? { total: Math.max(0, Number(value.total ?? 0) - 1) } : {}),
    };
  }
  if (value.data && typeof value.data === "object") {
    return { ...value, data: removeOrderCollectionItem(value.data, orderId) };
  }
  return value;
}

export default function usePendingOrders(search = "") {
  const query = useQuery({
    queryKey: [...PENDING_ORDERS_QUERY_KEY, search],
    queryFn: () => PendingOrderService.getAll({ status: "pending", search }),
  });

  return {
    orders: getOrderCollection(query.data),
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
