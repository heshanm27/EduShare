import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import DoneIcon from "@mui/icons-material/Done";
import { useNavigate } from "react-router-dom";
import {
  calLastMonthe,
  calTimePeriode,
  dateFormatter,
  idGenarator,
  timeFormatter,
} from "../../../../utility/UtilityFuntion";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../../FireBase/Config";
import { useSelector } from "react-redux";
import * as XLSX from "xlsx";
import Logo from "../../../../Assets/images/Logo.png";
import { useReactToPrint } from "react-to-print";

const userStyle = makeStyles((theme) => ({
  roots: {
    marginTop: "50px",
    marginBottom: "50px",
    border: "1px",
    borderColor: "rgba(255,255,255,0.)",
    justifyContent: "center",
    alignContent: "center",
    display: "flex",
    textAlign: "center",
  },
  container: {
    border: "1px solid black",
  },
  box: {
    marginTop: "20px",
  },
}));
export default function EduReport() {
  const classes = userStyle();
  const theme = useTheme();
  const { curruntUser } = useSelector((state) => state.user);
  const [reportDate, setReportDate] = useState(dateFormatter(new Date()));
  const [reportTime, setReportTime] = useState(timeFormatter(new Date()));
  const [loading, setLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);
  const [data, setData] = useState([]);
  const [reportID, setreportID] = useState(idGenarator("REDU"));
  const [TotlaPostViews, setTotlaPostViews] = useState(0);
  const [TotlaPostResponses, setTotlaPostResponses] = useState(0);
  const pdfRef = useRef(null);
  const [reportData, setReportData] = useState([]);
  const navigate = useNavigate();
  const handlePrint = useReactToPrint({
    content: () => pdfRef.current,
  });

  const downloadExcel = () => {
    console.log(reportData);
    const workSheet = XLSX.utils.json_to_sheet(reportData);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "Report");
    //Buffer
    let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    //Binary string
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    //Download
    XLSX.writeFile(workBook, `${reportID}Report.xlsx`);
  };

  useEffect(() => {
    setLoading(true);
    const q = query(
      collection(db, "EduPostResponse"),
      where("postCreatedAt", ">", calLastMonthe()),
      where("postCreatedAt", "<=", new Date()),
      where("postCreatedBy", "==", curruntUser.id)
    );
    const retriveData = async () => {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        setIsEmpty(false);
      } else {
        setIsEmpty(true);
      }
      setData(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      querySnapshot.docs.forEach((doc) => {
        setTotlaPostViews((prev) => prev + doc.data().postViews);
        setTotlaPostResponses((prev) => prev + doc.data().responseCount);
        console.log(doc.data());
        setReportData((prev) => [
          ...prev,
          {
            PostID: doc.id,
            PostTitle: doc.data().postTile,
            PostViews: doc.data().postViews,
            PostResponses: doc.data().responseCount,
          },
        ]);
      });
    };
    setLoading(false);
    retriveData();
  }, []);

  return (
    <div>
      <Container maxWidth="lg" ref={pdfRef} sx={{ border: "1px solid black" }}>
        <Box className={classes.box}>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Avatar src={Logo} sx={{ width: 75, height: 75 }}></Avatar>
          </Stack>
          <Stack
            direction="column"
            justifyContent="center"
            sx={{ margin: "10px" }}
          >
            <Typography
              component="h2"
              variant="h3"
              color={theme.palette.primary.main}
              align="center"
            >
              EduShare
            </Typography>
            <Typography align="center">
              Contact:0771423837 / Email: Edushare@gmail.com
            </Typography>
            <Typography align="center">Monthly activity summary</Typography>
          </Stack>
          <Stack direction="row">
            <Grid container>
              <Grid item xs={12} sm={6}>
                <Stack
                  direction="column"
                  spacing={2}
                  justifyContent="flex-start"
                >
                  <Typography sx={{ fontSize: "16px" }} align="left">
                    {" "}
                    Generated Time Period: {calTimePeriode()}
                  </Typography>
                  <Typography sx={{ fontSize: "16px" }} align="left">
                    {" "}
                    Generated Date: {reportDate}
                  </Typography>
                </Stack>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Stack
                  direction="column"
                  spacing={2}
                  justifyContent="flex-start"
                >
                  <Typography align="right" sx={{ fontSize: "16px" }}>
                    {" "}
                    Report ID: {reportID}{" "}
                  </Typography>
                  <Typography align="right" sx={{ fontSize: "16px" }}>
                    {" "}
                    Generated Time: {reportTime}{" "}
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </Stack>
        </Box>
        <Box>
          <TableContainer sx={{ marginTop: "30px" }}>
            <Table
              sx={{ minWidth: 650, backgroundColor: "transparent" }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell align="center">Post Title</TableCell>
                  <TableCell align="center">Post Views</TableCell>
                  <TableCell align="center"> Post Responses</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading &&
                  [1, 2, 3, 4, 5, 6].map((item) => {
                    return (
                      <TableRow
                        key={item}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="right">
                          <Skeleton animation="wave" />
                        </TableCell>
                        <TableCell align="right">
                          <Skeleton animation="wave" />
                        </TableCell>
                        <TableCell align="right">
                          <Skeleton animation="wave" />
                        </TableCell>
                      </TableRow>
                    );
                  })}

                {!loading &&
                  data?.map((doc) => (
                    <TableRow
                      key={doc.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>{doc.postTile}</TableCell>
                      <TableCell align="center">{doc.postViews}</TableCell>
                      <TableCell align="center">{doc.responseCount}</TableCell>
                    </TableRow>
                  ))}

                <TableRow>
                  <TableCell rowSpan={3} />
                  <TableCell colSpan={1}> Total Post Views</TableCell>
                  <TableCell align="center">{TotlaPostViews}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell colSpan={1}>Total Post Responses</TableCell>
                  <TableCell align="center">{TotlaPostResponses}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
      <Box sx={{ margin: "20px" }}>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button
            startIcon={<DoneIcon />}
            variant="contained"
            type="submit"
            onClick={handlePrint}
          >
            Print As PDF
          </Button>
          <Button
            startIcon={<DoneIcon />}
            variant="contained"
            type="submit"
            onClick={downloadExcel}
          >
            Download Excel File
          </Button>
        </Stack>
      </Box>
    </div>
  );
}
