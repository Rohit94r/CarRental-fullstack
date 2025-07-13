import React from 'react'
import { assets } from '../assets/assets'

const Banner = () => {
  return (
    <section className="px-4 md:px-8 pt-10">
      <div className="flex flex-col md:flex-row items-center md:items-start justify-between
                      bg-gradient-to-r from-[#0558FE] to-[#A9CFFF]
                      max-w-6xl mx-auto rounded-2xl overflow-hidden px-6 md:px-14 py-10 relative">

        {/* ─── Left Content ─── */}
        <div className="text-white max-w-xl">
          <h2 className="text-3xl md:text-4xl font-semibold leading-tight">
            Do You Own a Luxury Car?
          </h2>
          <p className="mt-3 text-sm md:text-base">
            Monetize your vehicle effortlessly by listing it on <span className="font-semibold">CarRental</span>.
          </p>
          <p className="mt-2 text-sm md:text-base leading-relaxed">
            We take care of <span className="underline">insurance</span>, driver verification, and secure payments — so you can earn
            passive income, stress-free.
          </p>

          <button
            className="mt-6 px-6 py-2 bg-white text-primary rounded-lg text-sm font-medium
                       hover:bg-slate-100 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            List Your Car
          </button>
        </div>

        {/* ─── Right Image ─── */}
        <div className="mt-8 md:mt-0">
          <img
            src={assets.banner_car_image}
            alt="Luxury Car"
            className="w-full max-w-sm md:max-w-md hover:scale-127 transition-transform duration-900"
          />
        </div>
      </div>
    </section>
  )
}

export default Banner
