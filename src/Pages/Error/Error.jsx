import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <div>
            <img src="https://i.postimg.cc/C5rj9kYm/5203172.jpg" className='w-[550px] mx-auto' alt="" />
         <div className=' text-center'>
         <Link to={'/'}>   <button className='btn bg-black hover:text-yellow-600 text-white '>
                Go Back To Home
            </button></Link>
         </div>
        </div>
    );
};

export default Error;