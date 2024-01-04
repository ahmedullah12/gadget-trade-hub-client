// About.js
import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import image1 from '../../images/team-members/1.jpg'
import image2 from '../../images/team-members/2.jpg'
import image3 from '../../images/team-members/3.jpg'
import image4 from '../../images/team-members/4.jpg'
import firstImage from '../../images/aboutPage.jpg'

const About = () => {

  const teamMembers = [
    {
      id: 1,
      name: "Jane Smith",
      image: image1,
      role: "Co-Founder & CEO"
    },
    {
      id: 2,
      name: "Robert Johnson",
      image: image2,
      role: "Chief Technology Officer"
    },
    {
      id: 3,
      name: "Emily Brown",
      image: image3,
      role: " Head of Customer Relations"
    },
    {
      id: 4,
      name: "David Lee",
      image: image4,
      role: "Marketing Director"
    },
  ];

  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
        controls.start("visible");
    }
}, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 10,
        stiffness: 100,
        duration: 0.5,
      },
    },
  };
  return (
    <div className="bg-gray-100  py-16">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl text-center font-semibold mb-8">About Us</h1>

        <section className="bg-gray-50 py-16">
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-semibold mb-8">Who We Are</h2>
        
        <div className="ps-1 md:ps-4  lg:ps-10 grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="ms-0 md:ms-7 lg:ms-10 md:text-left">
                <p className="text-xl text-gray-700  mb-4 mt-4 md:mt-4 lg:mt-10">
                    GadgetTradeHub is more than just a platform; it's a community of tech enthusiasts, buyers, and sellers alike. 
                </p>
                <p className="text-lg text-gray-600">
                    Founded in [Year], our journey began with a simple idea: to create a space where quality, trust, and transparency are paramount.
                </p>
            </div>
            <div className='ms-0 md:ms-10 lg:ms-20'>
                <h3 className='text-center md:text-start ms-0 md:ms-24 text-xl mb-2'>Our Team</h3>
                <img src={firstImage} alt="Our Team" className=" " style={{ width: '300px', height: '200px' }} />
            </div>
        </div>
    </div>
</section>



        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-700">
          At GadgetTradeHub, we are driven by a singular vision: to revolutionize the way people connect, trade, and upgrade their tech gadgets. In today's rapidly evolving digital landscape, staying connected isn't just a luxury—it's a necessity. Yet, the process of buying and selling second-hand gadgets often comes with its own set of challenges: trust issues, inflated prices, and a lack of transparency.
          </p>
          <p className='mt-4'>Our mission is to provide a trustworthy and user-friendly platform where individuals can seamlessly trade high-quality, pre-owned gadgets at fair prices. We believe in a circular economy where tech gadgets find new homes, prolonging their lifecycle and reducing electronic waste. By fostering a community built on trust, reliability, and transparency, we strive to make the gadget trading experience as smooth and hassle-free as possible for every user.</p>

          <p className='mt-4'>But our mission goes beyond just transactions. We are committed to empowering our users with the knowledge and resources they need to make informed decisions. Through comprehensive product listings, expert reviews, and a supportive community forum, we aim to create an ecosystem where everyone—from tech novices to enthusiasts—can find their perfect match.</p>
        </section>


        {/* Team Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4 text-center">Our Team Members</h2>
          <p className="text-gray-700 text-xl font-bold mb-4">Meet the people who make this website possible.</p>

          <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-8">
            {teamMembers.map((member) => (
              <motion.div 
                ref={ref}
                className="card card-compact shadow-xl"
                variants={containerVariants}
                initial="hidden"
                animate={controls}
                key={member.id}
              >
                <figure>
                  <img className="w-full h-[300px]" src={member.image} alt="Team Member" />
                </figure>
                <div className="card-body text-center">
                  <h2 className="text-center text-xl font-bold">{member.name}</h2>
                  <p>{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default About;
