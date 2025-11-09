import { createBrowserRouter } from "react-router";
import Root from "../layouts/Root";
import Home from "../pages/Home";
import LogIn from "../pages/LogIn";
import Register from "../pages/Register";
import { Component } from "react";
import AdoptShop from "../pages/AdoptShop";
import CreatePost from "../pages/CreatePost";
import Dashboard from "../pages/Dashboard";
import Orders from "../pages/Orders";
import Profile from "../pages/profile";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        path: "/profile",
        Component: Profile,
      },
      {
        index: true,
        Component: Home,
      },
      {
        path: "/login",
        Component: LogIn,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/adopt&shop",
        Component: AdoptShop,
      },
      {
        path: "/create-post",
        Component: CreatePost,
      },
      {
        path: "/dashboard",
        Component: Dashboard,
      },
      {
        path: "/orders",
        Component: Orders,
      },
    ],
  },
]);

export default router;
