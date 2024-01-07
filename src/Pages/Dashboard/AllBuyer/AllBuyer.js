import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { useQuery } from "react-query";

const AllSeller = () => {


  const {data: savedBuyers, isLoading, refetch} = useQuery({
    queryKey: ["buyer"],
    queryFn: async() => {
      const res = await axios.get("https://phone-seller-server2.vercel.app/buyer");
      const data = await res.data;
      return data;
    }
  })

  const handleDeleteUser = (email) => {
    axios.delete(`https://phone-seller-server2.vercel.app/user?email=${email}`)
    .then(res => {
      if(res.status === 200){
        toast.success(res.data.message);
        refetch();
      }
    })
    .catch(err => console.log(err));
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
              <th></th>
              
            </tr>
          </thead>
          <tbody>
            
            {
                savedBuyers.map((buyer, i) => <tr key={i}>
                    <th>{i+1}</th>
                    <td>{buyer.name}</td>
                    <td>
                        <button onClick={() => handleDeleteUser(buyer.email)} className="btn btn-xs btn-success text-white">Delete</button>
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
