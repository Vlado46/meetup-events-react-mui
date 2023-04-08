import React from "react";
import { Link } from "react-router-dom";
import { Box, Stack, Typography } from "@mui/material";

const EventCard = ({ id, url, place, description, date }) => {
  return (
    <Link className="link" to={`/events/${id}`}>
      <Box
        direction="row"
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <img className="card-img" src={url} />
        <Stack spacing="32px" sx={{ padding: 3 }}>
          <Typography variant="h3">{place}</Typography>
          <Typography variant="p">{description}</Typography>
          <Typography variant="p">{date}</Typography>
        </Stack>
      </Box>
    </Link>
  );
};

export default EventCard;
