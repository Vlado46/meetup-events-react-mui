import React, { useState } from "react";
import "./App.css";
import theme from "./components/theme/theme";
import { ThemeProvider } from "@mui/material";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/RootLayout";
import ImageCarousel from "./components/ImageCarousel";
import LoginForm from "./components/LoginForm";
import Events from "./components/Events";
import EventDetail from "./components/EventDetail";
import NewEventForm from "./components/NewEventForm";
import EditEventForm from "./components/EditEventForm";

import UserCtx from "./context/UserCtx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <ImageCarousel />,
      },
      {
        path: "/events",
        element: <Events />,
      },
      {
        path: "/events/:id",
        element: <EventDetail />,
      },
      {
        path: "/events/:id/edit",
        element: <EditEventForm />,
      },
      {
        path: "/events/new",
        element: <NewEventForm />,
      },

      {
        path: "/login",
        element: <LoginForm />,
      },
    ],
  },
]);

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  return (
    <UserCtx.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </UserCtx.Provider>
  );
};

export default App;
