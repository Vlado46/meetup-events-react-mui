import React, { useContext, useEffect } from "react";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import UserCtx from "../context/UserCtx";

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(UserCtx);

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
    localStorage.clear();
    setIsLoggedIn(null);
  };

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("user"));
    if (auth) {
      setIsLoggedIn(auth);
    }
    setIsLoggedIn(auth);
  }, [auth]);

  const userEmail = isLoggedIn?.currentUser?.email;
  const user = userEmail?.split("@");

  return (
    <Container>
      <Stack direction="row" justifyContent="center" alignItems="center" p={1}>
        <Box marginRight="auto">
          <Link className="link" to="/">
            <Button>Home</Button>
          </Link>
          <Link className="link" to="/events">
            <Button>Events</Button>
          </Link>
        </Box>
        {isLoggedIn && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="p">{user[0]}</Typography>
            <Link className="link" to="/">
              <Button onClick={logout}>Logout</Button>
            </Link>
          </Box>
        )}

        {!isLoggedIn && (
          <Link className="link" to="/login">
            <Button>Login</Button>
          </Link>
        )}
      </Stack>
    </Container>
  );
};

export default Navbar;
