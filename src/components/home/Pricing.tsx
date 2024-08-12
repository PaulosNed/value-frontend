import React from 'react'
import PriceItem from './PriceItem';

export interface Pro {
    color: string;
    text: string;
}

const Pricing = () => {

    const CardContent = [
        {
            id: '1',
            title: 'Basic',
            amount: '24.99',
            pros: [
                {
                    color: '#85B6FF',
                    text: 'Guaranteed Admission to at least 1 University'
                },
                {
                    color: '#00FFC2',
                    text: 'Apply to 10 Universities'
                },
                {
                    color: '#0074FD',
                    text: 'Includes Safety Schools'
                },
                {
                    color: '#FFB0A5',
                    text: 'Acceptance within 2 weeks'
                }
            ]
        },
        {
            id: '2',
            title: 'Advanced',
            amount: '49.99',
            pros: [
                {
                    color: '#85B6FF',
                    text: 'Guaranteed Admission to at least 1 University'
                },
                {
                    color: '#00FFC2',
                    text: 'Apply to 10 Universities'
                },
                {
                    color: '#0074FD',
                    text: 'Includes Safety Schools'
                },
                {
                    color: '#FFB0A5',
                    text: 'Acceptance within 2 weeks'
                },
                {
                    color: '#85B6FF',
                    text: 'Full year service'
                },
                {
                    color: '#00FFC2',
                    text: 'Priority support'
                },
            ]
        },
        {
            id: '3',
            title: 'Premium',
            amount: '69.99',
            pros: [
                {
                    color: '#85B6FF',
                    text: 'Guaranteed Admission to at least 1 University'
                },
                {
                    color: '#00FFC2',
                    text: 'Apply to 10 Universities'
                },
                {
                    color: '#0074FD',
                    text: 'Includes Safety Schools'
                },
                {
                    color: '#FFB0A5',
                    text: 'Acceptance within 2 weeks'
                },
                {
                    color: '#00FFC2',
                    text: 'Full year service'
                },
                {
                    color: '#0074FD',
                    text: 'Priority support'
                },
                {
                    color: '#FFB0A5',
                    text: 'SAT Prep'
                },
                {
                    color: '#FFB0A5',
                    text: 'Acceptance within 2 weeks'
                },
            ]
        }
    ]

  return (
    <div className='flex flex-col items-center gap-5'>
        <h1 className='text-3xl font-bold'>Simple Pricing Plans For Every Budget</h1>
        <p className='text-lg font-[200]'>Straight forward and up front pricing plans designed to suit students of any size.</p>
        <div className='mt-12 flex flex-col md:flex-row justify-center gap-16'>
            {CardContent.map((content, index) => (
                <PriceItem key={content.id} id={content.id} title={content.title} amount={content.amount} pros={content.pros} index={index}/>
            ))}
        </div>
    </div>
  )
}

export default Pricing