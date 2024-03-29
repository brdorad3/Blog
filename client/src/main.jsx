import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Create from "./create";
import LogIn from "./login";
import Write from "./write";
import Logout from "./logout";
import Details from "./details";


const UserDataContext = React.createContext();

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
    path: "/:postId",
    element: <Details/>
  },
  {
    path: "login",
    element: <LogIn />,
  },
  {
    path: "write",
    element: <Write />,
  },
  {
    path: "logout",
    element: <Logout />,
  },
]);

function Main() {
  
  const [userData, setUserData] = useState(null);
  return (
    <React.StrictMode>
      {/* Wrap the RouterProvider with UserDataContext.Provider */}
      <UserDataContext.Provider value={{ userData, setUserData }}>
        <RouterProvider router={router} />
      </UserDataContext.Provider>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Main />);
export { Main, UserDataContext };
