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

  const handleChange = (event: any) => {
    console.log(event.target.value);

    setValue(event.target.value as string);
  };
  return (
    <TextField
      value={value}
      onChange={handleChange}
      select
      label={label}
      fullWidth
    >
      {menuItems.map((item) => (
        <MenuItem key={item} value={item}>
          {item}
        </MenuItem>
      ))}
    </TextField>
  );
}

export default ContentSelect;
