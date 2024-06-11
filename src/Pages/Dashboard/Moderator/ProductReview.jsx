import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../UseHooks/useAxiosSecure";
import { TbListDetails } from "react-icons/tb";
import { MdOutlineFeaturedPlayList } from "react-icons/md";
import axios from "axios";
import toast from "react-hot-toast";

const ProductReview = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: products = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/products");
      return data;
    },
  });

  // status
  const handleStaus = async (product, prevStatus, status) => {
    if (prevStatus === status) return console.log("srb bhi hbe na");

    await axiosSecure
      .patch(`/users/status/${product._id}`, { status })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: `${product.name} is ${status}`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };
  // Featured
  const handleFeatured = async (product, isFeatured) => {
    if (product.isFeatured) {
      return toast(`${product.name} is already added in featured collection`, {
        icon: "❌",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }

    await axiosSecure
      .patch(`/productsFeatured/${product._id}`, { isFeatured })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: `${product.name} is now added in featured`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  if (isLoading)
    return (
      <div className="text-center">
        {" "}
        <span className="loading loading-bars text-center mt-44 loading-lg"></span>
      </div>
    );

  return (
    <div>
      <h3 className="text-4xl my-10  ">Total Users:{products.length}</h3>
      <div className="overflow-x-auto ">
        <table className="table  space-y-4  ">
          {/* head */}
          <thead className="my-4">
            <tr>
              <th></th>
              <th>Name</th>
              <th>Status</th>
              <th>View Details</th>
              <th>Make Featured</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product._id}>
                <th>{index + 1}</th>
                <td>{product.name}</td>
                <td className="px-4 py-4  font-medium whitespace-nowrap">
                  <div
                    className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 ${
                      product.status === "pending" &&
                      "bg-yellow-100/60 text-yellow-500"
                    }
                                 ${
                                   product.status === "accepted" &&
                                   "bg-emerald-100/60 text-emerald-500"
                                 } 
                                 ${
                                   product.status === "rejected" &&
                                   "bg-red-100/60 text-red-500"
                                 } 
                                `}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        product.status === "pending" && "bg-yellow-500"
                      }  ${product.status === "accepted" && "bg-green-500"}  
                                  ${
                                    product.status === "rejected" &&
                                    "bg-red-500"
                                  }  
                                  `}
                    ></span>
                    <h2 className="text-sm font-normal ">{product.status}</h2>
                  </div>
                </td>{" "}
                <td>
                  <button className="bg-slate-400  px-4 py-2 text-lg btn text-center font-semibold  rounded-xl">
                    <TbListDetails></TbListDetails>
                  </button>
                </td>
                <td className="">
                  <button
                    onClick={() => handleFeatured(product, true)}
                    className="bg-yellow-500 px-4 py-2 text-lg btn text-center font-semibold  rounded-xl"
                  >
                    <MdOutlineFeaturedPlayList></MdOutlineFeaturedPlayList>
                  </button>
                </td>
                <td>
                  <button
                    disabled={product.status == "accepted"}
                    onClick={() =>
                      handleStaus(product, product.status, "accepted")
                    }
                    className="btn   bg-green-400 rounded-2xl  font-medium hover:text-white hover:bg-green-300 text-center "
                  >
                    Accept
                  </button>
                </td>
                <td>
                  <button
                    disabled={product.status === "rejected"}
                    onClick={() =>
                      handleStaus(product, product.status, "rejected")
                    }
                    className="btn  bg-red-500 rounded-2xl  font-medium hover:text-white hover:bg-red-300 text-center "
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductReview;
