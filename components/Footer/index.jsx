import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="flex-row px-5 pt-8 sm:px-12 lg:px-40 bg-slate-100">
      <div className="flex justify-center py-8 mt-18 ">
        <p className="text-[12px] sm:text-sm">
          Copyright &copy; {currentYear} MR.VET All rights reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
