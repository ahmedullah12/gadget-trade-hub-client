import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from './Product';

const Products = () => {
    const {brand} = useParams();

    const [products, setProducts] = useState(null);
    const [sortBy, setSortBy] = useState('recent');

    useEffect(() => {
        axios.get('https://phone-seller-server2.vercel.app/products').then(res => {
            const allProducts = res.data;
            const filteredProducts = allProducts.filter(prod => prod.brand === brand);
            const sortedProducts = sortProducts(filteredProducts, sortBy);

            setProducts(sortedProducts);
        })
    }, [brand, sortBy]);

    const sortProducts = (products, sortBy) => {
        // Clone the array to avoid mutating the original array
        const sortedProducts = [...products];

        // Sorting logic based on sortBy and sortOrder
        sortedProducts.sort((a, b) => {
            switch (sortBy) {
                case 'recent':
                    return new Date(b.post_date) - new Date(a.post_date);
                case 'highestPrice':
                    return parseInt(b.resalePrice, 10) - parseInt(a.resalePrice, 10);
                case 'lowestPrice':
                    return parseInt(a.resalePrice, 10) - parseInt(b.resalePrice, 10);
                default:
                    return 0;
            }
        });

        return sortedProducts;
    };


    if(!products) return null;

    
    return (
        <div className=' my-10 w-[90%] mx-auto'>
            <h2 className='text-primary text-3xl text-center my-10'>All the Products of brand {brand}</h2>
            
             {/* Sorting options */}
             <div className="mb-12 text-end">
                <label htmlFor="sortSelect" className="mr-2">Sort By:</label>
                <select
                    className="select select-bordered w-full max-w-[150px]"
                    id="sortSelect"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value="recent">Recent</option>
                    <option value="highestPrice">Highest Price</option>
                    <option value="lowestPrice">Lowest Price</option>
                </select>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-10 lg:gap-x-20'>
            {
                products.map(product => <Product key={product._id} product={product}></Product>)
            }
            </div>
        </div>
    );
};

export default Products;