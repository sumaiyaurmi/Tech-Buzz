import { useContext, useEffect, useState } from "react";
import SectionTitle from "../../../Components/SEctionTitle";
import { AuthContext } from "../../../Providers/AuthProvider/AuthProvider";
import useAxiosPublic from "../../../UseHooks/UseAxiosPublic";
import { useNavigate } from "react-router-dom";
import { MdWhereToVote } from "react-icons/md";


// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';


// import required modules
import { EffectCoverflow, Pagination } from 'swiper/modules';
import TrendingCard from "./TrendingCard";
import { useQuery } from "@tanstack/react-query";

const Trending = () => {

    const axiosPublic = useAxiosPublic();
  

    const { refetch,data: products = [] } = useQuery({
      queryKey: ['trendingProdutcs'],
      queryFn: async () => {
        const res = await axiosPublic.get(`/trendingsProducts`);
        return res.data;
      },
    });
   
    

    return (
        <div className="my-6 space-y-4 pb-4">
        <SectionTitle
          heading={"Tech Buzz Spotligh"}
          subHeading={"Unveiling the Hottest Tech Products of the Moment"}
        ></SectionTitle>
        
        <div className="  py-10 ">
        <Swiper
     effect={'coverflow'}
     grabCursor={true}
     centeredSlides={true}
     slidesPerView={3}
     coverflowEffect={{
       rotate: 50,
       stretch: 0,
       depth: 100,
       modifier: 1,
       slideShadows: true,
     }}
     pagination={true}
     modules={[EffectCoverflow, Pagination]}
     className="mySwiper"
      >
        
        {products.map((product) => (
             <SwiperSlide key={product._id}>
            <TrendingCard product={product} refetch={refetch}></TrendingCard>
        </SwiperSlide>
          ))}
      </Swiper>

        </div>
      </div>
    );
};

export default Trending;
