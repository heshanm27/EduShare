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

const Provinces = [
  { value: "eastern", label: "Eastern" },
  { value: "northern", label: "Northern" },
  { value: "north western", label: "North Western" },
  { value: "north central", label: "North Central" },
  { value: "central", label: "Central" },
  { value: "sabaragamuwa", label: "Sabaragamuwa" },
  { value: "uva", label: "Uva" },
  { value: "southern", label: "Southern" },
  { value: "western", label: "Western" },
];

export default function SignUp() {
  const theme = useTheme();
  const [errors, setErrors] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState(initialValues);
  const [img, setImg] = useState(null);
  const [ProfileImage, setProfileImage] = useState(null);
  const [intrestedAreas, setIntrestedAreas] = useState([]);
  const intrestedAreasColletionRef = collection(db, "intrestedAreas");

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
    temp.intrest =
      (values.intrest.length !== 0 ? "" : "Please select intrest") ||
      (values.intrest.length >= 3 ? "" : "Please select more than 3 intrest");
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
    temp.firstName = values.firstName ? "" : "Please enter first name";
    temp.lastName = values.lastName ? "" : "Please enter last name";
    temp.phoneNo =
      (values.phoneNo ? "" : "Please enter phone number") ||
      (/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/.test(values.phoneNo)
        ? ""
        : "Please enter valid phone number");
    temp.address = values.address ? "" : "Please enter address";
    temp.city = values.city ? "" : "Please enter city";
    temp.province = values.province ? "" : "Please select province";
    temp.education = values.education ? "" : "Please select education status";
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
        firstName: values.firstName,
        lastName: values.lastName,
        phoneNo: values.phoneNo,
        address: values.address,
        city: values.city,
        province: values.province,
        education: values.education,
        intrest: values.intrest,
        img: Url,
        userRole: "admin",
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
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
            >
              <Avatar sx={{ width: 100, height: 100 }}>
                <img
                  src={img}
                  alt="userlogo"
                  style={{ width: 100, height: 100 }}
                />
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
              <Grid item xs={12} sm={6}>
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
              </Grid>
              <Grid item xs={12}>
                <CustomSelect
                  name="education"
                  errorsMsg={errors.education}
                  handleChanges={handleChanges}
                  label="Education"
                  value={values.education}
                  error={Boolean(errors.education)}
                  options={EducationLevel}
                  width="100%"
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
                    Intrested Areas*(Select minimum 3 intrested areas)
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
