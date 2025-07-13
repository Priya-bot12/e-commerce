import React from 'react'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import NewsLetterBox from '../components/NewsLetterBox'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>Forever was born out of a passion for innovation and a desire to revolutionize.
            Forever was born out of a passion for innovation and a desire to revolutionize the way people experience everyday essentials. 
            With a focus on quality, sustainability, and modern design, we aim to bridge the gap between style and functionality in every product we offer.
          </p>
          <p>Since our inception, we've worked tirelessly to curate a diverse selection.
            Since our inception, we've worked tirelessly to curate a diverse selection of items that meet the evolving needs of our customers. 
            Whether it's through thoughtful design, ethically sourced materials, or community-driven initiatives, every step we take is rooted in a deep commitment to excellence.
          </p>
          <b className='text-gray-800'>Our Mission</b>
          <p> Our mission at Forever is to empower customers with choice, convenience, and confidence. 
          We strive to create meaningful experiences by providing reliable products, transparent practices, and exceptional service that inspires trust and long-term relationships.</p>
        </div>
      </div>

      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>

        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>
            We meticulously select and vet each product to ensure it meets the highest standards of quality, durability, and performance. Your satisfaction and trust are our top priorities.
          </p>
        </div>

        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p className='text-gray-600'>
            With our user-friendly interface and hassle-free processes, we make shopping easy and enjoyable. From browsing to checkout, your experience is designed to be smooth and seamless.
          </p>
        </div>

        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>
            Our team of dedicated professionals is here to assist you at every step. Whether you have a question or need help with an order, we’re committed to providing timely and thoughtful support.
          </p>
        </div>

      </div>

      <NewsLetterBox/>


    </div>
  )
}

export default About
