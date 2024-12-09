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
            amount: '25,000ETB',
            desc: "Safety Schools (Half-Year Service)",
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
                    text: 'Basic Document Preparation Guidance (transcripts, personal statements)'
                },
                {
                    color: '#85B6FF',
                    text: 'Weekly Check-ins to keep you on track'
                },
                {
                    color: '#00FFC2',
                    text: 'Access to a Resource Library with application guides'
                },
                {
                    color: '#0074FD',
                    text: 'Visa Process Guidance for obtaining the I-20 form and SEVIS fee'
                },
                {
                    color: '#FFB0A5',
                    text: 'Personal Essay Review with basic feedback'
                },
                {
                    color: '#85B6FF',
                    text: 'College Fit Assessment to determine best-fit safety schools'
                },
                {
                    color: '#00FFC2',
                    text: 'Learning Necessary Documents (passports, transcripts, bank statements)'
                },
                {
                    color: '#0074FD',
                    text: 'Basic Financial Planning Overview of college costs'
                },
                {
                    color: '#FFB0A5',
                    text: 'Understanding Types of Scholarships and Negotiating for Aid'
                },
                {
                    color: '#85B6FF',
                    text: 'Familiarization with English Proficiency Tests (TOEFL, IELTS, Duolingo)'
                },
            ]
        },
        {
            id: '2',
            title: 'Advanced',
            amount: '45,000ETB',
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
                    text: 'Includes Safety and Target Schools'
                },
                {
                    color: '#FFB0A5',
                    text: 'Full Year Service with ongoing support'
                },
                {
                    color: '#85B6FF',
                    text: 'Priority Support for faster response times'
                },
                {
                    color: '#00FFC2',
                    text: 'Target School Research Assistance for identifying potential schools'
                },
                {
                    color: '#0074FD',
                    text: 'Extracurricular Activities Guidance to enhance your application'
                },
                {
                    color: '#FFB0A5',
                    text: 'Crafting a Powerful College Essay with in-depth assistance'
                },
                {
                    color: '#85B6FF',
                    text: 'Personal Essay Review with detailed feedback'
                },
                {
                    color: '#00FFC2',
                    text: 'Application Portal Navigation Support for effective use of university portals'
                },
                {
                    color: '#0074FD',
                    text: 'Personalized Counselor Matching with a specialist in target schools'
                },
                {
                    color: '#FFB0A5',
                    text: 'Weekly Check-ins to monitor your progress'
                },
                {
                    color: '#85B6FF',
                    text: 'Visa Process Guidance with detailed steps'
                },
                {
                    color: '#00FFC2',
                    text: 'Financial Planning Assistance to budget for college expenses'
                },
                {
                    color: '#0074FD',
                    text: 'Scholarship Exploration to identify relevant opportunities'
                },
                {
                    color: '#FFB0A5',
                    text: 'Interview Preparation with basic mock interviews'
                },
                {
                    color: '#85B6FF',
                    text: 'Understanding Types of Scholarships and Negotiating for Aid'
                },
                {
                    color: '#00FFC2',
                    text: 'Familiarization with English Proficiency Tests (TOEFL, IELTS, Duolingo)'
                },
                {
                    color: '#0074FD',
                    text: 'Guaranteed admission to atleast 3 universities'
                },
            ]
        },
        {
            id: '3',
            title: 'Premium',
            amount: 'Personalized Pricing',
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
                    text: 'Includes Safety, Target, and Reach Schools'
                },
                {
                    color: '#FFB0A5',
                    text: 'Full Year Service with comprehensive support'
                },
                {
                    color: '#85B6FF',
                    text: 'Priority Support for immediate assistance'
                },
                {
                    color: '#00FFC2',
                    text: 'SAT Prep for targeted exam preparation'
                },
                {
                    color: '#0074FD',
                    text: 'Reach School Guidance for applying to reach schools'
                },
                {
                    color: '#FFB0A5',
                    text: 'Detailed Personal Statement Review and Enhancement'
                },
                {
                    color: '#85B6FF',
                    text: 'Mock Interviews for tailored admissions preparation'
                },
                {
                    color: '#00FFC2',
                    text: 'Personalized Scholarship Search and Application Support'
                },
                {
                    color: '#0074FD',
                    text: 'Visa Process Guidance with in-depth resources'
                },
                {
                    color: '#FFB0A5',
                    text: 'Cultural Adjustment Support for transitioning to life in the U.S.'
                },
                {
                    color: '#85B6FF',
                    text: 'Post-Application Strategies for managing acceptances and waitlist situations'
                },
                {
                    color: '#00FFC2',
                    text: 'Networking Opportunities with current students and alumni'
                },
                {
                    color: '#0074FD',
                    text: 'Comprehensive College Fit Assessment including all school categories'
                },
                {
                    color: '#FFB0A5',
                    text: 'Understanding Types of Scholarships and Negotiating for Aid'
                },
                {
                    color: '#85B6FF',
                    text: 'Familiarization with English Proficiency Tests (TOEFL, IELTS, Duolingo)'
                },
                {
                    color: '#00FFC2',
                    text: 'Interview Preparation with intensive mock interviews'
                },
                {
                    color: '#0074FD',
                    text: 'Learning Necessary Documents for application readiness'
                },
                {
                    color: '#FFB0A5',
                    text: 'Guaranteed admission to atleast 5 universities'
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
                <PriceItem key={content.id} desc={content.desc} id={content.id} title={content.title} amount={content.amount} pros={content.pros} index={index}/>
            ))}
        </div>
    </div>
  )
}

export default Pricing