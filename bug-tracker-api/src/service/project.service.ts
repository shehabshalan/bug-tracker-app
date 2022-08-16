import { DocumentDefinition } from "mongoose";
import ProjectModel, { IProject } from "../models/project.model";
import { IUser } from "../models/user.model";

export const createProject = async (
  requestBody: DocumentDefinition<Omit<IProject, "createdAt" | "updatedAt">>,
  user: IUser
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

export const getProjects = async (user: IUser, limit: number, skip: number) => {
  try {
    let count = await ProjectModel.countDocuments({ projectSlug: user.slug });
    const projects = await ProjectModel.find({ projectSlug: user.slug })
      .populate("projectTickets")
      .populate("projectMembers", "-password -__v")
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);

    //   .populate("projectTickets");
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
  requestBody: DocumentDefinition<Omit<IProject, "createdAt" | "updatedAt">>
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
    return project;
  } catch (e: any) {
    throw new Error(e);
  }
};

export const getTopFourProjectsWithMostMembers = async (user: IUser) => {
  try {
    const projects = await ProjectModel.find({
      projectSlug: user.slug,
    })
      .sort({
        projectMembers: -1,
      })
      .limit(4);
    return projects;
  } catch (e: any) {
    throw new Error(e);
  }
};
