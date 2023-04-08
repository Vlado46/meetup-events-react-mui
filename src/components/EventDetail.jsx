import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Box, Button, Stack, Typography } from "@mui/material";
import { getDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import UserCtx from "../context/UserCtx";

const EventDetail = () => {
  const { id } = useParams();
  const [item, setItems] = useState();

  const { isLoggedIn } = useContext(UserCtx);

  const navigate = useNavigate();

  const docRef = doc(db, "events", id);

  useEffect(() => {
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

  const deleteEvent = async (id) => {
    const eventDoc = doc(db, "events", id);
    await deleteDoc(eventDoc);
    navigate("/events");
  };

  return (
    <Stack sx={{ justifyContent: "center", alignItems: "center" }}>
      {isLoggedIn?.currentUser?.uid === item?.userId && (
        <Box>
          <Link className="link" to="edit">
            <Button>Edit</Button>
          </Link>
          <Button onClick={() => deleteEvent(id)}>Delete</Button>
        </Box>
      )}
      <Box sx={{ width: "75%" }}>
        <Typography variant="h5" p={1}>
          {item?.place}
        </Typography>
        <img
          src={item?.url}
          style={{ width: "100%", height: "55vh", objectFit: "cover" }}
        />
        <Typography p="8px">{item?.description}</Typography>
        <Typography>{item?.date}</Typography>
      </Box>
    </Stack>
  );
};

export default EventDetail;
