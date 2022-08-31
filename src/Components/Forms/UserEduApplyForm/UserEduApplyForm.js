import { Typography } from "@material-ui/core";
import {
  Avatar,
  Box,
  Container,
  CssBaseline,
  Grid,
  IconButton,
  Link,
  Paper,
  Stack,
} from "@mui/material";
import React, { useState } from "react";
import CustomTextField from "../../CustomTextField/CustomTextField";
import CustomNavBar from "../../NavBar/CustomNavBar";
import { useLocation } from "react-router-dom";
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNo: "",
  address: "",
  city: "",
  province: "",
  education: "",
  intrest: [],
  password: "",
  confirmPassword: "",
};

export default function UserEduApplyForm() {
  const [errors, setErrors] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState(initialValues);
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
  console.log(location, " useLocation Hook");
  return (
    <>
      <CustomNavBar />
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Paper sx={{ mt: 5 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h4">
              Sign up
            </Typography>
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
                {" "}
                <CustomTextField
                  autoComplete="address"
                  errorsMsg={errors.address}
                  handleChanges={handleChanges}
                  label="Address"
                  type="text"
                  value={values.address}
                  error={Boolean(errors.address)}
                  name="address"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                {" "}
                <CustomTextField
                  autoComplete="address-level2"
                  errorsMsg={errors.city}
                  handleChanges={handleChanges}
                  label="City"
                  type="text"
                  value={values.city}
                  error={Boolean(errors.city)}
                  name="city"
                />
              </Grid>
              {/* <Grid item xs={12} sm={6}>
              <CustomSelect
                handleChanges={handleChanges}
                errorsMsg={errors.province}
                label="Province"
                value={values.province}
                error={Boolean(errors.province)}
                name="province"
                width="100%"
                options={Provinces}
              />
            </Grid> */}

              <Grid item xs={12}>
                {" "}
                {/* <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3 }}
                loading={loading}
                size="large"
                loadingPosition="center"
              >
                Sign Up
              </LoadingButton>{" "} */}
              </Grid>
            </Grid>
          </Stack>
        </Paper>
        {/* <CustomSnackBar notify={notify} setNotify={setNotify} /> */}
      </Container>
    </>
  );
}
