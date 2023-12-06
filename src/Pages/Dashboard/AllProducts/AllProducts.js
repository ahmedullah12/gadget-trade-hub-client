import React, { useContext, useState } from "react";
import { useQuery } from "react-query";
import { AuthContext } from "../../../contexts/AuthProvider";
import { Link } from "react-router-dom";
import UpdateModal from "./UpdateModal";
import ConfirmationModal from "../../Shared/ConfirmationModal/ConfirmationModal";
import toast from "react-hot-toast";

const AllProducts = () => {
  const { user } = useContext(AuthContext);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { data: products, isLoading, refetch } = useQuery({
    queryKey: ["product", user],
    queryFn: async () => {
      const res = await fetch(
        `https://phone-seller-server2.vercel.app/products/seller?email=${user.email}`
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

  const handleDeleteProduct = (id) => {
    fetch(`https://phone-seller-server2.vercel.app/products?id=${id}`, {
      method: "DELETE",
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      if(data.deletedCount > 0){
          toast.success('Product Deleted');
          refetch();
      }
  })
  }


  if (isLoading) {
    return (
      <span className="loading loading-spinner loading-lg mx-96 my-80"></span>
    );
  }
  return (
    <div className="min-h-full ps-5 pt-2">
      <div className="overflow-x-auto me-5 mt-5">
        <table className="table pe-5 rounded-lg">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Product Name</th>
              
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {products.map((product, i) => (
              <tr key={i}>
                <th>{i + 1}</th>
                
                <td>
                  <Link
                    to={`/product/${product._id}`}
                    className="hover:underline"
                    title="Click to view product details"
                  >
                    {product.productName}
                  </Link>
                </td>
                <td>
                    <label
                        className="btn btn-xs btn-primary text-xs"
                        htmlFor="update-modal"
                        onClick={() => openUpdateModal(product)}>
                            Update
                    </label>
                </td>
                
                <td>
                    <label htmlFor="confirmation-modal"
                     className="btn btn-xs btn-error text-xs text-white"
                     onClick={() => openUpdateModal(product)}
                     >Delete</label>
                </td>
              </tr>
              
                
            
            ))} 
          </tbody>
        </table>
        {
                selectedProduct && 
                <UpdateModal
                product={selectedProduct}
                onClose={closeUpdateModal}
                ></UpdateModal>
        }
        {
            selectedProduct && 
            <ConfirmationModal
            title="Are you sure to delete this product"
            action = {handleDeleteProduct}
            actionDataId={selectedProduct._id}
            closeModal={closeUpdateModal}
            >
            
            </ConfirmationModal>
        }

      </div>
    </div>
  );
};

export default AllProducts;
