import React from "react";
import AddNewMember from "./AddNewMember";
import ContentTab from "../../components/ContentTab";

function Settings() {
  return (
    <div>
      <ContentTab
        title={"Settings"}
        buttonText={"New Member"}
        buttonAction={"openUser"}
      >
        <div>Settings</div>
      </ContentTab>
      <AddNewMember />
    </div>
  );
}

export default Settings;
