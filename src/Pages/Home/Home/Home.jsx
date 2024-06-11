import React from 'react';
import Banner from '../Banner/Banner';
import Features from '../Featured/Features';
import Trending from '../Trending/Trending';
import Coupons from '../Coupon/Coupons';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Features></Features>
            <Trending></Trending>
            <Coupons></Coupons>
        </div>
    );
};

export default Home;