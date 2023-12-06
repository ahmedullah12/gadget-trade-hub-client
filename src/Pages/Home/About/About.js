import React from 'react';
import about from '../../../images/about.avif';

const About = () => {
    return (
        <div className='my-10 w-[90%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10'>
            <div>
                <img className='h-[300px] md:h-[400px] lg:h-[500px] w-full' src={about} alt="" />
            </div>
            <div className=' md:mt-7 lg:mt-10 pr-10 flex items-center ms-5'>
                <div>
                <h3 className='text-xl md:text-2xl lg:text-3xl italic'>
                Welcome to Phone Seller, your premier destination for buying and selling high-quality secondhand phones! 
                </h3>
                <p className='mt-2 lg:mt-6 md:mt-4 text-sm'>
                At Phone Seller, we understand the importance of staying connected in today's fast-paced world, and we're here to make upgrading or selling your phone a seamless and rewarding experience.
                </p>
                <p className='mt-2 lg:mt-6 md:mt-4 text-sm hidden md:block '>
                We prioritize the quality of the devices listed on our platform. Each phone undergoes a thorough inspection to ensure it meets our standards for functionality and condition.
                Explore a diverse range of secondhand phones from various brands and models. Whether you're an Android enthusiast or an iPhone aficionado, we've got something for everyone.
                </p >
                </div>
            </div>
        </div>
    );
};

export default About;