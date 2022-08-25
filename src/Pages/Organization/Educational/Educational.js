import { Button, Chip, Container, TextareaAutosize } from "@mui/material";
import MaterialTable from "material-table";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import CustomeDialog from "../../../Components/CustomDialog/CustomDialog";
import CustomTextField from "../../../Components/CustomTextField/CustomTextField";
import EduationalForm from "../../../Components/Forms/EducationalForm/EduationalForm";
import { MTableAction } from "material-table";
import CustomSnackBar from "../../../Components/CustomSnackBar/CustomSnakBar";
import { useEffect } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../../FireBase/Config";
export default function OppertunitesAdmin() {
  const [open, setOpen] = useState(false);

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
    { title: "Post Title", field: "title" },
    {
      title: "Post Description",
      field: "details",
      sorting: false,
      render: (rowData) => (
        <TextareaAutosize
          aria-label="empty textarea"
          disabled
          maxRows={4}
          value={rowData.details}
        />
      ),
    },
    {
      title: "Post Closing Date",
      field: "closingDate",
      type: "date",
      sorting: false,
    },
    { title: "Education Level", field: "educationLevel", sorting: false },
    {
      title: "Course Fee",
      field: "courseFee",
      align: "left",
      render: (rowData) => {
        if (rowData.courseFee === 0) {
          return <Chip label="Free" color="success" variant="filled" />;
        } else {
          return "LKR " + rowData.courseFee.toFixed(2);
        }
      },
      type: "currency",
    },
  ];
  useEffect(() => {
    const q = query(collection(db, "EduationalPost"));
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
          title="EDUCATIONAL OPPORTUNITIES"
          isLoading={loading}
          options={{
            actionsColumnIndex: -1,
            addRowPosition: "first",
          }}
          localization={{ toolbar: { searchPlaceholder: "No/Brand/Year" } }}
          columns={columns}
          data={FullData}
          editable={{
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                resolve();
              }),
          }}
          actions={[
            {
              icon: "add",
              tooltip: "Add User",
              isFreeAction: true,
              onClick: () => {},
            },
            {
              icon: "edit",
              tooltip: "Edit Post",
              onClick: (event, rowData) => setOpen(true),
            },
          ]}
          components={{
            Action: (props) => {
              if (props.action.icon === "add") {
                return (
                  <Button
                    size="large"
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setOpen(true)}
                  >
                    Add Post
                  </Button>
                );
              } else {
                return <MTableAction {...props} />;
              }
            },
          }}
        />
      </Container>
      <CustomeDialog
        open={open}
        setOpen={setOpen}
        title="Post New Eduational Opportunities"
      >
        <EduationalForm setNotify={setNotify} setOpen={setOpen} />
      </CustomeDialog>
      <CustomSnackBar notify={notify} setNotify={setNotify} />
    </>
  );
}
