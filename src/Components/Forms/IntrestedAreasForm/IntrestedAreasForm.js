import { Container, Grid } from "@mui/material";
import {
  addDoc,
  collection,
  Timestamp,
  doc,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../FireBase/Config";
import CustomTextField from "../../CustomTextField/CustomTextField";
import LoadingButton from "@mui/lab/LoadingButton";

const initialValues = {
  name: "",
  discription: "",
};
export default function IntrestedAreasForm({
  setNotify,
  updateValue,
  setOpen,
  setUpdateValue,
}) {
  const [errors, setErrors] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState(initialValues);

  //validate email
  function validate() {
    let temp = {};
    temp.name = values.name ? "" : "Please enter intrested area  name";
    temp.discription = values.discription
      ? ""
      : "Please enter intrested area discription";

    setErrors({
      ...temp,
    });
    // //if all the proprties valid to the function that provide in every() it will return true  or if one fail it return false
    return Object.values(temp).every((x) => x === "");
  }

  useEffect(() => {
    if (updateValue) {
      setValues(updateValue);
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

  const hanldeInsert = async () => {
    try {
      const PostObj = {
        discription: values.discription,
        name: values.name,
        createdAt: Timestamp.fromDate(new Date()),
      };
      await addDoc(collection(db, "intrestedAreas"), PostObj);
      setLoading(false);
      setOpen(false);
      setNotify({
        isOpen: true,
        message: "Intrested Area added successfully",
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

  const handleUpdate = async () => {
    try {
      const PostObj = {
        discription: values.discription,
        name: values.name,
        createdAt: Timestamp.fromDate(new Date()),
      };
      await updateDoc(doc(db, "intrestedAreas", updateValue.id), PostObj);
      setLoading(false);
      setOpen(false);
      setNotify({
        isOpen: true,
        message: "Intrested Area  updated successfully",
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
    event.preventDefault();
    setLoading(true);
    //validate values
    if (validate()) {
      if (!updateValue) {
        hanldeInsert();
      } else {
        handleUpdate();
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
            errorsMsg={errors.name}
            handleChanges={handleChanges}
            label="Intrested Area"
            type="text"
            value={values.name}
            error={Boolean(errors.name)}
            name="name"
          />
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            autoComplete="off"
            errorsMsg={errors.discription}
            handleChanges={handleChanges}
            label="Intrested Area Discription"
            type="text"
            value={values.discription}
            error={Boolean(errors.discription)}
            name="discription"
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
              Update
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
              Add
            </LoadingButton>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
