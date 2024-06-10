import React from 'react';
import MenuItem from '../MenuItems';
import {  } from 'react-icons/fa';
import { MdOutlineRateReview, MdReportProblem } from 'react-icons/md';

const ModaretorMenu = () => {
    return (
        <>
          <MenuItem
        icon={MdOutlineRateReview }
        label="  Product Review "
        address="/dashboard/modaretor-review"
      />   
          <MenuItem
        icon={MdReportProblem }
        label="   Reported Contents "
        address="/dashboard/modaretor-reported-contents"
      />   
        </>
    );
};

export default ModaretorMenu;