import React from "react";
import { assets, cityList } from "../assets/assets";
import { useAppContext } from "../context/Appcontext";
import {delay, motion} from 'motion/react'

const Hero = () => {
  const [pickupLocation, setPickupLocation] = React.useState("")
  const {pickupDate, setPickupDate, returnDate, setReturnDate, navigate} = useAppContext()
  const handleSearch = (e)=>{
    e.preventDefault()
    navigate('/cars?pickupLocation=' + pickupLocation + '&pickupDate=' + pickupDate + '&returnDate=' + returnDate) 
  }

  return (
    <motion.div
    initial={{y: 50, opacity: 0}}
    animate={{y:0, opacity: 1}}
    transition={{duration: 1}}
    className="relative min-h-screen flex flex-col justify-center items-center gap-14
                    bg-gradient-to-br from-[#e9f2ff] via-[#f9fbff] to-[#e0ecff] text-center overflow-hidden">

      {/* optional floating glow blobs for subtle depth */}
      <span className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-blue-400/20 blur-3xl animate-pulse" />
      <span className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-purple-400/20 blur-3xl animate-pulse" />

      <motion.h1 
      initial={{y: 50, opacity: 0}}
    animate={{y:0, opacity: 1}}
    transition={{duration: 1, delay:0.2}}
      className="text-4xl md:text-5xl font-semibold">Luxury cars on Rent</motion.h1>

      <motion.form 
      initial={{y: 50, opacity: 0 , scale:0.56}}
    animate={{y:0, opacity: 1, scale:1}}
    transition={{duration: 1, delay:0.4}}
      onSubmit={handleSearch} className="flex flex-col md:flex-row items-start md:items-center justify-between p-6
                       rounded-lg md:rounded-full w-full max-w-80 md:max-w-2xl bg-white
                       shadow-[0px_8px_20px_rgba(0,0,0,0.1)]">

        <div className="flex flex-col md:flex-row items-start md:items-center gap-10 md:ml-8">
          {/* Pickup location */}
          <div className="flex flex-col items-start gap-2">
            <select
              required
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Pickup Location</option>
              {cityList.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
            <p className="px-1 text-sm text-gray-500">
              {pickupLocation || "Please select location"}
            </p>
          </div>

          {/* Pick‑up date */}
          <div className="flex flex-col items-start gap-2">
            <label htmlFor="pickup-date">Pick‑up Date</label>
            <input
              value={pickupDate} 
              onChange={e=>setPickupDate(e.target.value)}
              type="date"
              id="pickup-date"
              min={new Date().toISOString().split("T")[0]}
              className="text-sm text-gray-500"
              required
            />
          </div>

          {/* Return date */}
          <div className="flex flex-col items-start gap-2">
            <label htmlFor="return-date">Return Date</label>
            <input
            value={returnDate} 
              onChange={e=>setReturnDate(e.target.value)}
              type="date"
              id="return-date"
              className="text-sm text-gray-500"
              required
            />
          </div>
        </div>

        {/* Search button */}
        <motion.button
        whileHover={{scale:1.05}}
        whileTap={{scale:0.95}}
          className="flex items-center justify-center gap-1 px-9 py-3 max-sm:mt-4 bg-primary
                     hover:bg-primary-dull text-white rounded-full transition-all duration-300"
        >
          <img src={assets.search_icon} alt="search" className="brightness-300" />
          Search
        </motion.button>
      </motion.form>

      <motion.img 
      initial={{y: 100, opacity: 0}}
    animate={{y:0, opacity: 1}}
    transition={{duration: 1, delay:0.7}}
      src={assets.main_car} alt="car" className="max-h-72 md:max-h-80" />
    </motion.div>
  );
};

export default Hero;
