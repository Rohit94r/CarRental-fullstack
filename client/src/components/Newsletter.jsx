import React from 'react';
import { motion } from 'framer-motion';

const Newsletter = () => {
  return (
    <div className="relative flex flex-col items-center justify-center text-center space-y-4 px-4 my-20 mb-40 overflow-hidden">
      
      {/* Background Glow Circle (Animated) */}
      <motion.div
        className="absolute z-[-1] w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        style={{ top: '-6rem' }}
      />

      {/* Title */}
      <motion.h1
        className="text-3xl md:text-5xl font-bold text-gray-800"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        whileHover={{ scale: 1.05 }}
      >
        Never Miss a Deal!
      </motion.h1>

      {/* Description */}
      <motion.p
        className="text-gray-500 text-sm md:text-lg max-w-xl"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Subscribe to get the latest offers, new arrivals, and exclusive discounts.
      </motion.p>

      {/* Form */}
      <motion.form
        onSubmit={(e) => e.preventDefault()}
        className="relative flex items-center justify-between w-full max-w-2xl mt-6 bg-white rounded-full shadow-xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-500"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <input
          type="email"
          required
          placeholder="Enter your email"
          className="flex-1 px-6 py-3 md:py-4 text-sm md:text-base text-gray-700 placeholder-gray-400 bg-transparent outline-none"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm md:text-base font-semibold px-6 md:px-10 py-3 md:py-4 transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg rounded-full rounded-l-none"
        >
          Subscribe
        </button>
      </motion.form>
    </div>
  );
};

export default Newsletter;
