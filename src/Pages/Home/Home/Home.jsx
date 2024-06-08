import React from 'react';
import Banner from '../Banner/Banner';
import Features from '../Featured/Features';
import Trending from '../Trending/Trending';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Features></Features>
            <Trending></Trending>
        </div>
    );
};

export default Home;