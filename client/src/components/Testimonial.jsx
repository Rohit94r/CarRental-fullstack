import React from 'react'
import Title from './Title'
import { assets } from '../assets/assets'

const Testimonial = () => {
  const testimonials = [
    {
      name: 'Emma Rodriguez',
      location: 'Barcelona, Spain',
      image: assets.testimonial_image_1,
      testimonial:
        "I've rented cars from various companies, but the experience with CarRental was exceptional.",
    },
    {
      name: 'Liam Johnson',
      location: 'New York, USA',
      image: assets.testimonial_image_2,
      testimonial:
        'I’m truly impressed by the quality and consistency. The entire process was smooth, and the results exceeded all expectations.',
    },
    {
      name: 'Sophia Lee',
      location: 'Seoul, South Korea',
      image: assets.testimonial_image_3 || assets.testimonial_image_1,
      testimonial:
        'Fantastic experience! From start to finish, the team was professional, responsive, and genuinely cared about delivering great results.',
    },
  ]

  return (
    <section className="py-28 px-6 md:px-16 lg:px-24 xl:px-44 bg-gray-50">
      <Title
        title="What Our Customers Say"
        subTitle="Discover why discerning travelers choose StayVenture for their luxury accommodations around the world."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-16">
        {testimonials.map((t, idx) => (
          <div
            key={idx}
            className="group relative rounded-xl border border-white/20 bg-white/50 backdrop-blur-lg
                       p-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:bg-white/80
                       hover:border-primary/30 shadow-md"
          >
            {/* Gradient ring on hover */}
            <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition duration-500 ring-1 ring-primary/30 pointer-events-none" />

            {/* User Info */}
            <div className="flex items-center gap-4">
              <img
                src={t.image}
                alt={t.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm transition-transform duration-300 group-hover:scale-105"
              />
              <div>
                <p className="font-semibold text-lg">{t.name}</p>
                <p className="text-sm text-gray-500">{t.location}</p>
              </div>
            </div>

            {/* Stars */}
            <div className="flex items-center gap-1 mt-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <img
                  key={i}
                  src={assets.star_icon}
                  alt="star icon"
                  className="h-4 w-4 opacity-90 group-hover:scale-110 transition-transform"
                />
              ))}
            </div>

            {/* Review Text */}
            <p className="text-gray-700 mt-4 text-[15px] leading-relaxed font-light">
              “{t.testimonial}”
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Testimonial
