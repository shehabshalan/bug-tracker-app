import React from "react";
import { Pagination, Paper } from "@mui/material";
import MaterialTable, { Column } from "@material-table/core";
import { MTableToolbar, MTableBodyRow } from "@material-table/core";
function ContentTable({
  columns,
  data,
  pageSize,
}: {
  columns: Array<Column<any>>;
  data: Array<any>;
  pageSize: number;
}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <div style={{ marginTop: "-1rem" }}>
      <MaterialTable
        data={data}
        columns={columns}
        options={{
          pageSize: pageSize,
          loadingType: "overlay",
          sorting: true,
          showTitle: false,
          search: true,
          searchFieldVariant: "outlined",
          searchFieldAlignment: "right",
        }}
        components={{
          Row: (props) => <MTableBodyRow {...props} />,
          Pagination: () => (
            <Pagination
              sx={{ display: "flex", justifyContent: "center", mt: 2, mb: 2 }}
              count={1}
              page={1}
              color="primary"
              shape="rounded"
            />
          ),
          Container: (props) => (
            <Paper
              sx={{
                backgroundColor: "transparent",
                boxShadow: "none",
                marginTop: "1rem",
              }}
              {...props}
            />
          ),
          Toolbar: (props) => (
            <MTableToolbar
              {...props}
              searchFieldStyle={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            />
          ),
        }}
      />
    </div>
  );
}

export default ContentTable;
