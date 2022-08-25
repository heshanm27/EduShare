import { TextField } from "@mui/material";
import React from "react";

export default function CustomDatePicker({
  name,
  type,
  label,
  error,
  errorsMsg,
  value,
  autoComplete,
  handleChanges,
  helptext,
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
        autoComplete={autoComplete ? autoComplete : "off"}
        error={error}
        helperText={errorsMsg ? errorsMsg : helptext}
        inputProps={{
          min: new Date().toISOString().split("T")[0],
        }}
      />
    </>
  );
}
