import { Column } from "@material-table/core";
import type { User } from "../utils/types";
import dateConverter from "../utils/dateConverter";

export const membersColumns: Array<Column<User>> = [
  {
    title: "Member Name",
    field: "name",
  },
  { title: "Member Email", field: "email" },

  {
    title: "Created",
    field: "createdAt",
    render: (rowData: User) => {
      return dateConverter(rowData.createdAt);
    },
  },
];
