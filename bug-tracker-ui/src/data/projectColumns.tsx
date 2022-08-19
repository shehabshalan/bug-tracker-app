import { Column } from "@material-table/core";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { IProjects } from "../interfaces/IProject";
import { deleteProject } from "../services/api";
import dateConverter from "../utils/dateConverter";

export const projectColumns: Array<Column<IProjects>> = [
  {
    title: "Project Name",
    field: "projectName",
    render: (rowData) => (
      <Link to={`/project/${rowData._id}`} style={{ color: "black" }}>
        {rowData.projectName}
      </Link>
    ),
  },
  { title: "Description", field: "projectDescription" },
  {
    title: "Members",
    field: "projectTickets",
    render: (rowData: IProjects) => {
      return rowData.projectMembers.length;
    },
  },
  {
    title: "Tickets",
    field: "projectTickets",
    render: (rowData: IProjects) => {
      return rowData.projectTickets.length;
    },
  },
  {
    title: "Created",
    field: "createdAt",
    render: (rowData: IProjects) => {
      return dateConverter(rowData.createdAt);
    },
  },
  {
    title: "Actions",
    field: "_id",
    render: (rowData) => (
      <Button
        color="secondary"
        size="small"
        variant="contained"
        onClick={() =>
          deleteProject(rowData._id).then(() => alert("Project deleted"))
        }
      >
        Delete
      </Button>
    ),
  },
];
