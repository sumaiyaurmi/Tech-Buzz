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

const Trending = () => {

    const [products, setProducts] = useState([]);
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    useEffect(() => {
        getData();
      }, [axiosPublic]);
    
      const getData = async () => {
        const { data } = await axiosPublic("/trendingsProducts");
        setProducts(data);
      };
    
      const handleUpVote = async (id, votes) => {
        console.log(id, votes);
    
        if (!user) {
          navigate("/login");
          return;
        }
    
        const { data } = await axiosPublic.patch(`/trendingsProducts/${id}`, {
          votes,
        });
        console.log(data);
        getData();
      };

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
             <div  className="card  mt-6 bg-slate-200 ">
              <figure className="p-3">
                <img
                  src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                  alt="Shoes"
                  className="rounded-xl w-[300px] h-[250px] hover:scale-150 transition duration-1000 "
                />
              </figure>
              <div className="card-body ">
                <h2 className="card-title">{product.name}</h2>
                <div className="flex gap-3 flex-col md:flex-row ">
                  {product.tags.map((tag, index) => (
                    <div
                      key={index}
                      className="badge text-white py-2 bg-yellow-500"
                    >
                      {tag}
                    </div>
                  ))}
                </div>
                <div className="card-actions justify-end">
                  <button
                    disabled={user?.email === product.CreatorEmail}
                    onClick={() => handleUpVote(product._id, product.votes + 1)}
                    className="btn  rounded-full
                   bg-black text-yellow-600 gap-0 text-lg"
                  >
                    {product.votes}
                    <MdWhereToVote className="text-lg" />
                  </button>
                </div>
                <div className="text-center"><button className="btn mb-4 bg-black hover:bg-black text-white hover:text-yellow-600">Show All Products</button></div>
              </div>
            </div>
        </SwiperSlide>
          ))}
      </Swiper>

        </div>
      </div>
    );
};

export default Trending;
