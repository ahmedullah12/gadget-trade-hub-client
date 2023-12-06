import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";
import axios from "axios";

const MyWishlist = () => {
  const { user } = useContext(AuthContext);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://phone-seller-server2.vercel.app/wishlist?email=${user?.email}`
      )
      .then((res) => {
        setWishlist(res.data);
      })
      .catch((err) => console.log(err));
  }, [user]);
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Product Name</th>
              
            </tr>
          </thead>
          <tbody>
            
            {
                wishlist.map((list, i) => <tr key={i}>
                    <th>{i+1}</th>
                    <td>{list.productName}</td>
                    
                  </tr>)
            }
            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyWishlist;
