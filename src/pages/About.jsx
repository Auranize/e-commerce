import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={' US'} />
      </div>
      <div className='my-5 flex flex-col md:flex-row gap-16'>
          <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="Our Watches" />
          <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
            <p>At watchlab, we are passionate about crafting timeless, precision-engineered watches. Each piece is designed with the finest materials, ensuring unmatched quality and durability. We believe in offering more than just a timepiece – we offer a legacy of craftsmanship and elegance.</p>
            <p>Our team of skilled artisans and watchmakers pour their expertise into every watch, ensuring you wear a symbol of craftsmanship that’s both functional and beautiful. We are committed to delivering only the best for those who appreciate the art of watchmaking.</p>
            <b className='text-gray-800'>Our Mission</b>
            <p>Our mission is simple: to create watches that embody both style and functionality. We believe that a great watch should not only keep time but also make a statement. We combine tradition with innovation to deliver exceptional timepieces that stand the test of time.</p>
          </div>
      </div>
      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={' CHOOSE US'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Craftsmanship Excellence: </b>
          <p className='text-gray-500'>Our watches are meticulously crafted by master watchmakers using only the finest materials. Each timepiece is assembled with precision, ensuring it delivers impeccable performance for years to come.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Timeless Design: </b>
          <p className='text-gray-500'>We believe in creating watches that transcend trends. With a blend of classic and modern design elements, our watches are made to be timeless pieces that complement any style or occasion.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service: </b>
          <p className='text-gray-500'>Our commitment to customer satisfaction is second to none. From personalized watch recommendations to after-sales support, we’re here to ensure that your experience with us is as exceptional as the watch you choose.</p>
        </div>
      </div>

      <NewsLetterBox />
    </div>
  )
}

export default About
