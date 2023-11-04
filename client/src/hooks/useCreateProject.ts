import { endpoints } from "../api/endpoints";
import request from "../api/request";
import { useMutation } from "@tanstack/react-query";
import { Project } from "../utils/types";

const useCreateProject = () => {
  return useMutation(async (payload: any): Promise<Project> => {
    const res = await request.post(endpoints.createProject, payload);
    return res.data;
  });
};

export default useCreateProject;
