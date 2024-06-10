import React, { useContext, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Providers/AuthProvider/AuthProvider';
import useAxiosPublic from '../../../UseHooks/UseAxiosPublic';
import { TagsInput } from "react-tag-input-component";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from 'react-hot-toast';
import { imageUpload } from '../../../Components/Utils';
import { TbFidgetSpinner } from 'react-icons/tb';

const UpdatedMyProduct = () => {

    const product=useLoaderData()
    const [selected, setSelected] = useState(["AI"]);
    const [startDate, setStartDate] = useState(new Date(product.timestamp));
    const { user } = useContext(AuthContext);
    const axiosPublice = useAxiosPublic();
    const navigate = useNavigate();
    const [loading,setLoading]=useState(false)


    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        setLoading(true)

        const form = e.target;
        const name = form.name.value;
        const description = form.description.value;
        const links = form.links.value;
        const timestamp = startDate;
        const image = form.image.files[0];
    
        try {
          const image_url = await imageUpload(image);
    
          const productData = {
            name,
            description,
            image: image_url,
            links,
            timestamp,
            votes: 0,
            status: "pending",
            tags: selected,
            Owner: {
              email: user?.email,
              name: user?.displayName,
              image: user?.photURL,
            },
          };
          const { data } = await axiosPublice.put(`/products/${product._id}`,productData);
          console.log(data);
          setLoading(false)

          toast("products Updated Successfully", {
            icon: "👏",
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
          navigate("/dashboard/myProducts");
        } catch (err) {
            setLoading(false)

          console.log(err);
          toast.error(`${err.message}`);
        }
      };

    return (
        <div>
             <div className="w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50">
        <form 
        onSubmit={handleUpdateProduct} 
        className="md:w-full ">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-3">
              <div className="space-y-1 text-sm">
                <label htmlFor="location" className="block text-gray-600">
                  Product Name
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-yellow-500 focus:outline-yellow-600 rounded-md "
                  name="name"
                  id="name"
                  type="text"
                  defaultValue={product.name}
                  placeholder="Name"
                  required
                />
              </div>

              <div className="space-y-1 text-sm">
                <label htmlFor="description" className="block text-gray-600">
                  Description
                </label>

                <textarea
                  id="description"
                  className="block h-24 md:h-32 w-full px-4 py-3 text-gray-800 border border-yellow-500 focus:outline-yellow-600 rounded-md "
                  name="description"
                  required
                  defaultValue={product.description}

                ></textarea>
              </div>
              <div className="space-y-1 text-sm">
                <label htmlFor="Links" className="block text-gray-600">
                  Links
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-yellow-500 focus:outline-yellow-600 rounded-md "
                  name="links"
                  id="title"
                  type="text"
                  defaultValue={product.links}
                  placeholder="Links"
                  required
                />
              </div>
              <div>
                <label htmlFor="title" className="block text-gray-600">
                  Tags
                </label>
                <TagsInput
                  value={selected}
                  onChange={setSelected}
                  name="tags"
                  required    
                  placeHolder="enter tags"
                  classNames="w-full input px-4 py-3 text-gray-800 border border-yellow-500 focus:outline-yellow-600 rounded-md"
                />
              </div>
              <div></div>
              <label className="label">
                <span className="label-text">Timestamp</span>
              </label>
              {/* Date Picker Input Field */}
              <DatePicker
                className="w-full px-4 py-3 text-gray-800 border border-yellow-500 focus:outline-yellow-600 rounded-md"
                name="date"
                selected={startDate}
                required
                defaultValue={new Date(product.timestamp).toLocaleDateString()}

                onChange={(date) => setStartDate(date)}
              />
            </div>
            <div className="space-y-6 ">
              <div className=" p-4 bg-white w-full  m-auto rounded-lg">
                <label htmlFor="price" className="block mb-2 text-gray-600">
                  Product Image
                </label>
                <div className="file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg">
                  <div className="flex flex-col w-max mx-auto text-center">
                    <input
                      type="file"
                      required
                      name="image"
                      className="file-input file-input-bordered file-input-warning w-full max-w-xs"
                    />{" "}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-extrabold text-left pt-4">
                  {" "}
                  Owner Details :
                </h3>
              </div>

              <div className="space-y-2">
                <div className="space-y-1 text-sm">
                  <label htmlFor="price" className="block text-gray-600">
                    Name
                  </label>
                  <input
                    className="w-full px-4 py-3 text-gray-800 border border-yellow-500 focus:outline-yellow-600 rounded-md"
                    name="ownerName"
                    type="text"
                    defaultValue={user?.displayName}
                    required
                    disabled
                  />
                </div>

                <div className="space-y-1 text-sm">
                  <label htmlFor="guest" className="block text-gray-600">
                    Email
                  </label>
                  <input
                    className="w-full px-4 py-3 text-gray-800 border border-yellow-500 focus:outline-yellow-600 rounded-md"
                    name="ownerEmail"
                    type="text"
                    defaultValue={user?.email}
                    required
                    disabled
                  />
                </div>
                <div className="space-y-1 text-sm">
                  <label htmlFor="bedrooms" className="block text-gray-600">
                    Photo
                  </label>
                  <input
                    className="w-full px-4 py-3 text-gray-800 border border-yellow-500 focus:outline-yellow-600 rounded-md "
                    name="ownerImage"
                    type="text"
                    defaultValue={user?.photoURL}
                    required
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}

            className="w-full p-3 mt-5 text-center hover:border-yellow-600 border-2 font-medium text-white transition duration-200 rounded shadow-md hover:text-yellow-600 bg-black"
          >
        {loading ? (
            <TbFidgetSpinner className='m-auto animate-spin' size={24} />
          ) : (
            'Update Product'
          )}          </button>
        </form>
      </div>
        </div>
    );
};

export default UpdatedMyProduct;