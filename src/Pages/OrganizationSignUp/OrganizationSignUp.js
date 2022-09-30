import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {
  Chip,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  useTheme,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import CustomTextField from "../../Components/CustomTextField/CustomTextField";
import CustomNavBar from "../../Components/NavBar/CustomNavBar";
import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import { auth, db } from "../../FireBase/Config";
import CustomPasswordInput from "../../Components/CustomPasswordInput/CustomePasswordInput";
import CustomSelect from "../../Components/CustomSelect/CustomSelect";
import CustomSnackBar from "../../Components/CustomSnackBar/CustomSnakBar";
import { uploadImage } from "../../utility/UploadImage";
import DoneIcon from "@mui/icons-material/Done";
import VerifiedIcon from "@mui/icons-material/Verified";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { EducationLevel } from "../../Constants/Constants";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useNavigate } from "react-router-dom";
const initialValues = {
  organizationName: "",
  shortFormName: "",
  email: "",
  phoneNo: "",
  address: "",
  intrest: [],
  password: "",
  confirmPassword: "",
};

const Avatars = [
  "https://firebasestorage.googleapis.com/v0/b/edushare-7bb58.appspot.com/o/defaultAvatrs%2FUntitled-2.png?alt=media&token=66e81b60-cfbc-48a4-8eee-4377ec447496",
];
const randomId = Math.floor(Math.random() * Avatars.length);
export default function OrganizationSignUp() {
  const theme = useTheme();
  const [errors, setErrors] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState(initialValues);
  const [img, setImg] = useState(null);
  const [ProfileImage, setProfileImage] = useState(null);
  const [intrestedAreas, setIntrestedAreas] = useState([]);
  const intrestedAreasColletionRef = collection(db, "intrestedAreas");
  const navigate = useNavigate();
  const onImageChange = (e) => {
    const [file] = e.target.files;
    setProfileImage(e.target.files[0]);
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
  function validate() {
    let temp = {};
    temp.email =
      (/$^|.+@.+..+/.test(values.email) ? "" : "Please enter valid email") ||
      (values.email ? "" : "Please enter email ");
    temp.intrest = values.intrest.length !== 0 ? "" : "Please select intrest";
    temp.password =
      (values.password ? "" : "Please enter password") ||
      (values.password.length >= 6
        ? ""
        : "Password must be atleast 6 characters");
    temp.confirmPassword =
      (values.confirmPassword ? "" : "Please enter confirm password") ||
      (values.confirmPassword === values.password
        ? ""
        : "Password does not match");
    temp.organizationName = values.organizationName
      ? ""
      : "Please enter organization name";
    temp.shortFormName = values.shortFormName
      ? ""
      : "Please enter short form of name";
    temp.phoneNo =
      (values.phoneNo ? "" : "Please enter phone number") ||
      (/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/.test(values.phoneNo)
        ? ""
        : "Please enter valid phone number");
    temp.address = values.address ? "" : "Please enter address";
    setErrors({
      ...temp,
    });
    // //if all the proprties valid to the function that provide in every() it will return true  or if one fail it return false
    return Object.values(temp).every((x) => x === "");
  }

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

  const handleAddIntrestedArea = (area) => {
    console.log(values.intrest);
    console.log(area);
    if (values.intrest.includes(area.name)) {
      setValues({
        ...values,
        intrest: values.intrest.filter((x) => x !== area.name),
      });
    } else {
      setValues({
        ...values,
        intrest: [...values.intrest, area.name],
      });
    }
  };

  const addNewUser = async (userid) => {
    if (validate()) {
      let Url = "";
      if (ProfileImage !== null) {
        Url = await uploadImage(ProfileImage, "UsersAvatar");
      }

      const userObj = {
        firstName: values.organizationName,
        lastName: values.shortFormName,
        phoneNo: values.phoneNo,
        address: values.address,
        intrest: values.intrest,
        img: Url !== "" ? Url : Avatars[randomId],
        userRole: "org",
        email: values.email,
      };
      setDoc(doc(db, "users", userid), userObj, { merge: true });
    }
  };

  //handle submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    //validate values
    if (validate()) {
      try {
        const userData = await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        await addNewUser(userData.user.uid);
        setLoading(false);
        setValues(initialValues);
        navigate("/edu");
      } catch (err) {
        console.log(err);
        setLoading(false);
        setNotify({
          isOpen: true,
          message: err.message,
          type: "error",
        });
      }
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getIntrestedArea = async () => {
      const data = await getDocs(intrestedAreasColletionRef);
      setIntrestedAreas(
        data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };
    getIntrestedArea();
  }, []);

  return (
    <>
      <CustomNavBar />
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Paper sx={{ mt: 5, mb: 5, p: 1 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              component="h1"
              variant="h4"
              color={theme.palette.primary.main}
            >
              Sign up
            </Typography>
            <Tooltip title="Upload User Avatar">
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="label"
              >
                <Avatar sx={{ width: 100, height: 100 }}>
                  <img
                    src={img ? img : Avatars[randomId]}
                    alt="userlogo"
                    style={{ width: 100, height: 100, position: "absolute" }}
                  />
                  <PhotoCamera sx={{ zIndex: 10 }} />
                </Avatar>
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={onImageChange}
                />
              </IconButton>
            </Tooltip>
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
              <Grid item xs={12} sm={12}>
                {" "}
                <CustomTextField
                  autoComplete="false"
                  errorsMsg={errors.organizationName}
                  handleChanges={handleChanges}
                  label="Organization Name: "
                  type="text"
                  value={values.organizationName}
                  error={Boolean(errors.organizationName)}
                  name="organizationName"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                {" "}
                <CustomTextField
                  autoComplete="fasle"
                  errorsMsg={errors.shortFormName}
                  handleChanges={handleChanges}
                  label="Short Form Of Name : "
                  type="text"
                  value={values.shortFormName}
                  error={Boolean(errors.shortFormName)}
                  name="shortFormName"
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
              <Grid item xs={12}>
                <Stack
                  direction="column"
                  justifyContent="end"
                  alignItems="start"
                >
                  <Typography
                    variant="body1"
                    color={theme.palette.text.secondary}
                  >
                    Offering Areas
                  </Typography>
                </Stack>
                {intrestedAreas.map((area) => (
                  <Tooltip key={area.id} title={area?.discription} arrow>
                    <Chip
                      sx={{ margin: 1 }}
                      color="info"
                      key={area.id}
                      variant={
                        values.intrest?.includes(area.name)
                          ? "filled"
                          : "outlined"
                      }
                      icon={
                        values.intrest?.includes(area.name) ? (
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
                  <Typography
                    variant="subtitle1"
                    color={theme.palette.error.main}
                  >
                    {errors.intrest}
                  </Typography>
                </Grid>
              )}
              <Grid item xs={12}>
                <CustomPasswordInput
                  values={values}
                  error={Boolean(errors.password)}
                  errorsMsg={errors.password}
                  setValues={setValues}
                  handleChanges={handleChanges}
                />
              </Grid>
              <Grid item xs={12}>
                <CustomPasswordInput
                  title="Confirm Password"
                  label="confirmPassword"
                  customvalue={values.confirmPassword}
                  values={values}
                  error={Boolean(errors.confirmPassword)}
                  errorsMsg={errors.confirmPassword}
                  setValues={setValues}
                  handleChanges={handleChanges}
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
        <CustomSnackBar notify={notify} setNotify={setNotify} />
      </Container>
    </>
  );
}
