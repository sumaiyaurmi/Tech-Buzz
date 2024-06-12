import useAxiosPublic from "../../../UseHooks/UseAxiosPublic";
import SectionTitle from "../../../Components/SEctionTitle";

import { useQuery } from "@tanstack/react-query";
import ProductCard from "../../../Components/Home/ProductCard";
import { useState } from "react";

const Features = () => {
  const axiosPublic=useAxiosPublic()
  const [asc, setAsc] = useState("dsc");



  const { refetch,data: products = [] } = useQuery({
    queryKey: ['produtcs',asc],
    queryFn: async () => {
      const res = await axiosPublic.get(`/featuredProducts?sort=${asc ? 'asc' : 'dsc'}`);
      return res.data;
    },
  });
 

  return (
    <div className="my-6 space-y-4 pb-4">
      <SectionTitle
        heading={"Discover Featured Products"}
        subHeading={"Explore the Latest and Greatest in Tech"}
      ></SectionTitle>
<div className="text-center">
        <button
          className="btn mb-2 bg-black text-yellow-500 hover:text-black hover:bg-yellow-600  "
          onClick={() => setAsc(!asc)}
        >
          {asc ? "Oldest Products" : "Latest Products"}
        </button>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {products.map((product) => (
         <ProductCard  key={product._id} product={product} refetch={refetch}></ProductCard>
        ))}
      </div>
    </div>
  );
};

export default Features;
