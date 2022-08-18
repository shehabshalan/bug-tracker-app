import { Column } from "@material-table/core";
import { Link } from "react-router-dom";
import { ITicket } from "../interfaces/ITicket";
import dateConverter from "../utils/dateConverter";

export const projectColumns: Array<Column<ITicket>> = [
  {
    title: "Ticket Name",
    field: "ticketName",
    render: (rowData) => (
      <Link to={`/project/${rowData._id}`} style={{ color: "black" }}>
        {rowData.ticketName}
      </Link>
    ),
  },
  { title: "Project", field: "ticketProject.projectName" },
  { title: "Type", field: "ticketType" },
  { title: "Status", field: "ticketStatus" },
  { title: "Priority", field: "ticketPriority" },
  {
    title: "Created",
    field: "createdAt",
    render: (rowData: ITicket) => {
      return dateConverter(rowData.createdAt);
    },
  },
];
