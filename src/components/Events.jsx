import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EventCard from "./EventCard";
import { Box, Button, Stack } from "@mui/material";
import { db } from "../config/firebase";
import { getDocs, collection } from "firebase/firestore";

const Events = () => {
  const [events, setEvents] = useState([]);

  const eventsCollection = collection(db, "events");

  useEffect(() => {
    const getEvetsList = async () => {
      try {
        const data = await getDocs(eventsCollection);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setEvents(filteredData);
      } catch (err) {
        console.error(err);
      }
    };
    getEvetsList();
  }, []);

  return (
    <Stack>
      <Link className="link" to="/events/new">
        <Button variant="contained">Add New Event</Button>
      </Link>
      {events
        ?.sort((first, second) => second?.createdAt - first?.createdAt)
        ?.map((event) => (
          <Box key={event.id} sx={{ background: "whitesmoke", marginTop: 1.5 }}>
            <EventCard
              key={event.id}
              id={event.id}
              place={event.place}
              description={event.description}
              date={event.date}
              url={event.url}
            />
          </Box>
        ))}
    </Stack>
  );
};

export default Events;
