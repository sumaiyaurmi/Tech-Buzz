import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../UseHooks/useAxiosSecure";
import { TbFidgetSpinner } from "react-icons/tb";
import { useQuery } from "@tanstack/react-query";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ManageCoupons = () => {
  const [startDate, setStartDate] = useState(new Date());
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);

  const {
    data: coupons = [],
    refetch,
    isPending,
  } = useQuery({
    queryKey: ["coupons"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/coupons`);

      return res.data;
    },
  });
  console.log(coupons);

  const handleCoupon = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const coupon_code = form.code.value;
    const description = form.description.value;
    const amount = form.amount.value;
    const expiryDate = startDate;

    try {
      const couponData = {
        coupon_code,
        description,
        amount,
        expiryDate,
      };
      const { data } = await axiosSecure.post(`/coupons`, couponData);
      console.log(data);
      setLoading(false);
      toast("coupon Card Added Successfully", {
        icon: "👏",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      form.reset();
      refetch();
    } catch (err) {
      console.log(err);
      setLoading(false);

      toast.error(`${err.message}`);
    }
  };

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
        axiosSecure.delete(`/coupon/${id}`)
        .then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Coupone has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };
  if (isPending)
    return (
      <div className="text-center">
        {" "}
        <span className="loading loading-bars text-center mt-44 loading-lg"></span>
      </div>
    );

  if (isPending)
    return (
      <div className="text-center">
        {" "}
        <span className="loading loading-bars text-center mt-44 loading-lg"></span>
      </div>
    );

  return (
    <div>
      {/* view coupons */}
      <div className="my-6">
        <h3 className="text-4xl my-10  ">Coupons :{coupons.length}</h3>
        <div className="overflow-x-auto ">
          <table className="table  space-y-4  ">
            {/* head */}
            <thead className="my-4">
              <tr>
                <th></th>
                <th>Coupon Code</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Expiry Date</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((coupon, index) => (
                <tr key={coupon._id}>
                  <th>{index + 1}</th>
                  <td>{coupon.coupon_code}</td>
                  <td>{coupon.description}</td>
                  <td>{coupon.amount}</td>
                  <td> {new Date(coupon.expiryDate).toLocaleDateString()}</td>
                  <td>
                    <Link to={`/dashboard/updateCoupon/${coupon._id}`}>
                      <button className="btn text-lg">
                        <FaEdit></FaEdit>
                      </button>
                    </Link>
                  </td>

                  <td className="">
                    <button
                      onClick={() => handledelete(coupon._id)}
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

      {/* post coupons */}
      <div className="pl-5 bg-slate-200 p-4 rounded-2xl">
        <form onSubmit={handleCoupon}>
          <div className="space-y-1 text-sm w-full md:w-1/2">
            <label htmlFor="location" className="block text-gray-600">
              Coupon Code
            </label>
            <input
              className="w-full px-4 py-3 text-gray-800 border border-yellow-500 focus:outline-yellow-600 rounded-md "
              name="code"
              id="name"
              type="text"
              placeholder="code"
              required
            />
          </div>
          <div className="space-y-1 text-sm w-full md:w-1/2">
            <label htmlFor="description" className="block text-gray-600">
              Description
            </label>

            <input
              className="w-full px-4 py-3 text-gray-800 border border-yellow-500 focus:outline-yellow-600 rounded-md "
              name="description"
              id="name"
              type="text"
              placeholder="description"
              required
            />
          </div>

          <div className="space-y-1 text-sm w-full md:w-1/2">
            <label htmlFor="description" className="block text-gray-600">
              Amount
            </label>

            <input
              className="w-full px-4 py-3 text-gray-800 border border-yellow-500 focus:outline-yellow-600 rounded-md "
              name="amount"
              id="name"
              type="number"
              placeholder="amount"
              required
            />
          </div>
          <div className="space-y-1 text-sm w-full md:w-1/2">
            <label htmlFor="location" className="block text-gray-600">
              Expiry Date
            </label>
            <DatePicker
              className="w-full px-4 py-3 text-gray-800 border border-yellow-500 focus:outline-yellow-600 rounded-md"
              name="date"
              selected={startDate}
              required
              onChange={(date) => setStartDate(date)}
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className="w-full md:w-1/3 rounded-2xl p-3 mt-5 text-center hover:border-yellow-600 border-2 font-medium text-white transition duration-200 rounded shadow-md hover:text-yellow-600 bg-black"
            >
              {loading ? (
                <TbFidgetSpinner className="m-auto animate-spin" size={24} />
              ) : (
                "Add Coupon"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManageCoupons;
