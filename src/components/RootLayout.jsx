import React from "react";
import { Container, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const RootLayout = () => {
  return (
    <Stack>
      <Navbar />
      <Container>
        <Outlet />
      </Container>
    </Stack>
  );
};

export default RootLayout;
