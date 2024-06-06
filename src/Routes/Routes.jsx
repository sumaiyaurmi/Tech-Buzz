import { createBrowserRouter } from "react-router-dom";
import Error from "../Pages/Error/Error";
import Home from "../Pages/Home/Home/Home";
import Root from "../Layout/Root/Root";
import Login from "../Authentication/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element:<Home></Home>
      },
      {
        path: "/login",
        element:<Login></Login>
      },
    ],
  },
]);

export default router;
