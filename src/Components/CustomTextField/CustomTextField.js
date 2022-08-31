import { InputAdornment, TextField } from "@mui/material";
import React from "react";

export default function CustomTextField({
  name,
  type,
  label,
  error,
  errorsMsg,
  value,
  autoComplete,
  handleChanges,
  startIcon,
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
        InputProps={
          startIcon && {
            startAdornment: (
              <InputAdornment position="start">{startIcon}</InputAdornment>
            ),
          }
        }
      />
    </>
  );
}
