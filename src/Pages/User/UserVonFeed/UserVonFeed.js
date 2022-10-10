import {
  Container,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  LinearProgress,
  Paper,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import {
  collection,
  endAt,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
  startAt,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import CustomCard from "../../../Components/CustomCard/CustomCard";
import { db } from "../../../FireBase/Config";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import CustomSelect from "../../../Components/CustomSelect/CustomSelect";
import { FilterTypes, VolunteerType } from "../../../Constants/Constants";
import CustomSkeletonCard from "../../../Components/CustomSkeletonCard/CustomSkeletonCard";
import { useLocation, useNavigate } from "react-router-dom";
import CustomeDialog from "../../../Components/CustomDialog/CustomDialog";
import CustomDataViewPop from "../../../Components/CustomDataViewPop/CustomDataViewPop";
import CustomSnackBar from "../../../Components/CustomSnackBar/CustomSnakBar";
import { useSelector } from "react-redux";
import VolunteerCard from "../../../Components/CustomCard/VolunteerCard/VolunteerCard";
import VolDataViewPopUp from "../../../Components/CustomDataViewPop/VolDataViewPopUp/VolDataViewPopUp";

export default function UserVonFeed() {
  const [eduPosts, setEduPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("createdAt");
  const [filterSelect, setfilterSelect] = useState("new");
  const [orderDirections, setOrderDirections] = useState("desc");
  const [seletedCardData, setSelectedCardData] = useState(null);
  const theme = useTheme();
  const [loadMore, setLoadMore] = useState(false);
  const [loadExtra, setLoadExtra] = useState(false);
  const [latestDoc, setLatestDoc] = useState(null);
  const [disableLoadMore, setDisableLoadMore] = useState(false);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const { curruntUser } = useSelector((state) => state.user);
  const location = useLocation();
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "error",
    title: "",
  });

  const navigate = useNavigate();

  const handleChanges = (e) => {
    const { value } = e.target;
    console.log(value);
    switch (value) {
      case "old":
        setfilterSelect("old");
        setOrderDirections("asc");
        setFilter("createdAt");
        break;
      default:
        setfilterSelect("new");
        setOrderDirections("desc");
        setFilter("createdAt");
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleCardClick = (data) => {
    setOpen(true);
    setSelectedCardData(data);
  };
  const getData = async () => {
    setLoadExtra(true);
    const q = query(
      collection(db, "VolunteerPost"),
      orderBy(filter, orderDirections),
      startAfter(latestDoc ? latestDoc : 0),
      limit(5)
    );

    const postData = [];
    const querySnapshot = await getDocs(q);
    setLatestDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
    if (querySnapshot.empty) {
      setDisableLoadMore(true);
    } else {
      setDisableLoadMore(false);
    }
    querySnapshot.forEach((doc) => {
      let newPost = { ...doc.data(), id: doc.id };
      postData.push(newPost);
    });

    const filteredData = postData.filter((post) =>
      post.intrest.some((intrest) => curruntUser.intrest.includes(intrest))
    );
    setEduPosts((prev) => [...prev, ...filteredData]);
    setLoadExtra(false);
  };

  window.onscroll = function (event) {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      setLoadMore(true);
      getData();
    }
  };
  useEffect(() => {
    if (location.state) {
      console.log(location.state);
      setNotify({
        isOpen: true,
        message: location.state.message,
        type: location.state.type,
        title: location.state.title,
      });
      window.history.replaceState({}, document.title);
    }
    setLoading(true);
    let q;
    if (search) {
      q = query(
        collection(db, "VolunteerPost"),
        orderBy("searchTags"),
        startAt(search),
        endAt(search + "\uf8ff")
      );
    } else {
      console.log(filter, filterSelect, orderDirections, curruntUser.intrest);
      q = query(
        collection(db, "VolunteerPost"),
        // where("intrest", "array-contains-any", curruntUser.intrest),
        orderBy(filter, orderDirections),
        limit(10)
      );
    }

    const getData = async (data) => {
      const postData = [];
      const querySnapshot = await getDocs(q);
      setLatestDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
      if (querySnapshot.empty) {
        setDisableLoadMore(true);
      } else {
        setDisableLoadMore(false);
      }
      querySnapshot.forEach((doc) => {
        let newPost = { ...doc.data(), id: doc.id };
        postData.push(newPost);
      });

      setEduPosts(
        postData.filter((post) =>
          post.intrest.some((intrest) => curruntUser.intrest.includes(intrest))
        )
      );
      setLoading(false);
    };

    getData();
    return () => {
      // unsubscribe();
    };
  }, [filter, orderDirections, search]);
  console.log(eduPosts);
  return (
    <>
      <Container
        maxWidth="xl"
        sx={{ mt: 5, backgroundColor: theme.palette.background.paper }}
      >
        <Typography variant="h4" color={theme.palette.primary.main}>
          Volunteer Feed
        </Typography>
        <Container maxWidth="lg">
          <Stack
            direction="column"
            sx={{
              padding: { xs: 2, sm: 5 },
            }}
          >
            <Paper
              sx={{
                padding: { xs: 2, sm: 5 },
              }}
            >
              <Grid container spacing={5}>
                <Grid item xs={12} sm={8}>
                  <FormControl
                    fullWidth
                    variant="standard"
                    sx={{
                      backgroundColor: theme.palette.background.paper,
                      borderRadius: "10px",
                    }}
                  >
                    <InputLabel
                      htmlFor="standard-adornment-search"
                      sx={{ p: 1 }}
                    >
                      Search
                    </InputLabel>
                    <Input
                      id="standard-adornment-search"
                      placeholder="Search by Title"
                      value={search}
                      onChange={handleSearch}
                      endAdornment={
                        <InputAdornment position="end">
                          <Tooltip title="Search">
                            <IconButton
                              aria-label="search function"
                              onClick={() => {
                                setSearch("");
                              }}
                            >
                              {search.length === 0 ? (
                                <SearchIcon />
                              ) : (
                                <CloseIcon />
                              )}
                            </IconButton>
                          </Tooltip>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <CustomSelect
                    handleChanges={handleChanges}
                    label="Filter By"
                    value={filterSelect}
                    name="filter"
                    width="100%"
                    options={VolunteerType}
                    variant="standard"
                  />
                </Grid>
              </Grid>
            </Paper>
          </Stack>
        </Container>

        <Paper sx={{ mt: 5, mb: 5 }} elevation={3}>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ p: 5 }}
          >
            {eduPosts &&
              eduPosts.map((item, index) => (
                <Grid
                  item
                  sm={12}
                  md={4}
                  key={index}
                  sx={{ mt: { xs: 5, sm: 5 } }}
                >
                  <Stack justifyContent="center" alignItems="center">
                    <VolunteerCard
                      data={item}
                      handleCardClick={() => handleCardClick(item)}
                    />
                  </Stack>
                </Grid>
              ))}

            <Grid item xs={12} sx={{ mt: 2 }}>
              {loadExtra && <LinearProgress color="primary" />}
            </Grid>
          </Grid>

          {!loading && eduPosts && eduPosts.length === 0 && (
            <Typography
              sx={{ mb: 5, p: 5 }}
              variant="h5"
              align="center"
              color="info"
            >
              No data to show{" "}
            </Typography>
          )}

          {loading && (
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              sx={{ p: 5 }}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => (
                <Grid
                  item
                  sm={12}
                  md={4}
                  key={index}
                  sx={{ mt: { xs: 5, sm: 5 } }}
                >
                  <Stack justifyContent="center" alignItems="center">
                    <CustomSkeletonCard />
                  </Stack>
                </Grid>
              ))}
            </Grid>
          )}
        </Paper>
        <CustomeDialog
          open={open}
          setOpen={setOpen}
          title="Post  Details"
          maxWidth="md"
        >
          <VolDataViewPopUp
            data={seletedCardData}
            setOpen={setOpen}
            setNotify={setNotify}
          />
        </CustomeDialog>
        <CustomSnackBar notify={notify} setNotify={setNotify} />
      </Container>
    </>
  );
}
