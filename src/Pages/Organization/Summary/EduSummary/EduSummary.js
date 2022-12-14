import { Button, Container } from "@mui/material";
import MaterialTable, { MTableAction } from "material-table";
import React, { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import CustomeDialog from "../../../../Components/CustomDialog/CustomDialog";
import EduationalForm from "../../../../Components/Forms/EducationalForm/EduationalForm";
import CustomSnackBar from "../../../../Components/CustomSnackBar/CustomSnakBar";

import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
} from "firebase/firestore";
import { db } from "../../../../FireBase/Config";
import { useNavigate } from "react-router-dom";
export default function EduSummary() {
  const navigate = useNavigate();
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
    { title: "Post Title", field: "postTile" },
    { title: "Response Count", field: "responseCount" },
    { title: "Post Views", field: "postViews" },
    {
      title: "Post Closing Date",
      field: "postClosingDate",
      type: "date",
      sorting: false,
    },
    // {
    //   title: "Course Fee",
    //   field: "courseFee",
    //   align: "left",
    //   render: (rowData) => {
    //     if (rowData?.courseFee === 0) {
    //       return (
    //         <Chip label="Free Of Charge" color="success" variant="filled" />
    //       );
    //     } else {
    //       return "LKR " + rowData?.courseFee.toFixed(2);
    //     }
    //   },
    //   type: "currency",
    // },
  ];

  const updateOpenPopup = (data) => {
    setUpdateValue(data);
    setOpen(true);
  };
  useEffect(() => {
    const q = query(collection(db, "EduPostResponse"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const postData = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.id);
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
          localization={{ toolbar: { searchPlaceholder: "Post title" } }}
          columns={columns}
          data={FullData}
          editable={{
            onRowDelete: (oldData) =>
              new Promise(async (resolve, reject) => {
                try {
                  await deleteDoc(doc(db, "EduationalPost", oldData.id));
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
              onClick: (event, rowData) => {
                const data = {
                  ...rowData,
                  email: rowData.contactEmail,
                  courseFee: String(rowData.courseFee),
                };
                updateOpenPopup(data);
              },
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
                    onClick={() => navigate("/edu/summary/report")}
                    sx={{ margin: "0px 20px" }}
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
        title="Post new eduational opportunity"
      >
        <EduationalForm
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
