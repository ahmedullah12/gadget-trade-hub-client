import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Category from './Category';

const Categories = () => {
    const [categories, setCategories] = useState(null);

    useEffect(() => {
        axios.get('https://phone-seller-server2.vercel.app/categories').then((response) => {
            setCategories(response.data)
        })
    }, [])

    if (!categories) return null;
    return (
        <div id='categories' className=' mt-10 w-[90%] mx-auto'>
            <h2 className='text-3xl text-center my-3'>Categories</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-20'>
            {
                categories.map(category => <Category category={category} key={category._id}></Category>)

            }
            </div>
        </div>
    );
};

export default Categories;