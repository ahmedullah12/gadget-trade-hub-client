import React from 'react';
import Categories from '../Categories/Categories';
import Banner from '../Banner/Banner';
import About from '../About/About';

const Home = () => {
    return (
        <div>
            
            <Banner></Banner>
            <Categories></Categories>
            <About></About>
        </div>
    );
};

export default Home;