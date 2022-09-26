import React from "react";

export default function PdfTemplete() {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          fontSize: "8px",
        }}
      >
        <h1>EduShare</h1>
        <h2>Education Report</h2>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          fontSize: "5px",
        }}
      >
        <p>Email: Edushare@gmail.com</p>
        <p> Monthly activity summary</p>
        {/* <p> Report ID: {reportID}</p>
            <p> Generated Time Period: {calTimePeriode()}</p> */}
      </div>
    </div>
  );
}
