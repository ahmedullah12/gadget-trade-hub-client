import React, { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";
import { useQuery } from "react-query";

const MyBookings = () => {
    const {user} = useContext(AuthContext)

    
    const {data: bookings, isLoading} = useQuery({
      queryKey: ["bookings", user],
      queryFn: async() => {
         const res = await fetch(`https://phone-seller-server2.vercel.app/bookings?email=${user?.email}`);
         const data = await res.json();
         return data;
      }
    })


    if(isLoading){
      return <span className="loading loading-spinner loading-lg mx-96 my-80"></span>
    }
  return (
    <div className="min-h-full ps-5 pe-2">
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Cancel</th>
              <th>Payment</th>
            </tr>
          </thead>
          <tbody>
            {
                bookings.map((booking, i) => <tr key={booking._id} className="bg-base-200">
                <th>{i + 1}</th>
                <td>{booking.productName}</td>
                <td>
                    <button className="btn btn-xs btn-error text-white">Cancel</button>
                </td>
                <td>
                    <button className="btn btn-xs btn-primary ">Pay</button>
                </td>
              </tr>)
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBookings;
