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
        element: <ProdcutsDetails></ProdcutsDetails>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/productss/${params.id}`),
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
        element: <Profile></Profile>,
      },
      {
        path: "addProduct",
        element: <AddProducts></AddProducts>,
      },
      {
        path: "myProducts",
        element: <MyProducts></MyProducts>,
      },
      {
        path: "updateProduct/:id",
        element: <UpdatedMyProduct></UpdatedMyProduct>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/productss/${params.id}`),
      },
      {
        path: "modaretor-review",
        element: <ProductReview></ProductReview>,
      },
      {
        path: "modaretor-reported-contents",
        element: <Reportproducts></Reportproducts>,
      },
      {
        path: "admin-manage-users",
        element: <ManageUser></ManageUser>,
      },
      {
        path: "admin-statistics",
        element: <ManageState></ManageState>,
      },
      {
        path: "admin-manage-coupons",
        element: <ManageCoupons></ManageCoupons>,
      },
      {
        path: "updateCoupon/:id",
        element: <UpdateCoupon></UpdateCoupon>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/coupons/${params.id}`),
      },
      
    ],
  },
]);

export default router;
