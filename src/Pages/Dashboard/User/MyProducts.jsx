import React, { useContext } from 'react';
import useAxiosPublic from '../../../UseHooks/UseAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../../Providers/AuthProvider/AuthProvider';
import { PiEmptyBold } from "react-icons/pi";


const MyProducts = () => {

    const axiosPublic=useAxiosPublic()
const {user}=useContext(AuthContext)

    const { refetch,data: products = [] } = useQuery({
      queryKey: ['myProdutcs'],
      queryFn: async () => {
        const res = await axiosPublic.get(`/products/${user?.email}`);
        return res.data;
      },
    });
console.log(products)
    return (
        <section className="container px-4 mx-auto pt-1 my-10  ">
        {products.length > 0 ? <>
            <div className="flex items-center gap-x-3">
          <h2 className="text-lg font-medium text-gray-800 ">My Products</h2>
  
          <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full ">
            {products.length} Products
          </span>
        </div>
  
        <div className="flex flex-col mt-6">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200  md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 ">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 px-3 text-sm font-normal text-left rtl:text-right text-gray-500"
                      >
                        <div className="flex items-center gap-x-3">
                          <span>Title</span>
                        </div>
                      </th>
  
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                      >
                        <span>Timestamp</span>
                      </th>
  
                      <th
                        scope="col"
                        className="px-6 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                      >
                        Preview
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                      >
                        Assignment Marks
                      </th>
                      
  
                      
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 text-left ">
                    {products.map((product) => (
                      <tr key={product._id}>
                        <td className=" py-4 px-4 text-sm text-gray-500  whitespace-nowrap">
                          {product.name}
                        </td>
  
                        <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
{ product.votes}
                        </td>
  
                        <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                          <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                            <div className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 ${
                              product.status === 'pending' &&
                              'bg-yellow-100/60 text-yellow-500'
                            } ${
                              product.status === 'Complete' &&
                              'bg-emerald-100/60 text-emerald-500'
                            } `}>
                              <span  className={`h-1.5 w-1.5 rounded-full ${
                                product.status === 'pending' && 'bg-yellow-500'
                              }  ${product.status === 'Complete' && 'bg-green-500'}  `}></span>
                              <h2 className="text-sm font-normal ">
                                {product.status}
                              </h2>
                            </div>
                          </td>{" "}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                          <div>
                            {/* <a href={submission.pdf} target="_blank">
                              <FaFilePdf size={25} color="red" />
                            </a> */}
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <div className="flex items-center gap-x-2">
                            <p
                              className="px-3 py-1 rounded-full text-blue-500 bg-blue-100/60
                             text-xs"
                            >
                              {/* {products.marks} */}
                            </p>
                          </div>
                        </td>
                       
                        
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        </> : <>
        <h3 className='text-center text-3xl mt-20 font-semibold text-red-500 flex justify-center items-center gap-2'> <span> <PiEmptyBold></PiEmptyBold> </span> <span>No Product Added By You Yet</span></h3>
        </> }
      </section>
    );
};

export default MyProducts;