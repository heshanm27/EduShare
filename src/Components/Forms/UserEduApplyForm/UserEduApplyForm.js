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
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CustomDatePicker from "../../CustomDatePicker/CustomDatePicker";
import { LoadingButton } from "@mui/lab";
import CustomSelect from "../../CustomSelect/CustomSelect";
import { EducationLevel } from "../../../Constants/Constants";
import CustomTextArea from "../../CustomTextArea/CustomTextArea";
import { useSelector } from "react-redux";
import { db } from "../../../FireBase/Config";
import {
  arrayUnion,
  doc,
  getDoc,
  increment,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import CustomSnackBar from "../../CustomSnackBar/CustomSnakBar";
const initialValues = {
  firstName: "",
  dateOfbirth: "",
  educationLevel: "",
  phoneNo: "",
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
  const { curruntUser } = useSelector((state) => state.user);
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "error",
    title: "",
  });

  function validate() {
    let temp = {};
    temp.email =
      (/$^|.+@.+..+/.test(values.email) ? "" : "Please enter valid email") ||
      (values.email ? "" : "Please enter email ");
    temp.firstName = values.firstName ? "" : "Please enter first name";
    temp.aboutMe = values.aboutMe ? "" : "Please enter your introduction";
    temp.phoneNo =
      (values.phoneNo ? "" : "Please enter phone number") ||
      (/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/.test(values.phoneNo)
        ? ""
        : "Please enter valid phone number");
    temp.dateOfbirth = values.dateOfbirth ? "" : "Please enter date Of birth";
    temp.educationLevel = values.educationLevel
      ? ""
      : "Please select education status";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const docRef = doc(db, "VolPostResponse", params.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        if (!docSnap.data().ApplyedUserID.includes(curruntUser.id)) {
          const response = {
            name: values.firstName,
            email: values.email,
            phoneNo: values.phoneNo,
            date: Timestamp.fromDate(new Date()),
            educationLevel: values.educationLevel,
            aboutMe: values.aboutMe,
            userId: curruntUser.id,
          };
          try {
            await updateDoc(docRef, {
              ApplyedUserID: arrayUnion(curruntUser.id),
              responseCount: increment(1),
              postresponses: arrayUnion(response),
            });
            navigate(
              "/vonfeed",

              {
                state: {
                  message: "Applied Successfully",
                  type: "success",
                  title: "Success",
                },
              }
            );
          } catch (err) {
            console.log(err);
          }
        } else {
          console.log("already applied");
          navigate("/vonfeed", {
            state: {
              message: "You have already applied for this opportunity ",
              type: "warning",
              title: "Warning",
            },
          });
        }
      }
    }
  };
  useEffect(() => {
    if (location.state) {
      setPassedData(location.state);
      console.log(location.state);
    }
    setValues({
      ...values,
      firstName: curruntUser?.name,
      email: curruntUser?.email,
      phoneNo: curruntUser?.phoneNo,
      educationLevel: curruntUser?.educationLevel,
    });
  }, [location.state]);
  return (
    <>
      <Container component="main" maxWidth="sm">
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
              <Typography variant="h5" color="primary">
                Application Form
              </Typography>
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
                  <Typography variant="body1">
                    Course-: {passedData && passedData.title}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
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
                    notrestricted={true}
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
                    Apply
                  </LoadingButton>
                </Grid>
              </Grid>
            </Stack>
          </Paper>
          {/* <Container maxWidth="md">
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
          </Container> */}
        </Stack>
        <CustomSnackBar notify={notify} setNotify={setNotify} />
      </Container>
    </>
  );
}
