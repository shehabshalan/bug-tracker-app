import axiosInstance from "./axiosInstance";
import { Endpoints } from "./endpoints";

export const getProjectTickets = async ({ queryKey }: { queryKey: any }) => {
  const [_key, id, page] = queryKey;
  const res = await axiosInstance.get(
    `${Endpoints.getProjectTickets}/${id}?page=${page}`
  );
  return res.data;
};
export const getTopProjects = async () => {
  const res = await axiosInstance.get(
    `${Endpoints.getTopFourProjectsWithMostMembers}`
  );
  return res.data;
};
export const getAccountStats = async () => {
  const res = await axiosInstance.get(`${Endpoints.accountStats}`);
  return res.data;
};

export const getMembers = async () => {
  const res = await axiosInstance.get(Endpoints.getAllMembers);
  return res.data;
};

export const getUserTickets = async () => {
  const res = await axiosInstance.get(`${Endpoints.getUserTickets}`);
  return res.data;
};
export const getProjectMembers = async ({ queryKey }: { queryKey: any }) => {
  const [_key, id] = queryKey;
  const res = await axiosInstance.get(`${Endpoints.getProjectById}/${id}`);
  return res.data;
};
export const getProjects = async ({ queryKey }: { queryKey: any }) => {
  const [_key, page] = queryKey;
  const res = await axiosInstance.get(`${Endpoints.getProjects}?page=${page}`);
  return res.data;
};
export const createTicket = async (payload: any) => {
  const res = await axiosInstance.post(Endpoints.createTicket, payload);
  return res.data;
};
export const getTicketById = async ({ queryKey }: { queryKey: any }) => {
  const [_key, id] = queryKey;
  const res = await axiosInstance.get(`${Endpoints.getTicketById}/${id}`);
  return res.data;
};
export const createProject = async (payload: any) => {
  const res = await axiosInstance.post(Endpoints.createProject, payload);
  return res.data;
};

export const createMember = async (payload: any) => {
  const res = await axiosInstance.post(`${Endpoints.createMember}`, payload);
  return res.data;
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
};
export const updateTicket = async ({
  payload,
  id,
}: {
  payload: any;
  id: string | undefined;
}) => {
  const res = await axiosInstance.put(
    `${Endpoints.updateTicketById}/${id}`,
    payload
  );
  return res.data;
};

export const deleteTicket = async (id: string | undefined) => {
  const res = await axiosInstance.delete(`${Endpoints.deleteTicketById}/${id}`);
  return res.data;
};
export const deleteProject = async (id: string | undefined) => {
  const res = await axiosInstance.delete(
    `${Endpoints.deleteProjectById}/${id}`
  );
  return res.data;
};
