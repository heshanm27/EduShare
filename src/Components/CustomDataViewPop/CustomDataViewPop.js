import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
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
          <Typography>{data.details}</Typography>
          <div>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography sx={{ width: "33%", flexShrink: 0 }}>
                  Course fee - :
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  {data.courseFee}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>Free</Typography>
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
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
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
