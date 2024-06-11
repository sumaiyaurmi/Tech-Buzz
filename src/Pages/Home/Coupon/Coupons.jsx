import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../UseHooks/useAxiosSecure";
import SectionTitle from "../../../Components/SEctionTitle";
const Coupons = () => {
  const axiosSecure = useAxiosSecure();

  const { data: coupons = [] } = useQuery({
    queryKey: ["coupons"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/coupons`);

      return res.data;
    },
  });

  return (
    <div className="my-16">
        <SectionTitle
        heading={'Discover Top Trends and Exclusive Offers'}
        subHeading={'Uncover the Most Popular Products and Special Discounts'}
        ></SectionTitle>
      <Swiper
        pagination={{
          type: "fraction",
        }}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        {coupons.map((coupn) => (
          <SwiperSlide key={coupn._id}>
            <div className="flex flex-col my-2 mb-8 gap-4 justify-center items-center w-10/12 mx-auto mt-4 ">
              <div className="  rounded-2xl bg-yellow-600 p-4 text-white ">
              <h3 className="text-2xl font-serif  p-2">{coupn.description}</h3>
              <p>use :</p>
              <h3 className="text-2xl font-serif hover:underline   p-2">{coupn.coupon_code}</h3>
              <div className="flex flex-col md:flex-row justify-evenly">
                <p><span className="font-semibold text-black">Expiry Date :</span>  {new Date(coupn.expiryDate).toLocaleDateString()} </p>
                <p><span className="font-semibold text-black">Amount :</span> ${coupn.amount} </p>
              </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Coupons;
