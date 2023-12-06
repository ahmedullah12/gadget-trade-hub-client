import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import { useQuery } from "react-query";
import { AuthContext } from "../contexts/AuthProvider";
import { CiCirclePlus } from "react-icons/ci";

const DashboardLayout = () => {
  const {user} = useContext(AuthContext)

  const {data: savedUser = [], isLoading} = useQuery({
    queryKey: ["user",user],
    queryFn: async() => {
      const res = await fetch(`https://phone-seller-server2.vercel.app/user?email=${user?.email}`);
      const data = await res.json();
      return data;
    }
  });


  if(isLoading){
    return <span className="loading loading-spinner loading-lg mx-96 my-80"></span>
  }
  return (
    <div>
      <label
            htmlFor="my-drawer-2"
            className=" drawer-button absolute right-4 mt-4 top-[80%] lg:hidden"
          >
            <CiCirclePlus className="text-3xl text-primary" />
          </label>
      <Navbar></Navbar>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content ">
          <Outlet></Outlet>

          
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            {
              savedUser?.role === "seller" ? 
             <>
               <li>
                <Link to="/dashboard/allproducts">All Products</Link>
              </li>
              <li>
                <Link to="/dashboard/addproduct">Add a Product</Link>
              </li>
             </>
              :
              savedUser?.role === "buyer" ? 
              <>
                <li>
                  <Link to="/dashboard/mybookings">My Bookings</Link>
                </li>
                <li>
                  <Link to="/dashboard/mywishlist">My Wishlist</Link>
                </li>
              </>
              :
              <>
                <li>
                  <Link to="/dashboard/allseller">All Seller</Link>
                </li>
                <li>
                  <Link to="/dashboard/allbuyer">All Buyer</Link>
                </li>
                <li>
                  <Link to="/dashboard/allreports">All Reported Products</Link>
                </li>
              </>
            }
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
