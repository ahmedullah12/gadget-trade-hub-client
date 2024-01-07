import React, { useState } from "react";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import ConfirmationModal from "../../Shared/ConfirmationModal/ConfirmationModal";
import { Link } from "react-router-dom";

const ReportedProducts = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

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
  };
  const closeUpdateModal = () => {
    setSelectedProduct(null);
  };

  // Deleting the reported Product
  const handleDeleteProduct = (id) => {
    fetch(`https://phone-seller-server2.vercel.app/products?id=${id}`, {
      method: "DELETE",
    })
    .then(res => res.json())
    .then(data => {
      if(data.deletedCount > 0){
          handleRemoveProduct(id);
      }
  })
  }

  // Removing the Product from Reported Products
  const handleRemoveProduct = (id) => {
    fetch(`https://phone-seller-server2.vercel.app/reports?id=${id}`,{
            method: "DELETE"
          })
          .then(res => res.json())
          .then(data => {
            if(data.deletedCount > 0){
                toast.success('Report Removed');
                refetch();
            }
          })
          .catch(err => console.log(err))
  }

  const hasReportedProducts = reportedProducts && reportedProducts.length > 0;

  if(isLoading){
    return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
    <span className="loading loading-spinner loading-lg"></span>
  </div>
  }
  return (
    <div>
      <div className="overflow-x-auto">
        {
          hasReportedProducts ? (
            <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>P Name</th>
              <th>Remove</th>
              <th>Delele P.</th>
            </tr>
          </thead>
          <tbody>
            {
                reportedProducts.map((product, i) => <tr key={i}>
                    <th>{i+1}</th>
                    <td>
                    <Link
                    to={`/product/${product.productId}`}
                    className="hover:underline"
                    title="Click to view product details"
                  >
                    {product.productName}
                  </Link>
                    </td>
                    <td>
                      <button onClick={() => handleRemoveProduct(product.productId)} className="btn btn-xs btn-primary">Remove</button>
                    </td>
                    <td>
                        <label onClick={() => openUpdateModal(product)} htmlFor="confirmation-modal" className="btn btn-xs btn-error text-white">Delete</label>
                    </td>
                  </tr>)
            }
            
            
          </tbody>
        </table>
          ) :
          (
            <div className="text-center mt-8">
                <p className="text-lg">There is no reported Product.</p>
            </div>
          )}
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
