import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from '../../../Components/Dashbord/SideBar';

const DashBoard = () => {
    
    
    
    return (
        <div className='relative min-h-screen md:flex'>

            <div>
                <SideBar></SideBar>
            </div>
            <div className='flex-1 '>
                <div className='p-5'>
                <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default DashBoard;