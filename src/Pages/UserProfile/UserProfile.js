import {
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
  Tab,
  Box,
  Divider,
  CircularProgress,
  Tooltip,
  Chip,
  Skeleton,
} from "@mui/material";
import { TabList, TabContext, TabPanel } from "@mui/lab";
import { makeStyles } from "@mui/styles";
import React, { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector } from "react-redux";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../../FireBase/Config";
import DoneIcon from "@mui/icons-material/Done";
import CustomeDialog from "../../Components/CustomDialog/CustomDialog";
import ProfileUpdateForm from "../../Components/Forms/ProfileUpdateForm/ProfileUpdateForm";
import CustomSnackBar from "../../Components/CustomSnackBar/CustomSnakBar";
const useStyle = makeStyles((theme) => ({
  roots: {
    margin: "50px auto",
    background: theme.palette.background.paper,
  },
  container: {
    margin: "10px auto",
    height: "150vh",
    padding: "20px",
    backgroundColor: "white",
    color: "black",
  },
  card: {
    margin: "0 auto",
  },
  img: {
    borderRadius: "50%",
    width: "200px",
    height: "200px",
  },
  grid: {
    alignItems: "center",
  },
}));
export default function UserProfile() {
  const classes = useStyle();
  const [open, setOpen] = useState(false);
  const { curruntUser } = useSelector((state) => state.user);
  const [userData, setUserData] = useState({});
  const [value, setValue] = useState("1");
  const [loading, setLoading] = useState(null);
  // const { curruntUserId, curruntUserName } = useSelector((state) => state.user);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  //customer snackbar props
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "error",
    title: "",
  });
  useEffect(() => {
    setLoading(true);
    async function getData() {
      const snap = await getDoc(doc(db, "users", curruntUser.id));
      setLoading(false);
      setUserData(snap.data());
      console.log(snap.data());
    }

    getData();
  }, [curruntUser.id, setUserData]);
  return (
    <>
      {/* <Header /> */}
      <Container component="main" maxWidth="lg" className={classes.roots}>
        <Paper style={{ padding: "20px" }}>
          {!loading && (
            <Stack direction="row" justifyContent="end">
              .
              <IconButton
                aria-label="delete"
                size="large"
                onClick={() => {
                  setOpen((prev) => !prev);
                }}
              >
                <EditIcon fontSize="inherit" />
              </IconButton>
            </Stack>
          )}

          <Grid container>
            <Grid item xs={12}>
              <Stack
                direction="row"
                justifyContent="left"
                style={{ marginBottom: "10px" }}
              >
                {loading ? (
                  <Skeleton
                    animation="wave"
                    variant="text"
                    width={400}
                    height={40}
                  />
                ) : (
                  <Typography component="h1" variant="h3" color="primary">
                    {userData && userData.firstName + " " + userData.lastName}
                  </Typography>
                )}
              </Stack>
              <Divider style={{ width: "100%", margin: "10px" }} />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Stack direction="column" alignItems="center">
                {loading ? (
                  <Skeleton variant="circular" width={200} height={200} />
                ) : (
                  <img
                    className={classes.img}
                    src={userData && userData.img}
                    alt="logo"
                  />
                )}
              </Stack>
            </Grid>
            <Grid item xs={12} sm={9} style={{ padding: "50px" }}>
              <Stack
                direction="row"
                justifyContent="left"
                style={{ padding: "10px" }}
              >
                <Typography variant="h6" color="primary">
                  Email:
                  <Typography color="GrayText">
                    {loading ? (
                      <Skeleton
                        animation="wave"
                        variant="text"
                        width={300}
                        height={40}
                      />
                    ) : (
                      userData && userData.email
                    )}
                  </Typography>
                </Typography>
              </Stack>
              <Stack direction="row" justifyContent="left" spacing={12}>
                <Grid container style={{ padding: "10px" }} spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6" color="primary">
                      Address:
                      <Typography color="GrayText">
                        {loading ? (
                          <Skeleton
                            animation="wave"
                            variant="text"
                            width={300}
                            height={40}
                          />
                        ) : (
                          userData &&
                          userData.address +
                            " " +
                            userData.city +
                            " " +
                            userData.province
                        )}
                      </Typography>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6" color="primary">
                      Phone No
                      <Typography color="GrayText">
                        {" "}
                        {loading ? (
                          <Skeleton
                            animation="wave"
                            variant="text"
                            width={300}
                            height={40}
                          />
                        ) : (
                          userData && userData.phoneNo
                        )}
                      </Typography>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Typography variant="h6" color="primary">
                      Your intrests
                    </Typography>
                    {loading ? (
                      <Skeleton
                        animation="wave"
                        variant="text"
                        width={300}
                        height={40}
                      />
                    ) : (
                      userData &&
                      userData.intrest?.map((area) => (
                        <Chip
                          sx={{ margin: 1 }}
                          color="info"
                          key={area.id}
                          variant={"filled"}
                          icon={<DoneIcon />}
                          label={area}
                        />
                      ))
                    )}
                  </Grid>
                </Grid>
              </Stack>
            </Grid>
          </Grid>

          {/* {loading && (
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <CircularProgress />
            </Stack>
          )} */}
        </Paper>
        <CustomeDialog
          open={open}
          setOpen={setOpen}
          title="Update Your Details"
        >
          <ProfileUpdateForm setNotify={setNotify} setOpen={setOpen} />
        </CustomeDialog>
        <CustomSnackBar notify={notify} setNotify={setNotify} />
      </Container>

      <Container component="main" maxWidth="lg" className={classes.root}>
        <Box>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="Tabs example"
                textColor="primary"
                indicatorColor="primary"
                variant="standard"
                scrollButtons="auto"
              >
                <Tab iconPosition="start" label="Quotations " value="1" />
                <Tab label="Feedbacks" value="2" />
                <Tab label="Reservation History" value="3" />
              </TabList>
            </Box>
            <Paper>
              <TabPanel value="1">
                {/* <SparePartQuotationsOrder /> */}
              </TabPanel>
              <TabPanel value="2">{/* <FeedBackClient /> */}</TabPanel>
              <TabPanel value="3">{/* <ReservationClient /> */}</TabPanel>
            </Paper>
          </TabContext>
        </Box>
      </Container>
    </>
  );
}
