import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import SellerInfoModal from "./SellerInfoModal";

const AllSeller = () => {
  const [sellerProducts, setSellerProducts] = useState([]);
  const [selectedSeller, setSelectedSeller] = useState({
    email: null,
    name: null,
  })
  
  
  const {data: savedSellers, isLoading, refetch} = useQuery({
    queryKey: ["sellers"],
    queryFn: async() => {
      const result = await fetch("https://phone-seller-server2.vercel.app/seller");
      const data = result.json();
      return data;
    }
  });

  const loadSellerData = async (email, name) => {
    setSelectedSeller({
      email: email,
      name: name,
    })
    try {
      const res = await axios.get(`https://phone-seller-server2.vercel.app/products/seller?email=${email}`);
      setSellerProducts(res.data);
    } catch (error) {
      console.log("Error fetching seller products:", error);
    }
  }



  const handleVerifySeller = (id) => {
    fetch(`https://phone-seller-server2.vercel.app/seller/verify/${id}`, {
      method: "PUT",
    })
    .then(res => res.json())
    .then(data => {
      if(data.modifiedCount > 0){
            toast.success("Seller Verified Successfully");
            refetch();
      }
    })
  }
  if(isLoading){
    return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
    <span className="loading loading-spinner loading-lg"></span>
  </div>
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
              
              
            </tr>
          </thead>
          <tbody>
            
            {
                savedSellers.map((seller, i) => <tr key={i}>
                    <th>{i+1}</th>
                    <td className="link">
                      <label onClick={() => loadSellerData(seller.email, seller.name)} htmlFor="sellerInfo-modal">{seller.name}</label>
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
        <SellerInfoModal sellerInfo={selectedSeller} sellerProducts={sellerProducts}></SellerInfoModal>
      </div>
    </div>
  );
};

export default AllSeller;
