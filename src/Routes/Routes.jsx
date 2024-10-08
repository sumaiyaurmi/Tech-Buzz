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
import ManageUser from "../Pages/Dashboard/Admin/ManageUser";
import ProductReview from "../Pages/Dashboard/Moderator/ProductReview";
import AllProducts from "../Pages/Home/AllProducts/AllProducts";
import ProdcutsDetails from "../Components/Home/ProdcutsDetails";
import Reportproducts from "../Pages/Dashboard/Moderator/Reportproducts";
import ManageState from "../Pages/Dashboard/Admin/ManageState";
import ManageCoupons from "../Pages/Dashboard/Admin/ManageCoupons";
import UpdateCoupon from "../Pages/Dashboard/Admin/UpdateCoupon";
import Payment from "../Pages/Dashboard/Common/Payment";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signUp",
        element: <SignUp></SignUp>,
      },
      {
        path: "/all-Products",
        element: <AllProducts></AllProducts>,
      },
      {
        path: "ProductDetails/:id",
        element: (
          <PrivateRoute>
            <ProdcutsDetails></ProdcutsDetails>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://assignment-12-server-zeta-swart.vercel.app/productss/${params.id}`
          ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashBoard></DashBoard>
      </PrivateRoute>
    ),
    errorElement: <Error></Error>,
    children: [
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile></Profile>,
          </PrivateRoute>
        ),
      },
      {
        path: "addProduct",
        element: (
          <PrivateRoute>
            <AddProducts></AddProducts>
          </PrivateRoute>
        ),
      },
      {
        path: "myProducts",
        element: (
          <PrivateRoute>
            <MyProducts></MyProducts>
          </PrivateRoute>
        ),
      },
      {
        path: "updateProduct/:id",
        element: (
          <PrivateRoute>
            <UpdatedMyProduct></UpdatedMyProduct>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://assignment-12-server-zeta-swart.vercel.app/productss/${params.id}`
          ),
      },
      {
        path: "modaretor-review",
        element: (
          <PrivateRoute>
            <ProductReview></ProductReview>
          </PrivateRoute>
        ),
      },
      {
        path: "modaretor-reported-contents",
        element: (
          <PrivateRoute>
            <Reportproducts></Reportproducts>
          </PrivateRoute>
        ),
      },
      {
        path: "admin-manage-users",
        element: (
          <PrivateRoute>
            <ManageUser></ManageUser>,
          </PrivateRoute>
        ),
      },
      {
        path: "admin-statistics",
        element: (
          <PrivateRoute>
            <ManageState></ManageState>
          </PrivateRoute>
        ),
      },
      {
        path: "admin-manage-coupons",
        element: (
          <PrivateRoute>
            <ManageCoupons></ManageCoupons>
          </PrivateRoute>
        ),
      },
      {
        path: "updateCoupon/:id",
        element: (
          <PrivateRoute>
            <UpdateCoupon></UpdateCoupon>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://assignment-12-server-zeta-swart.vercel.app/coupons/${params.id}`
          ),
      },
      {
        path: "payment",
        element: (
          <PrivateRoute>
            <Payment></Payment>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
