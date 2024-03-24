import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Create from "./create"
import LogIn from "./login"
import Write from "./write"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "create",
    element: <Create />,
  },
  {
    path: "login",
    element: <LogIn />,
  },
  {
    path: "write",
    element: <Write />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
