import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProvider/AuthProvider";
import useAxiosPublic from "../../../UseHooks/UseAxiosPublic";
import SectionTitle from "../../../Components/SEctionTitle";
import { MdWhereToVote } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast/headless";

const Features = () => {
  const [products, setProducts] = useState([]);
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, [axiosPublic]);

  const getData = async () => {
    const { data } = await axiosPublic("/featuredProducts");
    setProducts(data);
  };

  const handleUpVote = async (id, votes) => {

    console.log(id,votes)

    if (!user) {
      navigate("/login");
      return;
    }

    const { data } = await axiosPublic.patch(`/featuredProducts/${id}`,{ votes });
      console.log(data);
      getData();
  };
  console.log(user?.email)


  return (
    <div className="my-6 space-y-4 pb-4">
      <SectionTitle
        heading={"Discover Featured Products"}
        subHeading={"Explore the Latest and Greatest in Tech"}
      ></SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {products.map((product) => (
          <div key={product._id} className="card mt-6 bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
              <img
                src={product.image}
                alt="Shoes"
                className="rounded-xl w-[300px] h-[250px] hover:scale-150 transition duration-1000 "
              />
            </figure>
            <div className="card-body ">
              <h2 className="card-title">{product.name}</h2>
              <div className="flex gap-3 my-2">
                {product.tags.map((tag, index) => (
                  <div
                    key={index}
                    className="badge text-white py-2 bg-yellow-500"
                  >
                    {tag}
                  </div>
                ))}
              </div>
              <div className="card-actions justify-end">
                <button
                disabled={user?.email === product.email}
                  onClick={() => handleUpVote(product._id, product.votes + 1)}
                  className="btn  rounded-full
                 bg-black text-yellow-600 gap-0 text-lg"
                >
                  {product.votes}
                  <MdWhereToVote className="text-lg" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
