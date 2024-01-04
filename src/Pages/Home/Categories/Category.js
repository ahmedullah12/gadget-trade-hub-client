import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Category = ({ category }) => {
    const { categoryName, image } = category;
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
                type: "spring",
                damping: 10,
                stiffness: 100,
                duration: 0.5
            }
        }
    };

    return (
        <motion.div 
            ref={ref}
            animate={controls}
            initial="hidden"
            variants={containerVariants}
            className="card mb-4 md:mb-0 bg-base-100 shadow-xl transform transition-transform duration-300 hover:shadow-xl md:hover:shadow-2xl"
        >
            <figure>
                <Link to={`/products/${categoryName}`} className="w-full">
                    <img 
                        title="Click to see the Products"
                        className="h-[256px] w-full"
                        src={image}
                        alt="Loading"
                    />
                </Link>
            </figure>
            <div className="card-body">
                <h2 className="card-title capitalize">{categoryName}</h2>
            </div>
        </motion.div>
    );
};

export default Category;
