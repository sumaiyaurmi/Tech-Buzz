import useAxiosPublic from "../../../UseHooks/UseAxiosPublic";
import SectionTitle from "../../../Components/SEctionTitle";

import { useQuery } from "@tanstack/react-query";
import ProductCard from "../../../Components/Home/ProductCard";

const Features = () => {
  const axiosPublic=useAxiosPublic()


  const { refetch,data: products = [] } = useQuery({
    queryKey: ['produtcs'],
    queryFn: async () => {
      const res = await axiosPublic.get(`/featuredProducts`);
      return res.data;
    },
  });
 

  return (
    <div className="my-6 space-y-4 pb-4">
      <SectionTitle
        heading={"Discover Featured Products"}
        subHeading={"Explore the Latest and Greatest in Tech"}
      ></SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {products.map((product) => (
         <ProductCard  key={product._id} product={product} refetch={refetch}></ProductCard>
        ))}
      </div>
    </div>
  );
};

export default Features;
