import {
  Container,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
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
  onSnapshot,
  orderBy,
  query,
  startAt,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import CustomCard from "../../../Components/CustomCard/CustomCard";
import { db } from "../../../FireBase/Config";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import CustomSelect from "../../../Components/CustomSelect/CustomSelect";
import { FilterTypes } from "../../../Constants/Constants";
import CustomSkeletonCard from "../../../Components/CustomSkeletonCard/CustomSkeletonCard";
import { useNavigate } from "react-router-dom";
import CustomeDialog from "../../../Components/CustomDialog/CustomDialog";
import CustomDataViewPop from "../../../Components/CustomDataViewPop/CustomDataViewPop";
import UserNavBar from "../../../Components/UserNavBar/UserNavBar";
import { useSelector } from "react-redux";

export default function UserDonFeed() {
  const [eduPosts, setEduPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("createdAt");
  const [filterSelect, setfilterSelect] = useState("new");
  const [orderDirections, setOrderDirections] = useState("desc");
  const [seletedCardData, setSelectedCardData] = useState(null);
  const { curruntUser } = useSelector((state) => state.user);
  const theme = useTheme();
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
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
      case "lowprice":
        setfilterSelect("lowprice");
        setOrderDirections("asc");
        setFilter("courseFee");
        break;
      case "highprice":
        setfilterSelect("highprice");
        setOrderDirections("desc");
        setFilter("courseFee");
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

  useEffect(() => {
    setLoading(true);
    let q;
    if (search) {
      q = query(
        collection(db, "EduationalPost"),
        orderBy("searchTags"),
        startAt(search),
        endAt(search + "\uf8ff")
      );
    } else {
      console.log(filter, filterSelect, orderDirections);
      q = query(
        collection(db, "EduationalPost"),
        orderBy(filter, orderDirections)
      );
    }

    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
      const postData = [];
      querySnapshot.forEach(async (doc) => {
        let newPost = { ...doc.data(), id: doc.id };
        postData.push(newPost);
      });
      setEduPosts(postData);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [filter, orderDirections, search]);
  console.log(eduPosts);
  return (
    <>
      <Container maxWidth="xl" sx={{ mt: 5 }}>
        <Typography variant="h4" color={theme.palette.primary.main}>
          Donation Feed
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
                      sx={{ p: 1 }}
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
                    options={FilterTypes}
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
                    <CustomCard
                      data={item}
                      handleCardClick={() => handleCardClick(item)}
                    />
                  </Stack>
                </Grid>
              ))}
          </Grid>

          {!loading && eduPosts && eduPosts.length === 0 && (
            <Typography
              sx={{ mt: 5 }}
              variant="body2"
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
          title="Course Details"
          maxWidth="md"
        >
          <CustomDataViewPop data={seletedCardData} />
        </CustomeDialog>
      </Container>
    </>
  );
}
