import React from "react";
import { Box, CircularProgress, Pagination, Paper } from "@mui/material";
import MaterialTable, { Column } from "@material-table/core";
import { MTableToolbar, MTableBodyRow } from "@material-table/core";
import { useQuery } from "@tanstack/react-query";
import Loading from "./Loading";
function ContentTable({
  fetchData,
  cacheKey,
  columns,
}: {
  fetchData: (params: any) => Promise<any>;
  cacheKey: string;
  columns: Array<Column<any>>;
}) {
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);
  const [loading, setLoading] = React.useState(false);

  const {
    data,
    isLoading,
    error,
    status,
  }: { data: any; isLoading: any; error: any; status: any } = useQuery(
    [cacheKey, page],
    fetchData,
    {
      keepPreviousData: true,
    }
  );
  React.useEffect(() => {
    if (status === "success") {
      setTotalPages(data.totalPages);
      setLoading(false);
    }
  }, [status, data]);
  const handlePageChange = (event: any, value: number) => {
    setPage(value);
    setLoading(!loading);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <p>something wrong happend</p>;
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
