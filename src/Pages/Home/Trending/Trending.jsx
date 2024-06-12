import {  useState } from "react";
import SectionTitle from "../../../Components/SEctionTitle";
import useAxiosPublic from "../../../UseHooks/UseAxiosPublic";


// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// import required modules
import { EffectCoverflow, Pagination } from "swiper/modules";
import TrendingCard from "./TrendingCard";
import { useQuery } from "@tanstack/react-query";

const Trending = () => {
  const axiosPublic = useAxiosPublic();
  const [asc, setAsc] = useState("");

  const { refetch, data: products = [] } = useQuery({
    queryKey: ["trendingProdutcs", asc],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/trendingsProducts?sort=${asc ? "asc" : "dsc"}`
      );
      return res.data;
    },
  });

  return (
    <div className="my-6 space-y-4 pb-4">
      <SectionTitle
        heading={"Tech Buzz Spotligh"}
        subHeading={"Unveiling the Hottest Tech Products of the Moment"}
      ></SectionTitle>

      <div className="text-center">
        <button
          className="btn mb-2 bg-black text-yellow-500 hover:text-black hover:bg-yellow-600  "
          onClick={() => setAsc(!asc)}
        >
          {asc ? "Votes : Descending Order" : "votes : Ascending Order"}
        </button>
      </div>

      <div className="  py-10 ">
        <Swiper
          effect={"coverflow"}
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
