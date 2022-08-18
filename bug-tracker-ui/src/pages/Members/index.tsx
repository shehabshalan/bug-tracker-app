import React from "react";
import AddNewMember from "./AddNewMember";
import ContentTab from "../../components/ContentTab";

function Members() {
  return (
    <div>
      <ContentTab
        title={"Members"}
        buttonText={"New Member"}
        buttonAction={"openUser"}
      >
        <div>Members</div>
      </ContentTab>
      <AddNewMember />
    </div>
  );
}

export default Members;
