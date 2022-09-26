import { Button, Chip, Container, TextareaAutosize } from "@mui/material";
import MaterialTable from "material-table";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import CustomeDialog from "../../../Components/CustomDialog/CustomDialog";
import VoluntterForm from "../../../Components/Forms/VoluntterForm/VoluntterForm";
import { MTableAction } from "material-table";
import CustomSnackBar from "../../../Components/CustomSnackBar/CustomSnakBar";
import { useEffect } from "react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../FireBase/Config";
import { useSelector } from "react-redux";
export default function Voluntter() {
  const [open, setOpen] = useState(false);
  const [updateValue, setUpdateValue] = useState(null);
  const [FullData, setFullData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { curruntUser } = useSelector((state) => state.user);
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
      title: "Work Location",
      field: "workLocation",
      align: "left",
      render: (rowData) => {
        return (
          <Chip label={rowData.workLocation} color="success" variant="filled" />
        );
      },
    },
  ];

  const updateOpenPopup = (data) => {
    setUpdateValue(data);
    setOpen(true);
  };
  useEffect(() => {
    const q = query(
      collection(db, "VolunteerPost"),
      where("createdBy.id", "==", curruntUser?.id)
    );
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
          title="VOLUNTEER OPPORTUNITIES"
          isLoading={loading}
          options={{
            actionsColumnIndex: -1,
            addRowPosition: "first",
          }}
          localization={{ toolbar: { searchPlaceholder: "Post title" } }}
          columns={columns}
          data={FullData}
          editable={{
            onRowDelete: (oldData) =>
              new Promise(async (resolve, reject) => {
                try {
                  await deleteDoc(doc(db, "VolunteerPost", oldData.id));
                  setNotify({
                    isOpen: true,
                    message: "Post deleted successfully",
                    type: "success",
                    title: "Deleted",
                  });
                  resolve();
                } catch (error) {
                  setNotify({
                    isOpen: true,
                    message: error.message,
                    type: "error",
                    title: "Error",
                  });
                  reject();
                }
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
              onClick: (event, rowData) => updateOpenPopup(rowData),
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
