import Image from 'next/image';
import React from 'react';
import banner from '../../../public/images/banner.png';

const Banner = () => {
    return (
        <div className='banner'>
            <div className='banner__text'>
                <h1>Get your work done. <br /> <span>Together.</span> </h1>
                <h4>Project Management and Collaboration made easy by <span> Henosis</span>.</h4>
                <button className='button-primary'>GET STARTED</button>
            </div>
            <div className='banner__image'>
                <Image src={banner} alt='banner' />
            </div>
        </div>
    );
};

export default Banner;