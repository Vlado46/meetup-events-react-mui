import React, { useContext, useState } from "react";
import { Button, Stack, TextField, FormControl } from "@mui/material";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";
import UserCtx from "../context/UserCtx";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLoggedIn } = useContext(UserCtx);

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
      alert(err.code);
      if (err) return;
    }
    alert("Successfully Logged in!");
    localStorage.setItem("user", JSON.stringify(auth));
    setIsLoggedIn(auth);
  };

  const createNewUser = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
      alert(err.code);
      if (err) return;
    }
    localStorage.setItem("user", JSON.stringify(auth));
    setIsLoggedIn(auth);
    alert("Successfully created an account!");
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
    localStorage.setItem("user", JSON.stringify(auth));
    setIsLoggedIn(auth);
    alert("Successfully signed in!");
  };

  return (
    <FormControl
      component="form"
      required={true}
      sx={{
        marginTop: "4rem",
        width: {
          xs: "80%",
          md: "50%",
          lg: "45%",
        },
      }}
    >
      <Stack
        spacing={2}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <TextField
          fullWidth
          id="email"
          label="Email"
          variant="outlined"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          id="password"
          label="Password"
          type="password"
          variant="outlined"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="outlined" fullWidth onClick={createNewUser}>
          Create New User
        </Button>
        <Button variant="outlined" fullWidth onClick={signIn}>
          Log In With Email
        </Button>
        <Button variant="outlined" fullWidth onClick={signInWithGoogle}>
          Sign In With Google
        </Button>
      </Stack>
    </FormControl>
  );
};

export default LoginForm;
