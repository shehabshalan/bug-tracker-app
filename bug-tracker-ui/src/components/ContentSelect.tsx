import { MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import React from "react";

function ContentSelect({
  label,
  menuItems,
}: {
  label: string;
  menuItems: string[];
}) {
  const [value, setValue] = React.useState("");
  const [memberId, setMemberId] = React.useState("");

  const handleChange = (event: any) => {
    setValue(event.target.value as string);

    const findMemberId: any = menuItems.find(
      (member: any) => member.name === event.target.value
    );
    setMemberId(findMemberId._id as string);
  };

  return (
    <TextField
      value={value}
      onChange={handleChange}
      select
      label={label}
      fullWidth
    >
      {menuItems.map((member: any) => (
        <MenuItem key={member._id} value={member.name}>
          {member.name}
        </MenuItem>
      ))}
    </TextField>
  );
}

export default ContentSelect;
