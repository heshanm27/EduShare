import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Chip,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  arrayUnion,
  doc,
  getDoc,
  increment,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../FireBase/Config";

export default function VolDataViewPopUp({ data, setOpen, setNotify }) {
  const navigate = useNavigate();
  const { curruntUser } = useSelector((state) => state.user);

  useEffect(() => {
    async function UpdateViewCount() {
      const docmentRef = doc(db, "VolPostResponse", data.id);
      const docmentSnap = await getDoc(docmentRef);
      if (docmentSnap.exists()) {
        await updateDoc(docmentRef, {
          postViews: increment(1),
        });
      }
    }
    UpdateViewCount();
  }, [data.id]);

  const handleNavigate = async (ViewData) => {
    navigate(`/edufeed/vonform/${ViewData.id}`, { state: ViewData });
  };
  return (
    <Container>
      <Paper>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <img
            src={data.ThumbnailUrl}
            alt="google"
            width="50%"
            loading="lazy"
          />
          <Typography sx={{ p: 1 }}>{data.details}</Typography>
          <Button variant="contained" onClick={() => handleNavigate(data)}>
            Enroll now
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}
