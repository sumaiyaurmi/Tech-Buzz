import { MdWhereToVote } from "react-icons/md";
import { useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider/AuthProvider";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../UseHooks/useAxiosSecure";
import Swal from "sweetalert2";

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
    reported,
    Owner,
  } = product;
  const { user } = useContext(AuthContext);
  const [vote, setVote] = useState(votes);
  const [isVoted, setIsVoted] = useState(false);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const handleUpVote = async () => {
    if (user) {
      const { data } = await axiosSecure.post(`/products/${_id}/vote`);
      setVote(data.votes);
      setIsVoted(true);
      toast.success("voted successfully");
    } else {
      return navigate("/login");
    }
  };

// Featured
const handleReport = async (product, reported) => {
    
    if(product.reported){
        return  toast(`You have already report ${product.name} `, {
            icon: "❌",
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
    }
    
    await axiosSecure
      .patch(`/productsReport/${product._id}`, {  reported })
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
        }
      });
  };
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
      <div></div>
    </div>
  );
};

export default ProdcutsDetails;
