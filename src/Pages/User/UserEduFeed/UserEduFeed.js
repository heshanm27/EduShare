import {
  Box,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { collection, onSnapshot, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import CustomCard from "../../../Components/CustomCard/CustomCard";
import { db } from "../../../FireBase/Config";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import CustomSelect from "../../../Components/CustomSelect/CustomSelect";
import { FilterTypes } from "../../../Constants/Constants";
import CustomSkeletonCard from "../../../Components/CustomSkeletonCard/CustomSkeletonCard";

export default function UserEduFeed() {
  const [eduPosts, setEduPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("");
  const theme = useTheme();
  const [search, setSearch] = useState("");

  const handleChanges = (e) => {
    const { value } = e.target;
    setFilter(value);
  };

  useEffect(() => {
    setLoading(true);
    const q = query(collection(db, "EduationalPost"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const postData = [];
      querySnapshot.forEach((doc) => {
        postData.push({ ...doc.data(), id: doc.id });
      });
      setEduPosts(postData);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <>
      <Container maxWidth="xl">
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
                      Search User
                    </InputLabel>
                    <Input
                      sx={{ p: 1 }}
                      id="standard-adornment-search"
                      placeholder="Search by Title"
                      value={search}
                      onChange={(e) => {
                        setSearch(e.target.value);
                      }}
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
                    label="Province"
                    value={filter}
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
                    <CustomCard />
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
      </Container>
    </>
  );
}
