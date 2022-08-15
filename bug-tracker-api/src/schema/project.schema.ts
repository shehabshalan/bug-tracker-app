import { object, string, TypeOf } from "zod";
export const createProjectSchema = object({
  body: object({
    projectName: string({
      required_error: "Project name is required",
    }),
    projectDescription: string({
      required_error: "Project description is required",
    }),
  }),
});

export const getProjectSchema = object({
  params: object({
    // project id must match the pattern of a mongo id (24 hex characters)
    id: string().regex(/^[0-9a-fA-F]{24}$/, {
      message: "Project id must be a valid MongoDB id",
    }),
  }),
});
export const updateProjectSchema = object({
  params: object({
    // project id must match the pattern of a mongo id (24 hex characters)
    id: string().regex(/^[0-9a-fA-F]{24}$/, {
      message: "Project id must be a valid MongoDB id",
    }),
  }),
});

export const deleteProjectSchema = object({
  params: object({
    // project id must match the pattern of a mongo id (24 hex characters)
    id: string().regex(/^[0-9a-fA-F]{24}$/, {
      message: "Project id must be a valid MongoDB id",
    }),
  }),
});

export type CreateProjectInput = TypeOf<typeof createProjectSchema>;
export type GetProjectInput = TypeOf<typeof getProjectSchema>;
export type UpdateProjectInput = TypeOf<typeof updateProjectSchema>;
export type DeleteProjectInput = TypeOf<typeof deleteProjectSchema>;
