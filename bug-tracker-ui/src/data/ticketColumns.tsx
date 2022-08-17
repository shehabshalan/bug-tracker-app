import { Column } from "@material-table/core";
import { Link } from "react-router-dom";
import { ITicket } from "../types/ITickets";
import dateConverter from "../utils/dateConverter";

export const ticketColumns: Array<Column<ITicket>> = [
  {
    title: "Ticket Name",
    field: "ticketName",
    render: (rowData) => (
      <Link to={`/ticket/${rowData._id}`} style={{ color: "black" }}>
        {rowData.ticketName}
      </Link>
    ),
  },
  { title: "Description", field: "ticketDescription" },
  {
    title: "Author",
    field: "ticketAuthor.name",
  },
  {
    title: "Created",
    field: "createdAt",
    render: (rowData: ITicket) => {
      return dateConverter(rowData.createdAt);
    },
  },
];