import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Paper, Stack } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useNavigate } from "react-router-dom";
import CustomNavBar from "../../Components/NavBar/CustomNavBar";
import CustomPasswordInput from "../../Components/CustomPasswordInput/CustomePasswordInput";
import CustomTextField from "../../Components/CustomTextField/CustomTextField";

const initialValues = {
  email: "",
  password: "",
  showPassword: false,
};

export default function SignIn() {
  const [errors, setErrors] = useState(initialValues);
  const [values, setValues] = useState(initialValues);
  const navigate = useNavigate();

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
    temp.password = values.password ? "" : "Please enter password";

    setErrors({
      ...temp,
    });
    // //if all the proprties valid to the function that provide in every() it will return true  or if one fail it return false
    return Object.values(temp).every((x) => x === "");
  };

  /**
   *
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

  //handle submit form
  const handleSubmit = async (event) => {
    event.preventDefault();

    //validate values
    if (validate()) {
      //dispatch action to sign in user
    }
  };

  return (
    <>
      <CustomNavBar />

      <Container component="main" maxWidth="sm">
        <Box
          sx={{
            marginTop: 16,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "50vh",
          }}
        >
          <Paper
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" color="#094067">
              Sign in
            </Typography>
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={3}
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1, padding: { xs: 1, sm: 4 }, width: "80%" }}
            >
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
              <CustomPasswordInput
                values={values}
                error={Boolean(errors.password)}
                errorsMsg={errors.password}
                setValues={setValues}
                handleChanges={handleChanges}
              />
              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                sx={{ mt: 3, mb: 1 }}
                size="large"
                loadingPosition="center"
              >
                Sign In
              </LoadingButton>
              <Grid container>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Stack>
          </Paper>
        </Box>
      </Container>
    </>
  );
}
