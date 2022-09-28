import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Button, Paper, Stack, useTheme } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import CustomNavBar from "../../Components/NavBar/CustomNavBar";
import CustomPasswordInput from "../../Components/CustomPasswordInput/CustomePasswordInput";
import CustomTextField from "../../Components/CustomTextField/CustomTextField";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../../FireBase/Config";
import { signInWithEmailAndPassword } from "firebase/auth";
import CustomSnackBar from "../../Components/CustomSnackBar/CustomSnakBar";

const initialValues = {
  email: "",
  password: "",
  showPassword: false,
};
const TextStyle = {
  "&:hover": {
    textDecoration: "underline",
    cursor: "pointer",
  },
};

export default function SignIn() {
  const [errors, setErrors] = useState(initialValues);
  const [values, setValues] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.user);
  const theme = useTheme();
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
    setLoading(true);
    //validate values
    if (validate()) {
      //dispatch action to sign in user
      try {
        console.log("before signin" + isLoading);
        await signInWithEmailAndPassword(auth, values.email, values.password);

        console.log("sign in success");
        navigate("/edu", { replace: true });
        setLoading(false);
      } catch (error) {
        setNotify({
          isOpen: true,
          message: error.message,
          type: "error",
          title: "Error",
        });
        setLoading(false);
      }
    } else {
      setLoading(false);
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
                loading={loading}
                sx={{ mt: 3, mb: 1 }}
                size="large"
                loadingPosition="center"
                onClick={handleSubmit}
              >
                Sign In
              </LoadingButton>
              <Grid container>
                <Grid item xs={6}>
                  <Typography
                    variant="body2"
                    color={theme.palette.primary.main}
                    sx={TextStyle}
                    onClick={() => navigate("/resetpassword")}
                  >
                    Reset Password ?
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography
                    variant="body2"
                    color={theme.palette.primary.main}
                    sx={TextStyle}
                    onClick={() => navigate("/roles")}
                  >
                    {"Don't have an account? Sign Up"}
                  </Typography>
                </Grid>
              </Grid>
            </Stack>
          </Paper>
          <CustomSnackBar notify={notify} setNotify={setNotify} />
        </Box>
      </Container>
    </>
  );
}
