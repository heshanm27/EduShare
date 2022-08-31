import { InputAdornment, TextField } from "@mui/material";
import React from "react";

export default function CustomFeeTextField({
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
        min="0"
        max="1000000"
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
