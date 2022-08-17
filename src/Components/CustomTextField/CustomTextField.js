import {
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import React from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function CustomTextField({
  name,
  type,
  label,
  error,
  errorsMsg,
  value,
  autoComplete,
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
        autoComplete={autoComplete ? autoComplete : "off"}
        error={error}
        helperText={errorsMsg}
      />
    </>
  );
}
