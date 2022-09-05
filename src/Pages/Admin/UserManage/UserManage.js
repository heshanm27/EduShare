import { Chip, Container } from "@mui/material";
import MaterialTable from "material-table";
import React, { useState, useEffect } from "react";
import CustomSnackBar from "../../../Components/CustomSnackBar/CustomSnakBar";

import {
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../FireBase/Config";
export default function UserManage() {
  const [FullData, setFullData] = useState([]);
  const [loading, setLoading] = useState(true);

  //customer snackbar props
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "error",
    title: "",
  });

  const roles = {
    org: "Organization",
    admin: "Admin",
    user: "User",
  };
  const columns = [
    {
      title: "User Name",
      render: (rowData) => rowData.firstName + " " + rowData.lastName,
      editable: "never",
    },
    { title: "User Email", field: "email", editable: "never" },
    {
      title: "User Phone No",
      field: "phoneNo",
      sorting: false,
      editable: "never",
    },
    {
      title: "User Role",
      field: "userRole",
      sorting: false,
      editable: "onUpdate",
      lookup: roles,
      render: (rowData) => {
        switch (rowData.userRole) {
          case "org":
            return (
              <Chip label="Organization" color="info" variant="outlined" />
            );

          case "admin":
            return <Chip label="Admin" color="warning" variant="outlined" />;

          case "user":
            return <Chip label="User" color="success" variant="outlined" />;

          default:
            return null;
        }
      },
    },
  ];
  const updateUserRole = async (id, role) => {
    try {
      await updateDoc(doc(db, "users", id), {
        userRole: role,
      });
      setNotify({
        isOpen: true,
        message: "User Role Updated Successfully",
        type: "success",
        title: "Success",
      });
    } catch (error) {
      setNotify({
        isOpen: true,
        message: "Something Went Wrong",
        type: "error",
        title: "Error",
      });
    }
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
          localization={{ toolbar: { searchPlaceholder: "Email" } }}
          columns={columns}
          data={FullData}
          editable={{
            onRowUpdate: (newData, oldData) => {
              return new Promise(async (resolve, reject) => {
                console.log(newData, oldData);
                updateUserRole(oldData.id, newData.userRole);
                resolve();
              });
            },
          }}
        />
      </Container>

      <CustomSnackBar notify={notify} setNotify={setNotify} />
    </>
  );
}
