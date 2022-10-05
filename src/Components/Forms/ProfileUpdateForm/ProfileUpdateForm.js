import { PhotoCamera } from "@material-ui/icons";
import { LoadingButton } from "@mui/lab";
import {
  Avatar,
  Box,
  Chip,
  Grid,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import CustomSelect from "../../CustomSelect/CustomSelect";
import CustomTextField from "../../CustomTextField/CustomTextField";
import { uploadImage } from "../../../utility/UploadImage";
import DoneIcon from "@mui/icons-material/Done";
import VerifiedIcon from "@mui/icons-material/Verified";
import { EducationLevel } from "../../../Constants/Constants";
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

export default function ProfileUpdateForm() {
  const [errors, setErrors] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState(initialValues);
  const [img, setImg] = useState(null);
  const [ProfileImage, setProfileImage] = useState(null);
  const [intrestedAreas, setIntrestedAreas] = useState([]);
  const theme = useTheme();

  const onImageChange = (e) => {
    const [file] = e.target.files;
    setProfileImage(e.target.files[0]);
    setImg(URL.createObjectURL(file));
  };

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

  return (
    <Paper>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Tooltip title="Upload User Avatar">
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
          >
            <Avatar sx={{ width: 100, height: 100 }}>
              <img
                src={img}
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
            <Stack direction="column" justifyContent="end" alignItems="start">
              <Typography variant="body1" color={theme.palette.text.secondary}>
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
                    values.intrest?.includes(area.name) ? "filled" : "outlined"
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
              <Typography variant="subtitle1" color={theme.palette.error.main}>
                {errors.intrest}
              </Typography>
            </Grid>
          )}

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
    </Paper>
  );
}
