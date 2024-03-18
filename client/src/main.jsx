import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Create from "./create"
import LogIn from "./login"


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
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
