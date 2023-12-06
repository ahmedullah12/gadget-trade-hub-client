import React from "react";
import { Link } from "react-router-dom";

const Category = ({category}) => {
    const {categoryName, image} = category;
  return (
    <div className="card mb-4 md:mb-0 bg-base-100 shadow-xl">
      <figure>
        <img className="h-[256px] w-full"
          src={image}
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{categoryName}</h2>
        
        <div className="card-actions justify-center">
          <Link to={`/products/${categoryName}`} className="btn btn-primary">See Products</Link>
        </div>
      </div>
    </div>
  );
};

export default Category;
