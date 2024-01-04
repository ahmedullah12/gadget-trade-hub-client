import axios from 'axios';
import React from 'react';
import Category from './Category';
import { useQuery } from 'react-query';

const Categories = () => {
    

    const {data: categories, isLoading} = useQuery({
        queryKey: ["categories"],
        queryFn: async() => {
            const res = await axios.get('https://phone-seller-server2.vercel.app/categories');
            const data = await res.data;
            return data;
        }
    })

    
    if(isLoading){
        return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
            <span className="loading loading-spinner loading-lg"></span>
        </div>
    }
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