import React from "react";
import AddNewMember from "./AddNewMember";
import ContentTab from "../../components/ContentTab";
import ContentPage from "../../components/ContentPage";
import ContentTable from "../../components/ContentTable";
import { Typography } from "@mui/material";

function Members() {
  return (
    <ContentPage>
      <Typography variant="h6" gutterBottom>
        All Members
      </Typography>

      <ContentTab
        title={"Members"}
        buttonText={"New Member"}
        buttonAction={"openUser"}
      >
        {/* <ContentTable
          data={data}
          columns={projectColumns}
          error={error}
          isLoading={isLoading}
          setPage={setPage}
          totalPages={totalPages}
          page={page}
        /> */}
      </ContentTab>
      <AddNewMember />
    </ContentPage>
  );
}

export default Members;
