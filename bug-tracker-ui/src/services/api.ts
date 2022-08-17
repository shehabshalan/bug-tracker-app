import axiosInstance from "./axiosInstance";
import { Endpoints } from "./endpoints";

export const getProjectTickets = async ({ queryKey }: { queryKey: any }) => {
  const [_key, id, page] = queryKey;
  const res = await axiosInstance.get(
    `${Endpoints.getProjectTickets}/${id}?page=${page}`
  );
  return res.data;
};
export const getProjectMembers = async ({ queryKey }: { queryKey: any }) => {
  const [_key, id] = queryKey;
  const res = await axiosInstance.get(`${Endpoints.getProjectById}/${id}`);
  return res.data;
};

export const createTicket = async (payload: any) => {
  const res = await axiosInstance.post(Endpoints.createTicket, payload);
  return res.data;
};

export const createProject = async (payload: any) => {
  const res = await axiosInstance.post(Endpoints.createProject, payload);
  return res.data;

  // navigate(`/project/${res.data._id}`);
};
export const updateProject = async ({
  payload,
  id,
}: {
  payload: any;
  id: string | undefined;
}) => {
  const res = await axiosInstance.put(
    `${Endpoints.updateProjectById}/${id}`,
    payload
  );
  return res.data;

  // navigate(`/project/${res.data._id}`);
};
