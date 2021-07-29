import Image from 'next/image';
import React from 'react';
import board from '../../../public/images/board.png';

const FeaturesSection = () => {
    return (
        <div className='features'>
            <div className='features__text'>
                <h1>It’s more than work. It’s a way of working <span>together</span> .</h1>
                <h4>Start with a <span>Henosis </span> board. Customize and expand with more features as <br /> your teamwork grows. Manage projects, organize tasks, and build <br />  team spirit—all in one place.</h4>
            </div>
            <div className='features__image'>
                <Image src={board} alt='board' />
            </div>
        </div>
    );
};

export default FeaturesSection;