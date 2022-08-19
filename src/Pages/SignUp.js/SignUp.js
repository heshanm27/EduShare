import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { IconButton, Paper, Stack } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import CustomTextField from "../../Components/CustomTextField/CustomTextField";
import CustomNavBar from "../../Components/NavBar/CustomNavBar";

const initialValues = {
  email: "",
};

export default function SignUp() {
  const [errors, setErrors] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState(initialValues);
  const [img, setImg] = useState();

  const onImageChange = (e) => {
    const [file] = e.target.files;
    setImg(URL.createObjectURL(file));
  };

  //customer snackbar props
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "error",
    title: "",
  });

  //validate email
  const validate = () => {
    let temp = {};
    temp.email =
      (/$^|.+@.+..+/.test(values.email) ? "" : "Please enter valid email") ||
      (values.email ? "" : "Please enter email ");

    setErrors({
      ...temp,
    });
    // //if all the proprties valid to the function that provide in every() it will return true  or if one fail it return false
    return Object.values(temp).every((x) => x === "");
  };

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

  //handle submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    //validate values
    if (validate()) {
    }
  };

  return (
    <>
      <CustomNavBar />
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Paper sx={{ mt: 10 }}>
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
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
            >
              <Avatar sx={{ width: 100, height: 100 }}>
                <img src={img} style={{ width: 100, height: 100 }} />
              </Avatar>
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={onImageChange}
              />
            </IconButton>
          </Box>

          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            component="form"
            noValidate
            onSubmit={handleSubmit}
          >
            <Grid container spacing={2} sx={{ p: 2 }}>
              <Grid item xs={12} sm={6}>
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
              <Grid item xs={12} sm={6}>
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
              <Grid item xs={12} sm={6}>
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
              <Grid item xs={12} sm={6}>
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
              <Grid item xs={12} sm={6}>
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
                </LoadingButton>{" "}
              </Grid>
            </Grid>
          </Stack>
          <Grid container justifyContent="flex-end" sx={{ p: 2 }}>
            <Grid item>
              <Link href="/signIn" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
}
