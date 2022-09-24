import { Button, Chip, Container, TextareaAutosize } from "@mui/material";
import MaterialTable, { MTableAction } from "material-table";
import React, { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import CustomeDialog from "../../../../Components/CustomDialog/CustomDialog";
import EduationalForm from "../../../../Components/Forms/EducationalForm/EduationalForm";
import CustomSnackBar from "../../../../Components/CustomSnackBar/CustomSnakBar";
import { useSelector } from "react-redux";
import { isInThePast } from "../../../../utility/UtilityFuntion";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../../FireBase/Config";
import TableViewIcon from "@mui/icons-material/TableView";
import CustomResponsDataView from "../../../../Components/CustomResponsDataView/CustomResponsDataView";
export default function VolResponse() {
  const [open, setOpen] = useState(false);
  const [responsesData, setResponsesData] = useState(null);
  const [FullData, setFullData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { curruntUser } = useSelector((state) => state.user);
  const [selectedRow, setSelectedRow] = useState(null);
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
    {
      title: "Closing Date",
      field: "courseFee",
      align: "left",
      render: (rowData) => {
        if (isInThePast(rowData.postClosingDate)) {
          return <Chip label="Expired" color="error" variant="outlined" />;
        } else {
          return <Chip label="Active" color="success" variant="outlined" />;
        }
      },
    },
  ];

  const updateOpenPopup = (data) => {
    setResponsesData(data);
    setOpen(true);
  };
  useEffect(() => {
    console.log(curruntUser?.id);
    const q = query(
      collection(db, "VolPostResponse"),
      where("postCreatedBy", "==", curruntUser?.id)
    );
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
          title="Posts Responses"
          isLoading={loading}
          onRowSelected={(evt, selectedRow) =>
            setSelectedRow(selectedRow.tableData.id)
          }
          options={{
            actionsColumnIndex: -1,
            addRowPosition: "first",

            rowStyle: (rowData) => ({
              backgroundColor:
                selectedRow === rowData.tableData.id ? "#EEE" : "#FFF",
            }),
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
              icon: "tableview",
              tooltip: "Applicants List",
              onClick: (event, rowData) => {
                console.log(rowData.postresponses);
                updateOpenPopup(rowData.postresponses);
              },
            },
          ]}
        />
      </Container>
      <CustomeDialog
        open={open}
        setOpen={setOpen}
        title="Applicants Details"
        maxWidth="md"
      >
        <CustomResponsDataView data={responsesData} />
      </CustomeDialog>
      <CustomSnackBar notify={notify} setNotify={setNotify} />
    </>
  );
}
