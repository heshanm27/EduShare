import {
  Container,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import {
  addDoc,
  collection,
  getDocs,
  Timestamp,
  doc,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../FireBase/Config";
import CustomSelect from "../../CustomSelect/CustomSelect";
import CustomTextField from "../../CustomTextField/CustomTextField";
import { EducationLevel, CourseDurations } from "../../../Constants/Constants";
import CustomIntrestedArea from "../../CustomIntrestedArea/CustomIntrestedArea";
import LoadingButton from "@mui/lab/LoadingButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Thumbnail from "../../../Assets/images/EduShareThumbnail.jpg";
import CustomTextArea from "../../CustomTextArea/CustomTextArea";
import { uploadImage } from "../../../utility/UploadImage";
import CustomDatePicker from "../../CustomDatePicker/CustomDatePicker";
import { useSelector } from "react-redux";
const initialValues = {
  title: "",
  details: "",
  educationLevel: "",
  intrest: [],
  phoneNo: "",
  courseFee: "0",
  closingDate: "",
  courseDuration: "",
  email: "",
  ThumbnailUrl:
    "https://firebasestorage.googleapis.com/v0/b/edushare-7bb58.appspot.com/o/ExampleImages%2FEduShareThumbnail.jpg?alt=media&token=53f60981-928a-40e4-9389-1e47df3191c5",
};

const initialErrors = {
  title: "",
  details: "",
  educationLevel: "",
  intrest: [],
  phoneNo: "",
  courseFee: "",
  closingDate: "",
  courseDuration: "",
  email: "",
};
export default function EduationalForm({
  setNotify,
  updateValue,
  setOpen,
  setUpdateValue,
}) {
  const [errors, setErrors] = useState(initialErrors);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState(initialValues);
  const [intrestedAreas, setIntrestedAreas] = useState([]);
  const intrestedAreasColletionRef = collection(db, "intrestedAreas");
  const userColletionRef = collection(db, "users");
  const theme = useTheme();
  const [img, setImg] = useState(Thumbnail);
  const [ThumbnailImage, setThumbnailImage] = useState(null);
  const { curruntUser } = useSelector((state) => state.user);

  const handleAddIntrestedArea = (area) => {
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
    temp.email =
      (/$^|.+@.+..+/.test(values.email) ? "" : "Please enter valid email") ||
      (values.email ? "" : "Please enter email ");
    temp.educationLevel = values.educationLevel
      ? ""
      : "Please select education level";
    temp.courseDuration = values.courseDuration
      ? ""
      : "Please select course duration ";
    temp.closingDate = values.closingDate ? "" : "Please select closing date";
    temp.courseFee =
      (Number(values.courseFee) >= 0 ? "" : "Please enter 1 course fee") ||
      (values.courseFee ? "" : "Please enter 2 course fee");
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

  const CreateRespone = async (docId) => {
    const response = {
      postTile: values.title,
      postClosingDate: values.closingDate,
      postFee: values.courseFee,
      postCreatedAt: Timestamp.fromDate(new Date()),
      responseCount: 0,
      postCreatedBy: curruntUser.id,
      postViews: 0,
      postresponses: [],
      ApplyedUserID: [],
    };
    await setDoc(doc(db, "EduPostResponse", docId), response);
  };
  const hanldeInsert = async (curruntUserDetails) => {
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
        courseDuration: values.courseDuration,
        courseFee: Number(values.courseFee),
        contactEmail: values.email,
        closingDate: values.closingDate,
        ThumbnailUrl: Url ? Url : values.ThumbnailUrl,
        searchTags: values.title.toLowerCase(),
        createdAt: Timestamp.fromDate(new Date()),
        createdBy: curruntUserDetails,
      };
      const docRef = await addDoc(collection(db, "EduationalPost"), PostObj);
      CreateRespone(docRef.id);
      setLoading(false);
      setOpen(false);
      setNotify({
        isOpen: true,
        message: "Post added successfully",
        type: "success",
        title: "Success",
      });
    } catch (error) {
      console.log(error);
      setNotify({
        isOpen: true,
        message: error.message,
        type: "error",
        title: "Error",
      });
      setLoading(false);
    }
  };

  const handleUpdate = async (curruntUserDetails) => {
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
        courseDuration: values.courseDuration,
        contactEmail: values.email,
        closingDate: values.closingDate,
        ThumbnailUrl: Url ? Url : values.ThumbnailUrl,
        searchTags: values.title.toLowerCase(),
        createdAt: Timestamp.fromDate(new Date()),
        createdBy: curruntUserDetails,
      };
      await updateDoc(doc(db, "EduationalPost", updateValue.id), PostObj);
      setLoading(false);
      setOpen(false);
      setNotify({
        isOpen: true,
        message: "Post updated successfully",
        type: "success",
        title: "Success",
      });
    } catch (error) {
      console.log(error);
      setNotify({
        isOpen: true,
        message: error.message,
        type: "error",
        title: "Error",
      });
      setLoading(false);
    }
  };

  //handle submit
  const handleSubmit = async (event) => {
    const curruntUserDetails = {};
    curruntUserDetails.id = curruntUser.id;
    curruntUserDetails.name = curruntUser.name;
    curruntUserDetails.image = curruntUser.image;
    event.preventDefault();
    setLoading(true);
    //validate values
    if (validate()) {
      if (!updateValue) {
        hanldeInsert(curruntUserDetails);
      } else {
        handleUpdate(curruntUserDetails);
      }
    } else {
      setLoading(false);
    }
  };
  console.log(values);
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
            autoComplete="email"
            errorsMsg={errors.email}
            handleChanges={handleChanges}
            label="Contact Email Address"
            type="email"
            value={values.email}
            error={Boolean(errors.email)}
            name="email"
          />
        </Grid>
        <Grid item xs={12}>
          <CustomSelect
            name="courseDuration"
            errorsMsg={errors.courseDuration}
            handleChanges={handleChanges}
            label="Course Duration"
            value={values.courseDuration}
            error={Boolean(errors.courseDuration)}
            options={CourseDurations}
            width="100%"
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
            helptext="Please enter 0 “zero” if the course is free"
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
