import { Button, Chip, Container, TextareaAutosize } from "@mui/material";
import MaterialTable, { MTableAction } from "material-table";
import React, { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import CustomeDialog from "../../../Components/CustomDialog/CustomDialog";
import VoluntterForm from "../../../Components/Forms/VoluntterForm/VoluntterForm";
import CustomSnackBar from "../../../Components/CustomSnackBar/CustomSnakBar";

import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
} from "firebase/firestore";
import { db } from "../../../FireBase/Config";
export default function InterestedAreas() {
  const [open, setOpen] = useState(false);
  const [updateValue, setUpdateValue] = useState(null);
  const [FullData, setFullData] = useState([]);
  const [loading, setLoading] = useState(true);
  //customer snackbar props
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "error",
    title: "",
  });
  const columns = [
    { title: "User Name", field: "firstName" },
    { title: "User Email", field: "email" },
    {
      title: "User Phone No",
      field: "phoneNo",
      sorting: false,
    },
    {
      title: "User Role",
      field: "userRole",
      align: "left",
      render: (rowData) => {
        return <Chip label={rowData.userRole} color="info" variant="filled" />;
      },
    },
  ];

  const updateOpenPopup = (data) => {
    setUpdateValue(data);
    setOpen(true);
  };
  useEffect(() => {
    const q = query(collection(db, "users"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const postData = [];
      querySnapshot.forEach((doc) => {
        postData.push({ ...doc.data(), id: doc.id });
      });
      setFullData(postData);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <Container maxWidth="xl">
        <MaterialTable
          title="User Details"
          isLoading={loading}
          options={{
            actionsColumnIndex: -1,
            addRowPosition: "first",
          }}
          localization={{ toolbar: { searchPlaceholder: "UserName,Email" } }}
          columns={columns}
          data={FullData}
          editable={{
            onRowUpdate: (newData, oldData) => {},
          }}
        />
      </Container>
      <CustomeDialog
        open={open}
        setOpen={setOpen}
        title="Post new volunteer opportunity"
      >
        <VoluntterForm
          setNotify={setNotify}
          setOpen={setOpen}
          updateValue={updateValue}
          setUpdateValue={setUpdateValue}
        />
      </CustomeDialog>
      <CustomSnackBar notify={notify} setNotify={setNotify} />
    </>
  );
}
