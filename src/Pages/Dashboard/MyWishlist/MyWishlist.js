import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useQuery } from "react-query";

const MyWishlist = () => {
  const { user } = useContext(AuthContext);
  // const [wishlist, setWishlist] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get(
  //       `https://phone-seller-server2.vercel.app/wishlist?email=${user?.email}`
  //     )
  //     .then((res) => {
  //       setWishlist(res.data);
  //     })
  //     .catch((err) => console.log(err));
  // }, [user]);

  const {data: wishlist, isLoading, refetch} = useQuery({
    queryKey: ["wishlist products"],
    queryFn: async() => {
      const res = await axios.get(`https://phone-seller-server2.vercel.app/wishlist?email=${user?.email}`);
      const data = await res.data;
      return data
    }
  })




  const handleRemoveWishProduct = (id) => {
    axios.delete(`https://phone-seller-server2.vercel.app/wishlist?productId=${id}`)
    .then(res => {
      if(res.status === 200){
        toast.success("Product removed");
        refetch();
      }
    })
  }

  const hasWished = wishlist && wishlist.length > 0;

  if(isLoading){
    return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
    <span className="loading loading-spinner loading-lg"></span>
  </div>
  }
  return (
    <div>
      <div className="overflow-x-auto">
        {
          hasWished ? (
            <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>P. Name</th>
              <th>Details</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            
            {
                wishlist.map((list, i) => <tr key={i}>
                    <th>{i+1}</th>
                    <td>{list.productName}</td>
                    <td>
                      <Link className="text-purple-500 link" to={`/product/${list.productId}`}>Details</Link>
                    </td>
                    <td>
                      <button onClick={() => handleRemoveWishProduct(list.productId)}
                        className="btn btn-xs btn-error text-white"
                      >Remove</button>
                    </td>
                    
                  </tr>)
            }
            
          </tbody>
        </table>
          ) :
          (
            <div className="text-center mt-8">
                <p className="text-lg">You haven't added any product to wishlist.</p>
            </div>
          )}
      </div>
    </div>
  );
};

export default MyWishlist;
