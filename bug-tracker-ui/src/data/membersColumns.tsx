import { Column } from "@material-table/core";
import { IUser } from "../interfaces/IUser";
import dateConverter from "../utils/dateConverter";

export const membersColumns: Array<Column<IUser>> = [
  {
    title: "Member Name",
    field: "name",
  },
  { title: "Member Email", field: "email" },

  {
    title: "Created",
    field: "createdAt",
    render: (rowData: IUser) => {
      return dateConverter(rowData.createdAt);
    },
  },
];
