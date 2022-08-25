import {
  Container,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { addDoc, collection, getDocs, Timestamp } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../FireBase/Config";
import CustomSelect from "../../CustomSelect/CustomSelect";
import CustomTextField from "../../CustomTextField/CustomTextField";
import { EducationLevel } from "../../../Constants/Constants";
import CustomIntrestedArea from "../../CustomIntrestedArea/CustomIntrestedArea";
import LoadingButton from "@mui/lab/LoadingButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Thumbnail from "../../../Assets/images/EduShareThumbnail.jpg";
import CustomTextArea from "../../CustomTextArea/CustomTextArea";
import { uploadImage } from "../../../utility/UploadImage";
import CustomDatePicker from "../../CustomDatePicker/CustomDatePicker";

const initialValues = {
  title: "",
  details: "",
  educationLevel: "",
  intrest: [],
  phoneNo: "",
  courseFee: 0,
  closingDate: "",
  ThumbnailUrl:
    "https://firebasestorage.googleapis.com/v0/b/edushare-7bb58.appspot.com/o/ExampleImages%2FEduShareThumbnail.jpg?alt=media&token=53f60981-928a-40e4-9389-1e47df3191c5",
};

export default function EduationalForm({
  setNotify,
  updateValue,
  setOpen,
  setUpdateValue,
}) {
  const [errors, setErrors] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState(initialValues);
  const [intrestedAreas, setIntrestedAreas] = useState([]);
  const intrestedAreasColletionRef = collection(db, "intrestedAreas");
  const theme = useTheme();
  const [img, setImg] = useState(Thumbnail);
  const [ThumbnailImage, setThumbnailImage] = useState(null);

  const handleAddIntrestedArea = (area) => {
    if (values.intrest.includes(area.id)) {
      setValues({
        ...values,
        intrest: values.intrest.filter((x) => x !== area.id),
      });
    } else {
      setValues({
        ...values,
        intrest: [...values.intrest, area.id],
      });
    }
  };

  //validate email
  function validate() {
    let temp = {};
    temp.intrest =
      values.intrest.length !== 0
        ? ""
        : "Please select one or more target areas";
    temp.title = values.title ? "" : "Please enter first name";
    temp.details = values.details ? "" : "Please enter last name";
    temp.phoneNo =
      (values.phoneNo ? "" : "Please enter phone number") ||
      (/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/.test(values.phoneNo)
        ? ""
        : "Please enter valid phone number");
    temp.educationLevel = values.educationLevel
      ? ""
      : "Please select education level";
    temp.closingDate = values.closingDate ? "" : "Please select closing date";
    temp.courseFee =
      (values.courseFee >= 0 ? "" : "Please enter course fee") ||
      (values.courseFee ? "" : "Please enter course fee");
    setErrors({
      ...temp,
    });
    // //if all the proprties valid to the function that provide in every() it will return true  or if one fail it return false
    return Object.values(temp).every((x) => x === "");
  }

  useEffect(() => {
    const getIntrestedArea = async () => {
      const data = await getDocs(intrestedAreasColletionRef);
      setIntrestedAreas(
        data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };
    getIntrestedArea();

    if (updateValue) {
      setValues(updateValue);
      setImg(updateValue.ThumbnailUrl);
    }
    return () => {
      setValues(initialValues);
      setErrors(initialValues);
      setUpdateValue(null);
    };
  }, []);

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

  const onImageChange = (e) => {
    const [file] = e.target.files;
    setThumbnailImage(e.target.files[0]);
    setImg(URL.createObjectURL(file));
  };

  //handle submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    //validate values
    if (validate()) {
      try {
        let Url = "";
        if (ThumbnailImage) {
          Url = await uploadImage(ThumbnailImage, "EduationalTumbnail");
        }

        const PostObj = {
          title: values.title,
          details: values.details,
          educationLevel: values.educationLevel,
          intrest: values.intrest,
          phoneNo: values.phoneNo,
          courseFee: Number(values.courseFee),
          closingDate: values.closingDate,
          ThumbnailUrl: Url ? Url : values.ThumbnailUrl,
          createdAt: Timestamp.fromDate(new Date()),
        };
        await addDoc(collection(db, "EduationalPost"), PostObj);
        setLoading(false);
        setOpen(false);
        setNotify({
          isOpen: true,
          message: "Post added successfully",
          type: "success",
          title: "Success",
        });
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
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <CustomTextField
            autoComplete="off"
            errorsMsg={errors.title}
            handleChanges={handleChanges}
            label="Post Title"
            type="text"
            value={values.title}
            error={Boolean(errors.title)}
            name="title"
          />
        </Grid>
        <Grid item xs={12}>
          <CustomTextArea
            autoComplete="off"
            errorsMsg={errors.details}
            handleChanges={handleChanges}
            label="Post Details"
            type="text"
            value={values.details}
            error={Boolean(errors.details)}
            name="details"
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
        <CustomIntrestedArea
          handleAddIntrestedArea={handleAddIntrestedArea}
          errors={errors}
          intrestedAreas={intrestedAreas}
          hint="This post will be visible to user with this intrested areas"
          title="Target Areas"
          values={values}
        />
        <Grid item xs={12}>
          {" "}
          <CustomTextField
            autoComplete="tel"
            errorsMsg={errors.phoneNo}
            handleChanges={handleChanges}
            label="Contatct Number"
            type="tel"
            value={values.phoneNo}
            error={Boolean(errors.phoneNo)}
            name="phoneNo"
          />
        </Grid>

        <Grid item xs={12}>
          {" "}
          <CustomTextField
            autoComplete="off"
            errorsMsg={errors.courseFee}
            handleChanges={handleChanges}
            label="Course Fee"
            type="number"
            value={values.courseFee}
            error={Boolean(errors.courseFee)}
            name="courseFee"
            helptext="Please type 0 “zero” if the course is free"
            startIcon="RS"
          />
        </Grid>
        <Grid item xs={12}>
          {" "}
          <CustomDatePicker
            autoComplete="date"
            errorsMsg={errors.closingDate}
            handleChanges={handleChanges}
            label="Closing Date"
            type="date"
            value={values.closingDate}
            error={Boolean(errors.closingDate)}
            name="closingDate"
          />
        </Grid>
        <Grid item xs={12}>
          <Stack direction="column" spacing={2}>
            <Typography variant="body1" color={theme.palette.text.secondary}>
              Upload Thumbnail
              <Typography
                color={theme.palette.text.secondary}
                variant="caption"
              >
                ( This image will be displayed along with this post )
              </Typography>
            </Typography>
            <Tooltip title="Upload Thumbnail">
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="label"
                disableRipple
              >
                <PhotoCamera />
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={onImageChange}
                />
              </IconButton>
            </Tooltip>
          </Stack>
          <img
            style={{ width: "500px", Height: "300px" }}
            src={img}
            loading="lazy"
            alt="thumbnail"
          />
        </Grid>
        <Grid item xs={12}>
          {updateValue ? (
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3 }}
              loading={loading}
              size="large"
              loadingPosition="center"
              onClick={handleSubmit}
            >
              Update Post
            </LoadingButton>
          ) : (
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3 }}
              loading={loading}
              size="large"
              loadingPosition="center"
              onClick={handleSubmit}
            >
              Post
            </LoadingButton>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
