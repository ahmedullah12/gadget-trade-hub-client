import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import image1 from '../../../images/testimonial/1.jpg'
import image2 from '../../../images/testimonial/2.jpg'
import image3 from '../../../images/testimonial/3.jpg'
import image4 from '../../../images/testimonial/4.jpg'

const testimonialData = [
    {
        id: 1,
        name: 'John Doe',
        image: image1,
        testimonial: "I had a great experience with GadgetTradeHub. The process was smooth and hassle-free. Their customer support was prompt and informative."
    },
    {
        id: 2,
        name: 'Jane Smith',
        image: image2,
        testimonial: "I sold my old phone on GadgetTradeHub, and the whole transaction was straightforward. I'd definitely recommend it to others."
    },
    {
        id: 3,
        name: 'Robert Johnson',
        image: image3,
        testimonial: "Finding the perfect used laptop for my needs was a breeze on GadgetTradeHub. The variety and quality of listings are impressive."
    },
    {
        id: 4,
        name: 'Emily Brown',
        image: image4,
        testimonial: "I've been both a buyer and seller on GadgetTradeHub, and I'm always satisfied with the platform's reliability and user-friendly interface."
    }
  
];

const Testimonial = () => {
  return (
    <div className=" py-8">
        <h3 className='text-center text-3xl mb-8 font-semibold italic'>What Our Users Say</h3>
      <div className="max-w-screen-xl mx-auto px-4 md:px-12  lg:px-12">

        <Swiper
        slidesPerView={1}
          spaceBetween={30}
          centeredSlides={true}
          loop={true}
          modules={[Navigation, Pagination]}
          navigation={true}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 0,
            },
            768: {
              slidesPerView: 1,
              spaceBetween: 0,
            },
            1024: {
              slidesPerView: 1,
              spaceBetween: 0,
            },
            1200: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
          }}
          className="pb-12"
        >
          {testimonialData.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="bg-gray-100 px-6 py-9 md:py-12 lg:py-9 rounded-lg shadow-md h-48 overflow-y-auto">
                <div className="flex items-center">
                  <img style={{width: '80px', height: '80px', borderRadius: "50%"}} src={testimonial.image} alt={testimonial.name} className="ml-0 md:ml-6 mr-4" />
                  <div className=' ms-4 md:ms-5 lg:ms-8'>
                    <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                    <p className="text-gray-600 text-xs md:text-base">{testimonial.testimonial}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonial;
