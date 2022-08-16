import { Request, Response } from "express";
import {
  createProject,
  deleteProject,
  getProject,
  getProjects,
  getTopFourProjects,
  updateProject,
} from "../service/project.service";

export const createProjectHandler = async (req: Request, res: Response) => {
  const user = res.locals.user;
  try {
    const project = await createProject(req.body, user);
    return res.status(201).json(project);
  } catch (e) {
    return res.status(500).json(e);
  }
};
export const getProjectsHandler = async (req: Request, res: Response) => {
  const user = res.locals.user;
  const { page = 1, size = 10 }: { page?: number; size?: number } = req.query;
  const limit = size;
  const skip = (page - 1) * size;
  try {
    const { projects, count } = await getProjects(user, limit, skip);
    if (!projects || projects.length === 0) {
      return res.status(404).json({ message: "No projects found" });
    }
    return res.status(200).json({
      status: "success",
      totalPages: Math.ceil(count / limit),
      page,
      result: projects,
    });
  } catch (e: any) {
    return res.status(500).json(e.message);
  }
};

export const getProjectHandler = async (req: Request, res: Response) => {
  const projectId = req.params.id;
  try {
    const project = await getProject(projectId);
    if (!project) {
      return res
        .status(404)
        .json({ message: `Project with ${projectId} was not found` });
    }
    return res.status(200).json(project);
  } catch (e: any) {
    return res.status(500).json(e.message);
  }
};

export const updateProjectHandler = async (req: Request, res: Response) => {
  const projectId = req.params.id;
  try {
    const updatedProject = await updateProject(projectId, req.body);
    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }
    return res.status(203).json(updatedProject);
  } catch (e: any) {
    return res.status(500).json(e.message);
  }
};

export const deleteProjectHandler = async (req: Request, res: Response) => {
  const projectId = req.params.id;
  try {
    const project = await deleteProject(projectId);
    if (!project) {
      return res
        .status(404)
        .json({ message: `Project with ${projectId} was not found` });
    }
    return res.status(200).json({ message: "Project deleted" });
  } catch (e: any) {
    return res.status(500).json(e.message);
  }
};

export const getTopFourProjectsWithMostMembersHandler = async (
  req: Request,
  res: Response
) => {
  const user = res.locals.user;
  try {
    const projects = await getTopFourProjects(user);
    if (!projects || projects.length === 0) {
      return res.status(404).json({ message: "No projects found" });
    }
    return res.status(200).json({
      status: "success",
      result: projects,
    });
  } catch (e: any) {
    return res.status(500).json(e.message);
  }
};
