import { useQuery } from "@tanstack/react-query";
import ProductCard from "../../../Components/Home/ProductCard";
import useAxiosPublic from "../../../UseHooks/UseAxiosPublic";

const AllProducts = () => {
  const axiosPublic = useAxiosPublic();

  const { refetch, data: products = [] } = useQuery({
    queryKey: ["produtcs"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/allProducts`);
      return res.data;
    },
  });

  console.log(products);

  return (
    <div className="mb-10 pt-24 space-y-4 pb-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            refetch={refetch}
          ></ProductCard>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
