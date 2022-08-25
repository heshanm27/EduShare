import {
  Chip,
  Grid,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import DoneIcon from "@mui/icons-material/Done";
import VerifiedIcon from "@mui/icons-material/Verified";
export default function CustomIntrestedArea({
  intrestedAreas,
  values,
  title,
  hint,
  errors,
  handleAddIntrestedArea,
}) {
  const theme = useTheme();
  return (
    <>
      <Grid item xs={12}>
        <Stack direction="column" justifyContent="end" alignItems="start">
          <Typography variant="body1" color={theme.palette.text.secondary}>
            {title}
            <Typography color={theme.palette.text.secondary} variant="caption">
              ( {hint} )
            </Typography>
          </Typography>
        </Stack>
        {intrestedAreas?.map((area) => (
          <Tooltip key={area.id} title={area?.discription} arrow>
            <Chip
              sx={{ margin: 1 }}
              color="info"
              key={area.id}
              variant={
                values.intrest?.includes(area.id) ? "filled" : "outlined"
              }
              icon={
                values.intrest?.includes(area.id) ? (
                  <VerifiedIcon />
                ) : (
                  <DoneIcon />
                )
              }
              label={area.name}
              onClick={() => handleAddIntrestedArea(area)}
            />
          </Tooltip>
        ))}
      </Grid>
      {errors.intrest && (
        <Grid item xs={12}>
          <Typography variant="subtitle1" color={theme.palette.error.main}>
            {errors.intrest}
          </Typography>
        </Grid>
      )}
    </>
  );
}
