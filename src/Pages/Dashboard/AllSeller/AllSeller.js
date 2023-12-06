import axios from "axios";
import React, { useEffect, useState } from "react";

const AllSeller = () => {
  const [savedSellers, setSavedSellers] = useState([]);

  useEffect(() => {
    axios
      .get("https://phone-seller-server2.vercel.app/seller")
      .then((res) => {
        setSavedSellers(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
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
                    <td>
                        <button className="btn btn-xs btn-success text-white">Verify</button>
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
