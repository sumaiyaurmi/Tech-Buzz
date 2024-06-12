import { useQuery } from "@tanstack/react-query";
import ProductCard from "../../../Components/Home/ProductCard";
import useAxiosPublic from "../../../UseHooks/UseAxiosPublic";
import { useState } from "react";
import useAxiosSecure from "../../../UseHooks/useAxiosSecure";

const AllProducts = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");
  const [itemsPerPage, setItemParPage] = useState(6);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const { refetch, data: products = [] } = useQuery({
    queryKey: ["produtcs", search,currentPage,itemsPerPage],
    queryFn: async () => {
      const res = await axiosSecure.get(`/allProducts?search=${search}&page=${currentPage}&size=${itemsPerPage}`);
      return res.data;

    },
  });

  
  

    console.log(products.length)



  const numbarOfPages =Math.ceil(count/itemsPerPage) 
  const pages = [...Array(numbarOfPages).keys()].map(element => element +1)

const handlePaginationButton=(value)=>{
// console.log(value)
setCurrentPage(value)

}

  const handleSearch = (e) => {
    e.preventDefault();
    const searchText = e.target.search.value;
    setSearch(searchText);
  };

  return (
    <div className="mb-10 pt-24 space-y-4 pb-4">
      <form
        className=" flex justify-center items-center"
        onSubmit={handleSearch}
      >
        <input
          type="text"
          name="search"
          className="input bg-slate-300 input-bordered"
        />
        <input type="submit" value={"Search"} className="btn" />
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            refetch={refetch}
          ></ProductCard>
        ))}
      </div>

{/* Pagination  */}
<div className="flex justify-center pt-5 my-10">

{/* Previous Button */}
<button 
disabled={currentPage === 1}
onClick={()=>handlePaginationButton(currentPage-1)}
className="px-4 py-2 mx-1  font-semibold bg-black text-yellow-600 disabled:text-gray-500 capitalize  rounded-md disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:text-amber-500 hover:bg-slate-700">
  <div className="flex items-center -mx-1">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6 mx-1 rtl:-scale-x-100"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M7 16l-4-4m0 0l4-4m-4 4h18"
      />
    </svg>

    <span className="mx-1 ">previous</span>
  </div>
</button>
{/* Numbers */}
{pages.map((btnNum) => (
  <button
  onClick={()=>handlePaginationButton(btnNum)}
    key={btnNum}
    className={`hidden ${currentPage === btnNum ? "text-amber-500 bg-slate-700 " : ""} px-4 py-2 mx-1 transition-colors duration-300 transform  rounded-md sm:inline hover:text-amber-500 hover:bg-slate-700`}
  >
    {btnNum}
  </button>
))}

{/* Next Button */}

<button
        disabled={currentPage === numbarOfPages}

        onClick={()=>handlePaginationButton(currentPage+1)}

className="px-4 py-2 mx-1 font-semibold bg-black text-yellow-600 transition-colors duration-300 transform  rounded-md  disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:text-amber-500 hover:bg-slate-700 disabled:cursor-not-allowed disabled:text-gray-500">
  <div className="flex items-center -mx-1">
    <span className="mx-1">Next</span>

    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6 mx-1 rtl:-scale-x-100"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M17 8l4 4m0 0l-4 4m4-4H3"
      />
    </svg>
  </div>
</button>
</div>

    </div>
  );
};

export default AllProducts;
