import React from 'react';
import ActionToCall from './ActionToCall';
import Banner from './Banner';
import BoardSection from './BoardSection';
import DashboardSection from './Dashboardsection';
import FeaturesSection from './FeaturesSection';

const HomePage = () => {
    return (
        <>
            <Banner/>
            <FeaturesSection/>
            <BoardSection/>
            <DashboardSection/>
            <ActionToCall/>
        </>
    );
};

export default HomePage;