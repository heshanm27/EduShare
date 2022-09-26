import { Container } from "@mui/material";
import MaterialTable from "material-table";
import React from "react";

export default function CustomResponsDataView({ data }) {
  const columns = [
    { title: "Applicant Name", field: "name" },
    { title: "Applicant  Email", field: "email" },
    { title: "Applicant  Phone No", field: "phoneNo" },
    { title: "Education Level", field: "educationLevel", searchable: false },
  ];

  return (
    <>
      <Container maxWidth="xl">
        <MaterialTable
          options={{
            actionsColumnIndex: -1,
            addRowPosition: "first",
            showTitle: false,
          }}
          localization={{ toolbar: false }}
          columns={columns}
          data={data}
        />
      </Container>
    </>
  );
}
