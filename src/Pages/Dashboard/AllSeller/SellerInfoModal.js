import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SellerInfoModal = ({sellerInfo, sellerProducts}) => {


  const [isOpen, setIsOpen] = useState(false); // State to manage modal visibility

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Modal Toggle */}
      <input type="checkbox" id="sellerInfo-modal" className="modal-toggle" checked={isOpen} onChange={toggleModal} />
      {/* Modal Content */}
      {isOpen && (
        <div className="modal w-auto max-w-none">
          <div className="modal-box">
            <form method="dialog">
              {/* Close Button */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={toggleModal}>✕</button>
            </form>
            {/* Modal Content */}
            <h3 className="font-bold text-lg">{sellerInfo.name}</h3>
            <h3 className="font-bold text-base mb-4">{sellerInfo.email}</h3>

            <p className='font-bold'>Product List:</p>
            {   
                sellerProducts.length > 0 ? (
                    sellerProducts.map(product => 
                    <Link className='block link' to={`/product/${product._id}`} key={product._id}>
                        {product.productName}
                    </Link>
                    )
                ) : (
                    <p>Haven't added any product.</p>
                )
            }
          </div>
        </div>
      )}
    </>
  );
};

export default SellerInfoModal;
