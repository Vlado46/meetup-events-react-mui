import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../config/firebase";
import { serverTimestamp } from "firebase/firestore";
import {
  Stack,
  TextField,
  Button,
  FormControl,
  Typography,
} from "@mui/material";
import { addDoc, collection } from "firebase/firestore";

const NewEventForm = () => {
  const [newEvent, setNewEvent] = useState({});

  const navigate = useNavigate();

  const eventsRef = collection(db, "events");

  const saveEventHandler = async () => {
    try {
      await addDoc(eventsRef, {
        place: newEvent.place,
        description: newEvent.description,
        date: newEvent.date,
        url: newEvent.url,
        userId: auth?.currentUser?.uid,
        createdAt: serverTimestamp(),
      });
    } catch (err) {
      console.error(err);
    }
    if (!eventsRef) return;
    navigate("/events");
  };

  return (
    <Stack justifyContent="center" alignItems="center" spacing={2}>
      <Typography variant="h4">Add New Event</Typography>
      <FormControl component="form" required={true}>
        <Stack spacing={1.5}>
          <TextField
            id="place"
            label="Place"
            variant="outlined"
            required={true}
            onChange={(e) =>
              setNewEvent({ ...newEvent, place: e.target.value })
            }
          />
          <TextField
            id="description"
            label="Description"
            variant="outlined"
            required={true}
            onChange={(e) =>
              setNewEvent({ ...newEvent, description: e.target.value })
            }
          />
          <TextField
            id="date"
            label="Date"
            variant="outlined"
            required={true}
            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
          />
          <TextField
            id="url"
            label="Url"
            variant="outlined"
            required={true}
            onChange={(e) => setNewEvent({ ...newEvent, url: e.target.value })}
          />
          <Button
            variant="contained"
            onClick={saveEventHandler}
            disabled={
              !newEvent.place ||
              !newEvent.description ||
              !newEvent.date ||
              !newEvent.url
                ? true
                : false
            }
          >
            Save
          </Button>
        </Stack>
      </FormControl>
    </Stack>
  );
};

export default NewEventForm;
