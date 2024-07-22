import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import { useEffect, useState } from "react";

export default function TagSelect({
  value,
  setValue,
  options,
  label = "Select Tags",
}) {
  console.log(value);
  return (
    <Autocomplete
      sx={{
        width: "100%",
        // height: "100%",
        // "& .MuiFormControl-root": {
        //   height: "100%",
        //   "& .MuiInputBase-root": {
        //     height: "100%",
        //     justifyContent: "flex-start",
        //     alignItems: "flex-start",
        //   },
        // },

        "& .MuiInputBase-root": value[0] ? { p: 1 } : {},
      }}
      id="controlled-demo"
      value={value}
      options={options || []}
      multiple
      freeSolo
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            sx={{ textTransform: "uppercase" }}
            variant="outlined"
            label={option}
            {...getTagProps({ index })}
          />
        ))
      }
      renderInput={(params) => (
        <TextField
          {...params}
          variant="filled"
          label={value[0] ? "" : label}
          placeholder="Search tags..."
        />
      )}
    />
  );
}
