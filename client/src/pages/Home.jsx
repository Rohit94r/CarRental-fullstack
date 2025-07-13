import React from 'react'
import Hero from '../components/Hero'
import FeatureSection from '../components/FeatureSection'
import Banner from '../components/Banner'
import Testimonial from '../components/Testimonial'
import Newsletter from '../components/Newsletter'

const Home = () => {
  return (
    <main className="flex flex-col">
      <Hero />
      <FeatureSection/>
      <Banner/>
      <Testimonial/>
      <Newsletter/>
    </main>
  )
}

export default Home
