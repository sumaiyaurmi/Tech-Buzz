import { MdWhereToVote } from "react-icons/md";
import { useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider/AuthProvider";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../UseHooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaStar } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {  Navigation } from "swiper/modules";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

const ProdcutsDetails = () => {
  const product = useLoaderData();

  const {
    _id,
    name,
    description,
    image,
    links,
    timestamp,
    votes,
    tags,
    Owner,
  } = product;
  const { user } = useContext(AuthContext);
  const [vote, setVote] = useState(votes);
  const [isVoted, setIsVoted] = useState(false);
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: reviewss = [],refetch, isPending } = useQuery({
    queryKey: ["reviews", _id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/allReviews/${_id}`);

      return res.data;
    },
  });

  const handleUpVote = async () => {
    if (user) {
      const { data } = await axiosSecure.post(`/products/${_id}/vote`);
      setVote(data.votes);
      setIsVoted(true);
      refetch()
      toast.success("voted successfully");
    } else {
      return navigate("/login");
    }
  };

  // Featured
  const handleReport = async (product, reported) => {
    if (product.reported) {
      return toast(`You have already report ${product.name} `, {
        icon: "❌",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }

    await axiosSecure
      .patch(`/productsReport/${product._id}`, { reported })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          //   refetch();
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: `${product.name} reported`,
            showConfirmButton: false,
            timer: 1500,
          });
          refetch()
        }
      });
  };

  const handleReview = async (e) => {
    e.preventDefault();
    const form = e.target;
    const review = form.review.value;

    try {
      const reviewData = {
        review,
        productId: _id,
        rating: parseInt(rating),
        ReviewOwner: {
          email: user?.email,
          name: user?.displayName,
          image: user?.photoURL,
        },
      };
      const { data } = await axiosSecure.post(`/productsReview`, reviewData);
      console.log(data);
      toast("Review Added Successfully", {
        icon: "👏",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      refetch()
      form.reset("");
      setRating(null);
    } catch (err) {
      console.log(err);

      toast.error(`${err.message}`);
    }
  };

  if (isPending)
    return (
      <div className="text-center">
        {" "}
        <span className="loading loading-bars text-center mt-44 loading-lg"></span>
      </div>
    );

  return (
    <div className="md:pt-20   mb-6">
      {/* products info */}
      <div className=" p-5 flex flex-col justify-center md:flex-row gap-7 items-center ">
        {/* image */}
        <div className="w-full md:w-[500px]">
          <img src={image} className="rounded-3xl" alt="" />
        </div>
        {/* info */}
        <div className="space-y-3 w-full md:w-1/2">
          <h3 className="text-3xl font-semibold font-serif">{name}</h3>
          <p className="text-slate-500 ">{description}</p>
          <div className="flex gap-3 my-2">
            {tags.map((tag, index) => (
              <div key={index} className="badge text-white py-2 bg-yellow-500">
                {tag}
              </div>
            ))}
          </div>
          <p>
            <span className="font-semibold text-lg">Published Time</span> :{" "}
            {new Date(timestamp).toLocaleDateString()}
          </p>
          <a href={links} className="" target="_blank">
            {" "}
            <span className="font-semibold text-lg">Website Links :</span>{" "}
            <span className="hover:underline  text-blue-500 font-medium">
              {name}
            </span>{" "}
          </a>
          <div className="flex pt-6 w-1/3 gap-4 justify-around  md:flex-row">
            <button
              disabled={user?.email === Owner.email || isVoted}
              onClick={() => handleUpVote()}
              className="btn  rounded-2xl
                 bg-black text-yellow-600 gap-0 text-lg"
            >
              Votes {votes}
              <MdWhereToVote className="text-lg" />
            </button>
            <button
              onClick={() => handleReport(product, true)}
              className="btn  rounded-2xl
                 bg-red-500 text-white gap-0 text-lg"
            >
              Report ❌
            </button>
          </div>
        </div>
      </div>
      {/* report content */}
      <div>
        <div className="my-16">
          <h3 className="font-semibold text-xl">
            {" "}
            Total Reviews {reviewss.length}
          </h3>
          {reviewss.length > 0 ? (
            <>
              <Swiper
                pagination={{
                  type: "fraction",
                }}
                navigation={true}
                modules={[ Navigation]}
                className="mySwiper"
              >
                {reviewss.map((review) => (
                  <SwiperSlide key={review._id}>
                    <div className="flex flex-col gap-4 justify-center items-center w-10/12 mx-auto mt-4">
                      <Rating
                        style={{ maxWidth: 180 }}
                        value={review.rating}
                        readOnly
                      />
                      <p>{review.review}</p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </>
          ) : (
            <>
            <h3 className="text-2xl text-red-500 font-semibold  my-2 ">No reviews yet. Give a review first</h3>
            </>
          )}
        </div>
        {/* post review */}
        <div>
          <h3 className="text-center text-2xl font-semibold">
            Give some review and rate this project
          </h3>
          <form onSubmit={handleReview}>
            <div className=" flex flex-col md:flex-row gap-4 my-6 items-center">
              {/* review */}
              <div className="space-y-1 text-sm w-1/2 md:w-1/3">
                <label htmlFor="Review" className="block text-gray-600">
                  Review
                </label>

                <textarea
                  id="review"
                  className="block h-24 md:h-32  w-full px-4 py-3 text-gray-800 border border-yellow-500 focus:outline-yellow-600 rounded-md "
                  name="review"
                  required
                ></textarea>
              </div>
              {/* rating */}
              <div>
                <div className="flex">
                  {[...Array(5)].map((star, index) => {
                    const currentRating = index + 1;
                    return (
                      <label key={index}>
                        <input
                          type="radio"
                          name="rating"
                          value={currentRating}
                          onClick={() => setRating(currentRating)}
                        />
                        <FaStar
                          className="cursor-pointer"
                          size={30}
                          color={
                            currentRating <= (hover || rating)
                              ? "#ffc107"
                              : "#e4e5e9"
                          }
                          onMouseEnter={() => setHover(currentRating)}
                          onMouseLeave={() => setHover(null)}
                        ></FaStar>
                      </label>
                    );
                  })}
                </div>
                <p>Your rating is {rating}</p>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="btn my-2 bg-black text-yellow-500"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProdcutsDetails;
