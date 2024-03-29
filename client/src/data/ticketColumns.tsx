import { Column } from "@material-table/core";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import type { Ticket } from "../utils/types";
import { deleteTicket } from "../api/api";
import dateConverter from "../utils/dateConverter";

export const ticketColumns: Array<Column<Ticket>> = [
  {
    title: "Ticket",
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
    render: (rowData: Ticket) => {
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
          deleteTicket(rowData._id).then(() => alert("Ticket deleted"))
        }
      >
        Delete
      </Button>
    ),
  },
];
