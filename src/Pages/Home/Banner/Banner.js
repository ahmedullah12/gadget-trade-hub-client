import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import './Banner.css'
import { FaLongArrowAltRight } from "react-icons/fa";
import banner1 from '../../../images/banner1.jpg';
import banner2 from '../../../images/banner2.jpg';
import banner3 from '../../../images/banner3.jpg';



const Banner = () => {
  const images = [banner1, banner2, banner3]
  
  
  return (
    <div className=" text-center flex justify-center items-center relative">
      
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true} speed={1000} modules={[Navigation, Autoplay, Pagination,]} className="">
        {
          images.map((image, i) => <SwiperSlide key={i}>
            <div className="relative">
            <div className="overlay"></div>
            <img className="h-[300px] md:h-[400px] lg:h-[600px] w-full " src={image} alt="" />
            
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
                <h1 className="text-primary text-xl md:text-2xl lg:text-4xl font-bold">Welcome to GadgetTradeHub</h1>
                <p className="mt-4 text-xs md:text-sm lg:text-base">This is a platform where you can buy second hand phones and</p>
                <p className="hidden md:block">also sell your second hand phones</p>
                <a href="#categories"><button className="btn btn-xs md:btn-md btn-outline btn-accent mt-4 md:px-4 text-[10px] md:text-[14px]">See the Categories <FaLongArrowAltRight className="text-xs md:text-3xl " /></button></a>
            </div>
            </div>

          </SwiperSlide>)
        }
      </Swiper>

    </div>
  );
};

export default Banner;
