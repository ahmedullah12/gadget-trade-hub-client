import React from 'react';
import about from '../../../images/about.avif';

const About = () => {
    return (
        <div className='my-10 w-[90%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-0 md:gap-6 lg:gap-10'>
            <div>
                <img className='h-[300px] md:h-[400px] lg:h-[500px] w-full' src={about} alt="" />
            </div>
            <div className='mt-2 md:mt-7 lg:mt-10 pr-8 flex items-center ms-7 md:ms-2 lg:ms-5'>
                <div>
                <h3 className='text-xl md:text-2xl lg:text-3xl italic'>
                Welcome to GadgetTradeHub, your premier destination for buying and selling high-quality secondhand gadgets! 
                </h3>
                <p className='mt-2 lg:mt-6 md:mt-4 text-sm'>
                Dive into the world of top-tier secondhand tech. From smartphones to smartwatches and laptops, GadgetTradeHub is your go-to marketplace for buying and selling quality-tested gadgets.
                </p>
                <p className='mt-2 lg:mt-6 md:mt-4 text-sm hidden md:block '>
                We prioritize the quality of the devices listed on our platform. Each products undergoes a thorough inspection to ensure it meets our standards for functionality and condition.
                Explore a diverse range of secondhand phones from various brands and models. Whether you're an Phone enthusiast or a Watch aficionado, we've got something for everyone.
                </p >
                </div>
            </div>
        </div>
    );
};

export default About;