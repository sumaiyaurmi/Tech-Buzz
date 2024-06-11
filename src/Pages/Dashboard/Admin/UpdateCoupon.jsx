import { TbFidgetSpinner } from "react-icons/tb";
import { useLoaderData, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import useAxiosSecure from "../../../UseHooks/useAxiosSecure";
import toast from "react-hot-toast";
const UpdateCoupon = () => {
  const coupon = useLoaderData();
  const [startDate, setStartDate] = useState(new Date(coupon.expiryDate));
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCouponUpdate = async (e) => {
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
      const { data } = await axiosSecure.put(
        `/coupons/${coupon._id}`,
        couponData
      );
      console.log(data);
      setLoading(false);
      toast("coupon Card Updated Successfully", {
        icon: "👏",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      navigate("/dashboard/admin-manage-coupons");
      form.reset();
      //   refetch();
    } catch (err) {
      console.log(err);
      setLoading(false);

      toast.error(`${err.message}`);
    }
  };
  return (
    <div>
      <div className="pl-5 bg-slate-200 p-4 rounded-2xl">
        <form onSubmit={handleCouponUpdate}>
          <div className="space-y-1 text-sm w-full md:w-1/2">
            <label htmlFor="location" className="block text-gray-600">
              Coupon Code
            </label>
            <input
              className="w-full px-4 py-3 text-gray-800 border border-yellow-500 focus:outline-yellow-600 rounded-md "
              name="code"
              id="name"
              type="text"
              defaultValue={coupon.coupon_code}
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
              defaultValue={coupon.description}
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
              defaultValue={coupon.amount}
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
                "Update Coupon"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCoupon;
