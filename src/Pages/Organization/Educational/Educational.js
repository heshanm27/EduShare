import { Button, Container } from "@mui/material";
import MaterialTable from "material-table";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import CustomeDialog from "../../../Components/CustomDialog/CustomDialog";
import CustomTextField from "../../../Components/CustomTextField/CustomTextField";
import EduationalForm from "../../../Components/Forms/EducationalForm/EduationalForm";
import { MTableAction } from "material-table";
export default function OppertunitesAdmin() {
  const [open, setOpen] = useState(false);
  // const [columns, setColumns] = useState([
  //   {
  //     field: "employeeId",
  //     title: "Employee ID",
  //     editable: false,
  //     sorting: false,
  //   },
  //   {
  //     field: "employeeName",
  //     title: "EmployeeName",
  //     searchable: false,
  //     validate: (rowData) => {
  //       if (rowData.employeeName === undefined || rowData.employeeName === "") {
  //         return "Required";
  //       }
  //       return true;
  //     },
  //   },

  //   {
  //     field: "nic",
  //     title: "NIC",
  //     sorting: false,
  //     validate: (rowData) => {
  //       if (rowData.nic === undefined || rowData.nic === "") {
  //         return "Required";
  //       } else if (validateNic(rowData.nic)) {
  //         return "Enter Valid Nic";
  //       }
  //       return true;
  //     },
  //   },
  //   {
  //     field: "address",
  //     title: "Address",
  //     searchable: false,
  //     sorting: false,
  //     validate: (rowData) => {
  //       if (rowData.address === undefined || rowData.address === "") {
  //         return "Required";
  //       }
  //       return true;
  //     },
  //   },
  //   {
  //     field: "contactNo",
  //     title: "Contact No",
  //     searchable: false,
  //     sorting: false,
  //     validate: (rowData) => {
  //       if (rowData.contactNo === undefined || rowData.contactNo === "") {
  //         return "Required";
  //       } else if (validatePhoneNo(rowData.contactNo)) {
  //         return "Enter Valid Contact Number";
  //       } else {
  //         return true;
  //       }
  //     },
  //   },
  //   {
  //     field: "basicSalary",
  //     title: "Basic Salary",
  //     searchable: false,
  //     validate: (rowData) => {
  //       if (rowData.basicSalary === undefined || rowData.basicSalary === "") {
  //         return "Required";
  //       }
  //       return true;
  //     },
  //   },
  //   {
  //     field: "jobRole",
  //     title: "Job Role",
  //     lookup: jobroles,
  //     sorting: false,
  //     searchable: false,
  //     validate: (rowData) => {
  //       if (rowData.jobRole === undefined || rowData.jobRole === "") {
  //         return "Required";
  //       }
  //       return true;
  //     },
  //   },
  // ]);

  return (
    <>
      <Container maxWidth="xl">
        <MaterialTable
          title="EDUCATIONAL OPPORTUNITIES"
          options={{
            actionsColumnIndex: -1,
            addRowPosition: "first",
          }}
          localization={{ toolbar: { searchPlaceholder: "No/Brand/Year" } }}
          columns={[
            { title: "Name", field: "name" },
            { title: "Surname", field: "surname" },
            {
              title: "Birth Year",
              field: "birthYear",
              type: "numeric",
              align: "left",
            },
            {
              title: "Birth Year",
              field: "birthYear",
              type: "numeric",
              align: "left",
            },
            {
              title: "Birth Year",
              field: "birthYear",
              type: "numeric",
              align: "left",
            },
            {
              title: "Birth Place",
              field: "birthCity",
              lookup: { 34: "İstanbul", 63: "Şanlıurfa" },
            },
          ]}
          data={[
            {
              name: "Mehmet",
              surname: "Baran",
              birthYear: 1987,
              birthCity: 63,
            },
            {
              name: "Zerya Betül",
              surname: "Baran",
              birthYear: 2017,
              birthCity: 34,
            },
          ]}
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
        <EduationalForm />
      </CustomeDialog>
    </>
  );
}
