import { Column } from "@material-table/core";
import { Typography } from "@mui/material";
import React from "react";
import ContentPage from "../components/ContentPage";
import ContentTab from "../components/ContentTab";
import ContentTable from "../components/ContentTable";

function Tickets() {
  interface IPerson {
    firstName: string;
    lastName: string;
    birthYear: number;
    availability: boolean;
  }

  const lookup = { true: "Available", false: "Unavailable" };

  const columns: Array<Column<IPerson>> = [
    { title: "First Name", field: "firstName" },
    { title: "Last Name", field: "lastName" },
    { title: "Birth Year", field: "birthYear", type: "numeric" },
    { title: "Availablity", field: "availability", lookup },
  ];

  const data: Array<IPerson> = [
    {
      firstName: "Tod",
      lastName: "Miles",
      birthYear: 1987,
      availability: true,
    },
    {
      firstName: "Jess",
      lastName: "Smith",
      birthYear: 2000,
      availability: false,
    },
    {
      firstName: "Jess",
      lastName: "Smith",
      birthYear: 2000,
      availability: false,
    },
    {
      firstName: "Jess",
      lastName: "Smith",
      birthYear: 2000,
      availability: false,
    },
    {
      firstName: "Jess",
      lastName: "Smith",
      birthYear: 2000,
      availability: false,
    },
    {
      firstName: "Jess",
      lastName: "Smith",
      birthYear: 2000,
      availability: false,
    },
    {
      firstName: "Jess",
      lastName: "Smith",
      birthYear: 2000,
      availability: false,
    },
    {
      firstName: "Jess",
      lastName: "Smith",
      birthYear: 2000,
      availability: false,
    },
    {
      firstName: "Jess",
      lastName: "Smith",
      birthYear: 2000,
      availability: false,
    },
  ];
  return (
    <ContentPage>
      <Typography variant="h6" gutterBottom>
        My Tickets
      </Typography>
      <ContentTab title={"Ticket"}>
        {/* <ContentTable data={data} columns={columns} pageSize={10} /> */}
      </ContentTab>
    </ContentPage>
  );
}

export default Tickets;
