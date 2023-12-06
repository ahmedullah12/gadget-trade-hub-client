import React, { useState } from "react";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import ConfirmationModal from "../../Shared/ConfirmationModal/ConfirmationModal";

const ReportedProducts = () => {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const {data: reportedProducts, isLoading, refetch} = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch(
        "https://phone-seller-server2.vercel.app/reports"
      );
      const data = await res.json();
      return data;
    },
  });

  const openUpdateModal = product => {
    setSelectedProduct(product);
    console.log(product)
  };
  const closeUpdateModal = () => {
    setSelectedProduct(null);
  };

  const handleDeleteProduct = (id) => {
    console.log(id)
    fetch(`https://phone-seller-server2.vercel.app/products?id=${id}`, {
      method: "DELETE",
    })
    .then(res => res.json())
    .then(data => {
     console.log(data);
      if(data.deletedCount > 0){
          fetch(`https://phone-seller-server2.vercel.app/reports?id=${id}`,{
            method: "DELETE"
          })
          .then(res => res.json())
          .then(data => {
            if(data.deletedCount > 0){
                toast.success('Product Deleted');
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
    <div>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>P Name</th>
              <th></th>
              <th>Delete Product</th>
            </tr>
          </thead>
          <tbody>
            {
                reportedProducts.map((product, i) => <tr key={i}>
                    <th>{i+1}</th>
                    <td>{product.productName}</td>
                    <td>
                        
                    </td>
                    <td>
                        <label onClick={() => openUpdateModal(product)} htmlFor="confirmation-modal" className="btn btn-xs btn-error text-white">Delete</label>
                    </td>
                  </tr>)
            }
            
            
          </tbody>
        </table>
        {
            selectedProduct && 
            <ConfirmationModal
            title="Are you sure to delete this product"
            action = {handleDeleteProduct}
            actionDataId={selectedProduct.productId}
            closeModal={closeUpdateModal}
            >
            
            </ConfirmationModal>
        }
      </div>
    </div>
  );
};

export default ReportedProducts;
