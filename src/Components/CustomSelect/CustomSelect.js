import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React from "react";

export default function CustomSelect(props) {
  const {
    name,
    label,
    error,
    errorsMsg,
    value,
    handleChanges,
    options,
    width,
  } = props;
  return (
    <>
      <FormControl
        sx={{ m: 1, minWidth: width ? width : 120 }}
        error={error ? true : false}
      >
        <InputLabel id="custom-select">{label}</InputLabel>
        <Select
          labelId="custom-select"
          id="custom-select-input"
          name={name}
          value={value}
          onChange={handleChanges}
          autoWidth
          label={label}
        >
          {options.map((option, index) => {
            return (
              <MenuItem key={index} value={option.value}>
                {option.label}
              </MenuItem>
            );
          })}
        </Select>
        {error && <FormHelperText>{errorsMsg}</FormHelperText>}
      </FormControl>
    </>
  );
}
