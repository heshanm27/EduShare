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
  notrestricted,
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
        focused
        error={error}
        helperText={errorsMsg ? errorsMsg : helptext}
        inputProps={{
          min:
            notrestricted === true
              ? null
              : new Date().toISOString().split("T")[0],
        }}
      />
    </>
  );
}
