import React from "react";
import { Box, Pagination, Paper } from "@mui/material";
import MaterialTable, { Column } from "@material-table/core";
import { MTableToolbar, MTableBodyRow } from "@material-table/core";
import Loading from "./Loading";
function ContentTable({
  data,
  columns,
  error,
  isLoading,
  setPage,
  totalPages,
  page,
}: {
  data: any;
  columns: Array<Column<any>>;
  error: any;
  isLoading: boolean;
  setPage: (page: number) => void;
  totalPages?: number;
  page?: number;
}) {
  const handlePageChange = (event: any, value: number) => {
    setPage(value);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <p>Something wrong happened</p>;
  }
  return (
    <div style={{ marginTop: "-1rem" }}>
      <MaterialTable
        data={data.result}
        columns={columns}
        options={{
          pageSize: data.result.length,
          loadingType: "overlay",
          sorting: true,
          showTitle: false,
          search: true,
          searchFieldVariant: "outlined",
          searchFieldAlignment: "right",
        }}
        components={{
          Row: (props) => <MTableBodyRow id={data.result._id} {...props} />,
          Pagination: () => (
            <Pagination
              sx={{ display: "flex", justifyContent: "center", mt: 2, mb: 2 }}
              count={totalPages}
              page={page}
              onChange={handlePageChange}
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
