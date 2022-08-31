import { InputAdornment, TextField } from "@mui/material";
import React from "react";

export default function CustomTextArea({
  name,
  type,
  label,
  error,
  errorsMsg,
  value,
  handleChanges,
}) {
  return (
    <>
      <TextField
        required
        fullWidth
        variant="standard"
        id={name}
        onChange={handleChanges}
        label={label}
        name={name}
        type={type ? type : "text"}
        value={value}
        error={error}
        helperText={errorsMsg}
        multiline
        inputProps={{ style: { resize: "both" } }}
      />
    </>
  );
}
