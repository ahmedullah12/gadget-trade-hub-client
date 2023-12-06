import React, { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";
import { useQuery } from "react-query";
import axios from "axios";
import ConfirmationModal from "../../Shared/ConfirmationModal/ConfirmationModal";
import toast from "react-hot-toast";

const MyBookings = () => {
    const {user} = useContext(AuthContext);
    const [selectedProduct, setSelectedProduct] = useState(null);

    
    const {data: bookings, isLoading, refetch} = useQuery({
      queryKey: ["bookings", user],
      queryFn: async() => {
         const res = await fetch(`https://phone-seller-server2.vercel.app/bookings?email=${user?.email}`);
         const data = await res.json();
         return data;
      }
    })

    const openUpdateModal = product => {
      setSelectedProduct(product);
    };
    const closeUpdateModal = () => {
      setSelectedProduct(null);
    };

    const handleDeleteBooking = (id) => {
      axios.delete(`https://phone-seller-server2.vercel.app/bookings/${id}`, {
        method: 'DELETE'
      })
      .then(res => {
        if(res.data.acknowledged){
          toast.success("Booking Cancelled");
          refetch();
        }
        
      })
      .catch(err => console.log(err));
    }


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
                bookings.map((booking, i) => <tr key={i} className="bg-base-200">
                <th>{i + 1}</th>
                <td>{booking.productName}</td>
                <td>
                    <label onClick={() => openUpdateModal(booking)} htmlFor="confirmation-modal" className="btn btn-xs btn-error text-white">Cancel</label>
                </td>
                <td> 
                    <button className="btn btn-xs btn-primary ">Pay</button>
                </td>
              </tr>)
            }
          </tbody>
        </table>

        {
          <ConfirmationModal
          action={handleDeleteBooking}
          actionDataId={selectedProduct?._id}
          title="Are you sure you want to cancel your booking?"
          closeModal={closeUpdateModal}
          >

          </ConfirmationModal>
        }
      </div>
    </div>
  );
};

export default MyBookings;
