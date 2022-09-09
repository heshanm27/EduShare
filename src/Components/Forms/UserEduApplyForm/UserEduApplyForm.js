import { Typography } from "@material-ui/core";
import {
  Box,
  Container,
  CssBaseline,
  Grid,
  Paper,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import CustomTextField from "../../CustomTextField/CustomTextField";
import { useLocation } from "react-router-dom";
import CustomDatePicker from "../../CustomDatePicker/CustomDatePicker";
import { LoadingButton } from "@mui/lab";
import CustomSelect from "../../CustomSelect/CustomSelect";
import { EducationLevel } from "../../../Constants/Constants";
import CustomTextArea from "../../CustomTextArea/CustomTextArea";
const initialValues = {
  firstName: "",
  lastName: "",
  dateOfbirth: "",
  educationLevel: "",
  contactNo: "",
  email: "",
  aboutMe: "",
};

export default function UserEduApplyForm() {
  const theme = useTheme();
  const screenSize = useMediaQuery(theme.breakpoints.down("md"));
  const [errors, setErrors] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState(initialValues);
  const [passedData, setPassedData] = useState(null);
  const location = useLocation();
  /**
   *@description this function is used to handle the change of the input fields
   * @param Event  default event object
   */
  const handleChanges = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  useEffect(() => {
    if (location.state) {
      setPassedData(location.state);
      console.log(location.state);
    }
  }, [location.state]);
  return (
    <>
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <Stack direction={screenSize ? "column-reverse" : "row"} spacing={2}>
          <Paper sx={{ mt: 5 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant="h5">Application Form</Typography>
            </Box>

            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              component="form"
              noValidate
              //   onSubmit={handleSubmit}
            >
              <Grid container spacing={2} sx={{ p: 2 }}>
                <Grid item xs={12} sm={12}>
                  <Typography variant="body1">
                    Course-: {passedData && passedData.title}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  {" "}
                  <CustomTextField
                    autoComplete="First Name"
                    errorsMsg={errors.firstName}
                    handleChanges={handleChanges}
                    label="First Name: "
                    type="text"
                    value={values.firstName}
                    error={Boolean(errors.firstName)}
                    name="firstName"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  {" "}
                  <CustomTextField
                    autoComplete="Last Name"
                    errorsMsg={errors.lastName}
                    handleChanges={handleChanges}
                    label="Last Name"
                    type="text"
                    value={values.lastName}
                    error={Boolean(errors.lastName)}
                    name="lastName"
                  />
                </Grid>
                <Grid item xs={12}>
                  {" "}
                  <CustomDatePicker
                    autoComplete="date"
                    errorsMsg={errors.dateOfbirth}
                    handleChanges={handleChanges}
                    label="Date Of Birth"
                    type="date"
                    value={values.dateOfbirth}
                    error={Boolean(errors.dateOfbirth)}
                    name="dateOfbirth"
                  />
                </Grid>
                <Grid item xs={12}>
                  {" "}
                  <CustomTextField
                    autoComplete="email"
                    errorsMsg={errors.email}
                    handleChanges={handleChanges}
                    label="Email Address"
                    type="email"
                    value={values.email}
                    error={Boolean(errors.email)}
                    name="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  {" "}
                  <CustomTextField
                    autoComplete="tel"
                    errorsMsg={errors.phoneNo}
                    handleChanges={handleChanges}
                    label="Phone No"
                    type="tel"
                    value={values.phoneNo}
                    error={Boolean(errors.phoneNo)}
                    name="phoneNo"
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomSelect
                    name="educationLevel"
                    errorsMsg={errors.educationLevel}
                    handleChanges={handleChanges}
                    label="Education Level"
                    value={values.educationLevel}
                    error={Boolean(errors.educationLevel)}
                    options={EducationLevel}
                    width="100%"
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomTextArea
                    autoComplete="off"
                    errorsMsg={errors.aboutMe}
                    handleChanges={handleChanges}
                    label="Give a brief description about yourself"
                    type="text"
                    value={values.aboutMe}
                    error={Boolean(errors.aboutMe)}
                    name="aboutMe"
                  />
                </Grid>
                <Grid item xs={12}>
                  <LoadingButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3 }}
                    loading={loading}
                    size="large"
                    loadingPosition="center"
                  >
                    Sign Up
                  </LoadingButton>
                </Grid>
              </Grid>
            </Stack>
          </Paper>
          <Container maxWidth="md">
            <Paper sx={{ mt: 5 }}>
              <Box height="400px">
                <Typography variant="h5" align="center" color="textSecondary">
                  Course Details Summary
                </Typography>
                <Stack direction="column">
                  <Typography
                    variant="body2"
                    align="center"
                    color="textSecondary"
                  >
                    Course-: {passedData && passedData.title}
                  </Typography>
                  <Typography variant="body2" align="center">
                    Course Fee-: {passedData && passedData.courseFee}
                  </Typography>
                  <Typography variant="body2" align="center">
                    Course Duration-: {passedData && passedData.courseDuration}
                  </Typography>
                </Stack>
              </Box>
            </Paper>
          </Container>
        </Stack>
        {/* <CustomSnackBar notify={notify} setNotify={setNotify} /> */}
      </Container>
    </>
  );
}
