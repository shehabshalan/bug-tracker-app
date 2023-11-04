import { endpoints } from "./endpoints";
import request from "./request";

export const getProjectTickets = async ({ queryKey }: { queryKey: any }) => {
  const [_key, id, page] = queryKey;
  const res = await request.get(
    `${endpoints.getProjectTickets}/${id}?page=${page}`
  );
  return res.data;
};

export const getAccountStats = async () => {
  const res = await request.get(`${endpoints.accountStats}`);
  return res.data;
};

export const getMembers = async () => {
  const res = await request.get(endpoints.getAllMembers);
  return res.data;
};

export const getUserTickets = async () => {
  const res = await request.get(`${endpoints.getUserTickets}`);
  return res.data;
};
export const getProjectMembers = async ({ queryKey }: { queryKey: any }) => {
  const [_key, id] = queryKey;
  const res = await request.get(`${endpoints.getProjectById}/${id}`);
  return res.data;
};
export const getProjects = async ({ queryKey }: { queryKey: any }) => {
  const [_key, page] = queryKey;
  const res = await request.get(`${endpoints.getProjects}?page=${page}`);
  return res.data;
};
export const createTicket = async (payload: any) => {
  const res = await request.post(endpoints.createTicket, payload);
  return res.data;
};
export const getTicketById = async ({ queryKey }: { queryKey: any }) => {
  const [_key, id] = queryKey;
  const res = await request.get(`${endpoints.getTicketById}/${id}`);
  return res.data;
};
export const createMember = async (payload: any) => {
  const res = await request.post(`${endpoints.createMember}`, payload);
  return res.data;
};
export const updateProject = async ({
  payload,
  id,
}: {
  payload: any;
  id: string | undefined;
}) => {
  const res = await request.put(
    `${endpoints.updateProjectById}/${id}`,
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
  const res = await request.put(`${endpoints.updateTicketById}/${id}`, payload);
  return res.data;
};

export const deleteTicket = async (id: string | undefined) => {
  const res = await request.delete(`${endpoints.deleteTicketById}/${id}`);
  return res.data;
};
export const deleteProject = async (id: string | undefined) => {
  const res = await request.delete(`${endpoints.deleteProjectById}/${id}`);
  return res.data;
};
