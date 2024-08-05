/* eslint-disable @next/next/no-img-element */
import React from 'react'
import DescriptionItems from './DescriptionItems'

const HowWeWork = () => {
  return (
    <div className='w-full flex flex-col-reverse md:flex-row md:h-[1000px]'>
        <div className='md:relative w-full md:w-8/12'>
            <img src="/images/home/ellipse.svg" alt="elipse decoration" className='hidden md:block md:absolute md:-left-1/3 md:top-0 md:h-full'/>
            <div className='md:absolute md:top-[20%] md:left-1/4 w-3/4 mx-auto md:mx-0'>
                <DescriptionItems />
            </div>
        </div>
        <div className='hidden md:flex w-4/12 md:flex-col gap-2 md:gap-0 justify-center h-full'>
            <h1 className='md:text-[80px] font-bold text-primary'>How do</h1>
            <h1 className='md:text-[80px] font-bold text-primary'>We work</h1>
        </div>
        <div className='flex md:hidden justify-center items-center mb-10'>
            <h1 className='text-2xl font-bold text-primary'>How do we work?</h1>
        </div>
    </div>
  )
}

export default HowWeWork