import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from './Product';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const Products = () => {
    const { category } = useParams();
    const [productsByBrand, setProductsByBrand] = useState({});
    const [sortBy, setSortBy] = useState('recent');
    const [activeBrand, setActiveBrand] = useState(null);

    useEffect(() => {
        axios.get('https://phone-seller-server2.vercel.app/products').then(res => {
            const allProducts = res.data;
            const filteredProducts = allProducts.filter(prod => prod.category === category);
            
            const brandsSet = new Set(filteredProducts.map(product => product.brand) || []);
            const uniqueBrands = [...brandsSet];
            
            const productsByBrandObj = {};
            uniqueBrands.forEach(brand => {
                productsByBrandObj[brand] = sortProducts(filteredProducts.filter(product => product.brand === brand), sortBy);
            });
            
            setProductsByBrand(productsByBrandObj);
            setActiveBrand(uniqueBrands[0]);
        });
    }, [category, sortBy]);

    const sortProducts = (products, sortBy) => {
        const sortedProducts = [...products];
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

    if (!productsByBrand[activeBrand]) return null;

    return (
        <div className=' my-10 w-[90%] mx-auto'>
            <h2 className='text-3xl text-center my-10'>All the Products of category <span className='capitalize text-primary'>{category}</span></h2>
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
            <Tabs>
                <TabList>
                    <div className='text-center mt-5 px-4 mb-4'>
                        {Object.keys(productsByBrand).map((brand, i) => <Tab key={i} onClick={() => setActiveBrand(brand)}>{brand}</Tab>)}
                    </div>
                </TabList>
                {Object.keys(productsByBrand).map((brand, i) => (
                    <TabPanel key={i}>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-10 lg:gap-x-20'>
                            {productsByBrand[brand].map(product => <Product key={product._id} product={product} />)}
                        </div>
                    </TabPanel>
                ))}
            </Tabs>
        </div>
    );
};

export default Products;
