import { DocumentDefinition } from "mongoose";
import ProjectModel, { Project } from "../models/project.model";
import UserModel, { User } from "../models/user.model";
import TicketModel from "../models/ticket.model";

export const createProject = async (
  requestBody: DocumentDefinition<Omit<Project, "createdAt" | "updatedAt">>,
  user: User
) => {
  try {
    const newProject = await ProjectModel.create({
      ...requestBody,
      projectSlug: user.slug,
    });
    return newProject.toJSON();
  } catch (e: any) {
    throw new Error(e);
  }
};

export const getProjects = async (user: User, limit: number, skip: number) => {
  try {
    let count = await ProjectModel.countDocuments({ projectSlug: user.slug });
    const projects = await ProjectModel.find({ projectSlug: user.slug })
      .populate("projectTickets")
      .populate("projectMembers", "-password -__v")
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);
    return { projects, count };
  } catch (e: any) {
    throw new Error(e);
  }
};

export const getProject = async (id: string) => {
  try {
    const project = await ProjectModel.findById(id)
      .populate("projectTickets")
      .populate("projectMembers", "-password -__v");
    return project;
  } catch (e: any) {
    throw new Error(e);
  }
};

export const updateProject = async (
  id: string,
  requestBody: DocumentDefinition<Omit<Project, "createdAt" | "updatedAt">>
) => {
  try {
    const project = await ProjectModel.findByIdAndUpdate(id, requestBody, {
      new: true,
    }).lean();
    return project;
  } catch (e: any) {
    throw new Error(e);
  }
};

export const deleteProject = async (id: string) => {
  try {
    const project = await ProjectModel.findByIdAndDelete(id);
    await TicketModel.deleteMany({ ticketProject: id });
    return project;
  } catch (e: any) {
    throw new Error(e);
  }
};

export const getRecentProjects = async (user: User) => {
  try {
    //  get 4 recent projects

    const projects = await ProjectModel.find({ projectSlug: user.slug })
      .sort({ updatedAt: -1 })
      .limit(4);

    return projects;
  } catch (e: any) {
    throw new Error(e);
  }
};

export const getProjectMembers = async (projectId: string) => {
  const members = await UserModel.find({
    slug: projectId,
  }).sort({ createdAt: -1 });

  return members;
};
