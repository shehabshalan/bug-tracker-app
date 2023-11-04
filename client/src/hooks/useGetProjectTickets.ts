import { endpoints } from "../api/endpoints";
import request from "../api/request";
import { useQuery } from "@tanstack/react-query";

export const useGetProjects = (page: number, id: string) => {
  return useQuery(["projects", page], async () => {
    const res = await request.get(
      `${endpoints.getProjectTickets}/${id}?page=${page}`
    );
    return res.data;
  });
};
