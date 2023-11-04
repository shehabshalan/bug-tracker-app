import { endpoints } from "../api/endpoints";
import request from "../api/request";
import { useQuery } from "@tanstack/react-query";
import { Project } from "../utils/types";

export const useGetTopProjects = (page: number) => {
  return useQuery(
    ["topProjects", page],
    async (): Promise<Project[]> => {
      const res = await request.get(
        `${endpoints.getTopFourProjectsWithMostMembers}`
      );
      return res.data;
    },
    {
      keepPreviousData: true,
    }
  );
};
