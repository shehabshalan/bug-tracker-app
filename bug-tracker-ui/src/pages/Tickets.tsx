import { Column } from "@material-table/core";
import { Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import ContentPage from "../components/ContentPage";
import ContentTab from "../components/ContentTab";
import ContentTable from "../components/ContentTable";
import axiosInstance from "../services/axiosInstance";
import { Endpoints } from "../services/endpoints";
import dateConverter from "../utils/dateConverter";

export interface ITicketProject {
  _id: string;
  projectSlug: string;
  projectName: string;
  projectDescription: string;
  projectMembers: any[];
  projectTickets: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ITicketAuthor {
  _id: string;
  name: string;
  email: string;
  role: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITicket {
  _id: string;
  ticketName: string;
  ticketDescription: string;
  ticketType: string;
  ticketStatus: string;
  ticketPriority: string;
  ticketEstimateTimeInHours: number;
  ticketProject: ITicketProject;
  ticketSlug: string;
  ticketAuthor: ITicketAuthor;
  ticketAssignedTo: string;
  createdAt: string;
}
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

function Tickets() {
  const getUserTickets = async () => {
    const res = await axiosInstance.get(`${Endpoints.getUserTickets}`);
    return res.data;
  };

  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);
  const [loading, setLoading] = React.useState(false);

  const {
    data,
    isLoading,
    error,
    status,
  }: { data: any; isLoading: any; error: any; status: any } = useQuery(
    ["user-tickets", page],
    getUserTickets,
    {
      keepPreviousData: true,
      onSuccess: (data) => {
        setTotalPages(data.totalPages);
        setLoading(false);
      },
    }
  );

  return (
    <ContentPage>
      <Typography variant="h6" gutterBottom>
        My Tickets
      </Typography>
      <ContentTab title={"Ticket"}>
        <ContentTable
          data={data}
          columns={projectColumns}
          error={error}
          isLoading={isLoading}
          setPage={setPage}
          totalPages={Number(totalPages)}
          page={page}
        />
      </ContentTab>
    </ContentPage>
  );
}

export default Tickets;
