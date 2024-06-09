import { createBrowserRouter } from "react-router-dom";
import Error from "../Pages/Error/Error";
import Home from "../Pages/Home/Home/Home";
import Root from "../Layout/Root/Root";
import Login from "../Authentication/Login";
import SignUp from "../Authentication/SignUp";
import DashBoard from "../Pages/Dashboard/DashBoard/DashBoard";
import AddProducts from "../Pages/Dashboard/User/AddProducts";
import MyProducts from "../Pages/Dashboard/User/MyProducts";
import Profile from "../Pages/Dashboard/Common/Profile";
import PrivateRoute from "../Providers/PrivateRoute/PrivateRoutes";
import UpdatedMyProduct from "../Pages/Dashboard/User/UpdatedMyProduct";

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
      {
        path: "/signUp",
        element:<SignUp></SignUp>
      },
    ],
  },
  {
    path:'/dashboard',
    element:<PrivateRoute><DashBoard></DashBoard></PrivateRoute>,
    errorElement: <Error></Error>,
    children:([
{
  path:'profile',
  element:<Profile></Profile>
},
{
  path:'addProduct',
  element:<AddProducts></AddProducts>
},
{
  path:'myProducts',
  element:<MyProducts></MyProducts>
},
{
  path:'updateProduct/:id',
  element:<UpdatedMyProduct></UpdatedMyProduct>,
  loader: ({ params }) =>
    fetch(
      `http://localhost:5000/productss/${params.id}`
    ),
},
    ])
  },
]);

export default router;
