import  { useContext, useState } from 'react';
import { MdWhereToVote } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../../Providers/AuthProvider/AuthProvider';
import useAxiosSecure from '../../UseHooks/useAxiosSecure';
const ProductCard = ({product,refetch}) => {
    const {_id,image,name,tags,votes,Owner}=product
    const {user}=useContext(AuthContext)
    const[vote,setVote]=useState(votes)
    const [isVoted,setIsVoted]=useState(false)
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const handleUpVote = async () => {
        if(user){
     const {data}=await axiosSecure.post(`/products/${_id}/vote`)
     setVote(data.votes)
     setIsVoted(true)
     refetch()
        }
        else{
         return navigate('/login')
        }
       };

    return (
        <div>
             <div className="card mt-6 bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
              <img
                src={image}
                alt="Shoes"
                className="rounded-xl w-[300px] h-[250px] hover:scale-150 transition duration-1000 "
              />
            </figure>
            <div className="card-body ">
<Link to={`/ProductDetails/${_id}`}>
<h2 className="card-title">{name}</h2>

</Link>              <div className="flex gap-3 my-2">
                {tags.map((tag, index) => (
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
                  disabled={user?.email === Owner.email || isVoted}
                  onClick={() => handleUpVote()}
                  className="btn  rounded-full
                 bg-black text-yellow-600 gap-0 text-lg"
                >
                  {votes}
                  <MdWhereToVote className="text-lg" />
                </button>
              </div>
            </div>
          </div>
        </div>
    );
};

export default ProductCard;