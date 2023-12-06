import React from "react";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
    const {_id,productName, image, sellerName,resalePrice, post_date} = product;
  return (
    <div className="card bg-base-100 shadow-xl mb-4 md:mb-0">
      <figure className="px-10 pt-10">
        <img
          src={image}
          alt="Shoes"
          className="rounded-xl h-[250px]"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-center">{productName}</h2>
        <p>Seller: {sellerName}</p>
        <p>Resale Price: {resalePrice}</p>
        <p>Post Date: {post_date}</p>
        <div className="card-actions mx-auto">
          <Link to={`/product/${_id}`} className="btn btn-primary">See all details</Link>
        </div>
      </div>
    </div>
  );
};

export default Product;
