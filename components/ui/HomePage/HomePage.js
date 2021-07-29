import React from 'react';
import Footer from '../Footer';
import ActionToCall from './ActionToCall';
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
            <ActionToCall/>
            <Footer/>
        </>
    );
};

export default HomePage;