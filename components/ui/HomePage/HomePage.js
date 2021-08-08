import React from 'react';
import Footer from '../Footer';
import Contact from './Contact';
import Banner from './Banner';
import BoardSection from './BoardSection';
import DashboardSection from './DashboardSection';
import FeaturesSection from './FeaturesSection';

const HomePage = () => {
    return (
        <>
            <Banner/>
            <FeaturesSection/>
            <BoardSection/>
            <DashboardSection/>
            <Contact/>
            <Footer/>
        </>
    );
};

export default HomePage;