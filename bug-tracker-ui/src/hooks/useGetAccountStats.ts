import { endpoints } from "../api/endpoints";
import request from "../api/request";
import { useQuery } from "@tanstack/react-query";

type AccountStats = {
  ticketByType: number[];
  ticketByPriority: number[];
  ticketByStatus: number[];
  totalTickets: number;
};

const useGetAccountStats = () => {
  return useQuery(["stats"], async (): Promise<AccountStats> => {
    const res = await request.get(`${endpoints.accountStats}`);
    return res.data.result;
  });
};

export default useGetAccountStats;
