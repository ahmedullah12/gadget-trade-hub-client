import axios from "axios";
import React, { useEffect, useState } from "react";

const AllSeller = () => {
  const [savedBuyers, setSavedBuyers] = useState([]);

  useEffect(() => {
    axios
      .get("https://phone-seller-server2.vercel.app/buyer")
      .then((res) => {
        setSavedBuyers(res.data);
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
                savedBuyers.map((buyer, i) => <tr key={i}>
                    <th>{i+1}</th>
                    <td>{buyer.name}</td>
                    <td>
                        <button className="btn btn-xs btn-success text-white">Delete</button>
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
