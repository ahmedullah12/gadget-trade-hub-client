import React from 'react';
import Categories from '../Categories/Categories';
import Banner from '../Banner/Banner';
import About from '../About/About';
import Testimonial from '../Testimonial/Testimonial';

const Home = () => {
    return (
        <div>
            
            <Banner></Banner>
            <Categories></Categories>
            <About></About>
            <Testimonial></Testimonial>
        </div>
    );
};

export default Home;