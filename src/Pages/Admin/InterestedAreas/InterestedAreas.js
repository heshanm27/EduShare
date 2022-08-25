import { Container } from "@mui/material";
import MaterialTable from "material-table";
import React from "react";

export default function InterestedAreas() {
  const columns = [
    {
      field: "employeeId",
      title: "Employee ID",
      editable: false,
      sorting: false,
    },
    {
      field: "employeeName",
      title: "EmployeeName",
      searchable: false,
      validate: (rowData) => {
        if (rowData.employeeName === undefined || rowData.employeeName === "") {
          return "Required";
        }
        return true;
      },
    },

    {
      field: "nic",
      title: "NIC",
      sorting: false,
      validate: (rowData) => {
        if (rowData.nic === undefined || rowData.nic === "") {
          return "Required";
        }
        return true;
      },
    },
    {
      field: "address",
      title: "Address",
      searchable: false,
      sorting: false,
      validate: (rowData) => {
        if (rowData.address === undefined || rowData.address === "") {
          return "Required";
        }
        return true;
      },
    },
    {
      field: "contactNo",
      title: "Contact No",
      searchable: false,
      sorting: false,
      validate: (rowData) => {
        if (rowData.contactNo === undefined || rowData.contactNo === "") {
          return "Required";
        } else {
          return true;
        }
      },
    },
    {
      field: "basicSalary",
      title: "Basic Salary",
      searchable: false,
      validate: (rowData) => {
        if (rowData.basicSalary === undefined || rowData.basicSalary === "") {
          return "Required";
        }
        return true;
      },
    },
    {
      field: "jobRole",
      title: "Job Role",
      sorting: false,
      searchable: false,
      validate: (rowData) => {
        if (rowData.jobRole === undefined || rowData.jobRole === "") {
          return "Required";
        }
        return true;
      },
    },
  ];

  return (
    <Container maxWidth="xl">
      <MaterialTable
        title="DONATIONS"
        options={{ actionsColumnIndex: -1, addRowPosition: "first" }}
        columns={columns}
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
        actions={[
          {
            icon: "save",
            tooltip: "Save User",
            onClick: (event, rowData) => alert("You saved " + rowData.name),
          },
        ]}
      />
    </Container>
  );
}
