import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../UseHooks/useAxiosSecure";
import { TbListDetails } from "react-icons/tb";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa6";
import Swal from "sweetalert2";

const Reportproducts = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: products = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["reportedProducts"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/ReportedProducts");
      return data;
    },
  });

  const handledelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/products/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Product has been deleted.",
              icon: "success",
            });
          }
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
      <h3 className="text-4xl my-10 text-red-500 ">
        Reported Products: {products.length}
      </h3>
      <div className="overflow-x-auto ">
        <table className="table  space-y-4  ">
          {/* head */}
          <thead className="my-4">
            <tr>
              <th></th>
              <th>Name</th>
              <th>View Details</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product._id}>
                <th>{index + 1}</th>
                <td>{product.name}</td>

                <td>
                  <Link to={`/ProductDetails/${product._id}`}>
                    <button className="bg-slate-400  px-4 py-2 text-lg btn text-center font-semibold  rounded-xl">
                      <TbListDetails></TbListDetails>
                    </button>
                  </Link>
                </td>
                <td className="">
                  <button
                    onClick={() => handledelete(product._id)}
                    className=" btn text-red-500 text-lg btn text-center font-semibold  rounded-xl"
                  >
                    <FaTrash></FaTrash>
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

export default Reportproducts;
