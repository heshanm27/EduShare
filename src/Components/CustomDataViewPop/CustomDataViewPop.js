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
import React from "react";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
export default function CustomDataViewPop({ data }) {
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
          <Button>Enroll now</Button>
        </Stack>
      </Paper>
    </Container>
  );
}
