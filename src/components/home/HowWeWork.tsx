/* eslint-disable @next/next/no-img-element */
import React from 'react'
import DescriptionItems from './DescriptionItems'

const HowWeWork = () => {
  return (
    <div className='w-full flex h-[1000px]'>
        <div className='relative w-8/12'>
            <img src="/images/home/ellipse.svg" alt="elipse decoration" className='absolute -left-1/3 top-0 h-full'/>
            <div className='absolute top-[20%] left-1/4 w-3/4'>
                <DescriptionItems />
            </div>
        </div>
        <div className='w-4/12 flex flex-col justify-center h-full'>
            <h1 className='text-[80px] font-bold text-primary'>How do</h1>
            <h1 className='text-[80px] font-bold text-primary'>we work</h1>
        </div>
    </div>
  )
}

export default HowWeWork