import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useQuery } from "react-query";

const AllSeller = () => {
  
  const {data: savedSellers, isLoading, refetch} = useQuery({
    queryKey: ["sellers"],
    queryFn: async() => {
      const result = await fetch("https://phone-seller-server2.vercel.app/seller");
      const data = result.json();
      return data;
    }
  })

  const handleVerifySeller = (id, email) => {
    fetch(`https://phone-seller-server2.vercel.app/seller/verify/${id}`, {
      method: "PUT",
    })
    .then(res => res.json())
    .then(data => {
      if(data.modifiedCount > 0){
        fetch(`https://phone-seller-server2.vercel.app/seller-products/verify?email=${email}`, {
          method: "PUT"
        })
        .then(res => res.json())
        .then(data => {
          if(data.acknowledged){
            toast.success("Seller Verified Successfully");
            refetch();
          }
        })
      }
    })
  }
  if (isLoading) {
    return (
      <span className="loading loading-spinner loading-lg mx-96 my-80"></span>
    );
  }
  return (
    <div className="mx-3">
      <div className="overflow-x-auto rounded-lg">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th></th>
              
            </tr>
          </thead>
          <tbody>
            
            {
                savedSellers.map((seller, i) => <tr key={i}>
                    <th>{i+1}</th>
                    <td>{seller.name}</td>
                    <td>{seller.email}
                    </td>
                    <td>
                        {
                          seller?.verified === "true" ? <button className="btn btn-disabled btn-xs">Verified</button> :
                          <button onClick={() => handleVerifySeller(seller._id, seller.email)} className="btn btn-xs btn-success text-white">Verify</button>
                        }
                    </td>
                  </tr>)
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllSeller;
