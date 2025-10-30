import bannerImage from "../assets/bannerimg.png";

import { motion } from "framer-motion";

const Banner = () => {
  return (
    <div className="flex flex-col-reverse rounded md:flex-row bg-gradient-to-r from-purple-100 via-white to-purple-50 items-center min-h-screen w-full px-6 py-1">
      
      <div className="flex flex-col justify-center gap-6 md:w-1/2 w-full text-center md:text-left mt-8 md:mt-0">
        <motion.h1
          className="text-3xl sm:text-4xl lg:text-6xl font-extrabold leading-snug text-gray-800"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Discover What You Love, <br className="hidden sm:block" /> Shop With Confidence
        </motion.h1>

        <motion.p
          className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl mx-auto md:mx-0"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Find the latest trends, unbeatable prices, and trusted quality all in one place. 
          From fashion to essentials, we bring everything you need right to your doorstep.
        </motion.p>

        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.4 }}
        >
          <button className="bg-purple-400 transition-colors shadow-lg rounded-full px-5 py-2 sm:px-6 sm:py-3 text-sm sm:text-base lg:text-lg font-semibold text-white">
            Shop Now
          </button>
        </motion.div>
      </div>

      <motion.div
        className="md:w-1/2 w-full flex justify-center"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <img 
          className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl object-contain drop-shadow-xl" 
          src={bannerImage} 
          alt="Ecommerce Banner" 
        />
      </motion.div>
    </div>
  );
};

export default Banner;


