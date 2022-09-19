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
import { db } from "../../FireBase/Config";

export default function CustomDataViewPop({ data, setOpen, setNotify }) {
  const navigate = useNavigate();
  const { curruntUser } = useSelector((state) => state.user);

  useEffect(() => {
    async function UpdateViewCount() {
      const docmentRef = doc(db, "EduPostResponse", data.id);
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
    if (curruntUser) {
      const docRef = doc(db, "EduPostResponse", ViewData.id);
      const docSnap = await getDoc(docRef);
      console.log();
      if (docSnap.exists()) {
        if (!docSnap.data().ApplyedUserID.includes(curruntUser.id)) {
          const response = {
            name: curruntUser.name,
            email: curruntUser.email,
            phoneNo: curruntUser.phoneNo,
            date: Timestamp.fromDate(new Date()),
            educationLevel: curruntUser.educationLevel,
            userId: curruntUser.id,
          };
          try {
            await updateDoc(docRef, {
              ApplyedUserID: arrayUnion(curruntUser.id),
              responseCount: increment(1),
              postresponses: arrayUnion(response),
            });
            setOpen(false);
            setNotify({
              isOpen: true,
              message: "Applied Successfully",
              type: "success",
              title: "Success",
            });
          } catch (err) {
            console.log(err);
            setNotify({
              isOpen: true,
              message: "Something went wrong",
              type: "error",
              title: "Error",
            });
          }
        } else {
          setOpen(false);
          setNotify({
            isOpen: true,
            message: "You have already applied",
            type: "warning",
            title: "Warning",
          });
        }
      } else {
        const response = {
          postTile: ViewData.title,
          postClosingDate: ViewData.closingDate,
          postFee: ViewData.courseFee,
          postCreatedAt: ViewData.createdAt,
          responseCount: 1,
          postCreatedBy: ViewData.createdBy.id,
          postViews: 1,
          postresponses: [
            {
              name: curruntUser.name,
              email: curruntUser.email,
              phoneNo: curruntUser.phoneNo,
              date: Timestamp.fromDate(new Date()),
              educationLevel: curruntUser.educationLevel,
              userId: curruntUser.id,
            },
          ],
          ApplyedUserID: [curruntUser.id],
        };
        try {
          await setDoc(doc(db, "EduPostResponse", ViewData.id), response);
          setOpen(false);
          setNotify({
            isOpen: true,
            message: "Applied Successfully",
            type: "success",
            title: "Success",
          });
        } catch (err) {
          setOpen(false);
          setNotify({
            isOpen: true,
            message: "Something went wrong",
            type: "error",
            title: "Error",
          });
        }
      }
    }
    // navigate(`/edufeed/eduform/${ViewData.id}`, { state: ViewData });
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
          <div>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography
                  display="inline"
                  sx={{ width: "33%", flexShrink: 0 }}
                >
                  {" "}
                  Course fee - :
                </Typography>
                {data &&
                  (data.courseFee === 0 ? (
                    <Chip
                      label="  Free Of Charge"
                      color="success"
                      variant="filled"
                    />
                  ) : (
                    <Typography
                      align="right"
                      display="inline"
                      sx={{ color: "text.secondary" }}
                    >
                      {data.courseFee + " LKR"}
                    </Typography>
                  ))}
              </AccordionSummary>
              <AccordionDetails>
                {
                  <Typography>
                    {data && data.courseFee === 0
                      ? `This course will provide by us for free of charge`
                      : ` For 6 monthes we charge ${data.courseFee} LKR as course fee `}
                  </Typography>
                }

                {data.courseFee === 0 ? (
                  ""
                ) : (
                  <Typography variant="caption" color="GrayText">
                    TAX&VAT Applyed
                  </Typography>
                )}
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography sx={{ width: "33%", flexShrink: 0 }}>
                  Course Duration
                </Typography>
                <Typography align="right" sx={{ color: "text.secondary" }}>
                  6 months
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ width: { md: "750px", sm: "100%" } }}>
                  This course content will be complete within 6 months
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
          <Button variant="contained" onClick={() => handleNavigate(data)}>
            Enroll now
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}
