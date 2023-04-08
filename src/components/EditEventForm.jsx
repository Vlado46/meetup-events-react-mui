import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import {
  Stack,
  TextField,
  Button,
  FormControl,
  Typography,
} from "@mui/material";

const EditEventForm = () => {
  const [item, setItems] = useState({});

  const { id } = useParams();

  const navigate = useNavigate();

  const eventRef = doc(db, "events", id);

  useEffect(() => {
    const docRef = doc(db, "events", id);
    const getEvent = async () => {
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setItems(docSnap.data());
        } else {
          console.log("Document does not exist");
        }
      } catch (error) {
        console.log(error);
      }
    };
    getEvent();
  }, []);

  const updateEventHandler = async () => {
    try {
      await updateDoc(eventRef, {
        place: item.place,
        description: item.description,
        date: item.date,
        url: item.url,
      });
    } catch (err) {
      console.error(err);
    }
    if (!eventRef) return;
    navigate("/events");
  };

  return (
    <>
      <Typography marginBottom={2} variant="h4">
        Edit Event
      </Typography>

      <FormControl component="form" required={true}>
        <Stack
          justifyContent="center"
          alignItems="center"
          spacing={2}
          autoComplete="off"
        >
          <TextField
            id="place"
            variant="outlined"
            value={item?.place}
            onChange={(e) => setItems({ ...item, place: e.target.value })}
          />

          <TextField
            id="description"
            variant="outlined"
            value={item?.description}
            onChange={(e) => setItems({ ...item, description: e.target.value })}
          />
          <TextField
            id="date"
            variant="outlined"
            value={item?.date}
            onChange={(e) => setItems({ ...item, date: e.target.value })}
          />
          <TextField
            id="url"
            variant="outlined"
            value={item?.url}
            onChange={(e) => setItems({ ...item, url: e.target.value })}
          />
          <Button variant="contained" fullWidth onClick={updateEventHandler}>
            Save
          </Button>
        </Stack>
      </FormControl>
    </>
  );
};

export default EditEventForm;
