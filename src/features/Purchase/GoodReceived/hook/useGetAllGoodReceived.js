import { useQuery } from "@tanstack/react-query";
import GoodReceivedService from "../service/GoodReceivedService";

export default function useGetAllGoodReceived() {
  return useQuery({
    queryKey: ["goods-received"],
    queryFn: GoodReceivedService.getAll,
  });
}
