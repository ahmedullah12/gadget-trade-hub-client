import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home/Home";
import Products from "../Pages/Products/Products";
import ProductDetails from "../Pages/ProductDetails/ProductDetails";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import DashboardLayout from "../Layout/DashboardLayout";
import AddProduct from "../Pages/Dashboard/AddProduct/AddProduct";
import AllProducts from "../Pages/Dashboard/AllProducts/AllProducts";
import MyBookings from "../Pages/Dashboard/MyBookings/MyBookings";
import PrivateRoute from "./PrivateRoute";
import MyWishlist from "../Pages/Dashboard/MyWishlist/MyWishlist";
import AllUser from "../Pages/Dashboard/AllUser/AllUser";

const router = createBrowserRouter([
    {
        path: '',
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/products/:brand',
                element: <Products></Products>
            },
            {
                path: '/product/:id',
                loader: ({params}) => fetch(`https://phone-seller-server2.vercel.app/products/${params.id}`),
                element: <PrivateRoute><ProductDetails></ProductDetails></PrivateRoute>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            },
        ]
    },
    {
        path: '/dashboard',
        element: <DashboardLayout></DashboardLayout>,
        children: [
            {
                path: '/dashboard/allproducts',
                element: <AllProducts></AllProducts>
            },
            {
                path: '/dashboard/addproduct',
                element: <AddProduct></AddProduct>
            },
            {
                path: '/dashboard/mybookings',
                element: <MyBookings></MyBookings>
            },
            {
                path: '/dashboard/mywishlist',
                element: <MyWishlist></MyWishlist>
            },
            {
                path: '/dashboard/alluser',
                element: <AllUser></AllUser>
            },
        ]
    }
])

export default router;