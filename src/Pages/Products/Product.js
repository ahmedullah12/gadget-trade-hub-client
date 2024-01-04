import React from "react";
import { Link } from "react-router-dom";
import { MdVerified } from "react-icons/md";
import { motion } from "framer-motion";

const Product = ({ product }) => {
    const {_id,productName, image, sellerName,resalePrice, post_date, sellerVerified} = product;

    const fadeIn = {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
  };
  return (
    // <div className="card bg-base-100 shadow-xl mb-4 md:mb-0">
    //   <figure className="px-10 pt-10">
    //     <img
    //       src={image}
    //       alt="Shoes"
    //       className="rounded-xl h-[250px]"
    //     />
    //   </figure>
    //   <div className="card-body">
    //     <h2 className="card-title text-center">{productName}</h2>
    //     <p>Seller: {sellerName} <span>{sellerVerified === "true" && <MdVerified style={{ color: 'blue' }} className="inline mb-1"/>}</span></p>
    //     <p>Resale Price: {resalePrice}</p>
    //     <p>Post Date: {post_date}</p>
    //     <div className="card-actions mx-auto">
    //       <Link to={`/product/${_id}`} className="btn btn-primary">See all details</Link>
    //     </div>
    //   </div>
    // </div>


<motion.div 
            initial="hidden" 
            animate="visible" 
            variants={fadeIn}
            transition={{ duration: 1 }}
            className="card bg-base-100 shadow-xl mb-4 md:mb-0"
        >
            <figure className="px-10 pt-10">
                <img
                    src={image}
                    alt="Shoes"
                    className="rounded-xl h-[250px]"
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title text-center">{productName}</h2>
                <p>Seller: {sellerName} 
                    <span>
                        {sellerVerified === "true" && <MdVerified style={{ color: 'blue' }} className="inline mb-1"/>}
                    </span>
                </p>
                <p>Resale Price: {resalePrice}</p>
                <p>Post Date: {post_date}</p>
                <div className="card-actions mx-auto">
                    <Link to={`/product/${_id}`} className="btn btn-primary">See all details</Link>
                </div>
            </div>
        </motion.div>
  );
};

export default Product;
