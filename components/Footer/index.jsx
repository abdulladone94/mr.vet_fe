import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  FacebookOutlined,
  TwitterOutlined,
  LinkedinOutlined,
  InstagramOutlined,
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
} from '@ant-design/icons';

// import logo from '@/public/images/logo.png';
// import logonew from "@/public/sharing/logo1.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="flex-row px-5 pt-8 sm:px-12 lg:px-40 bg-slate-100">
      {/* <div className="grid grid-cols-1 sm:grid-cols-2">
        <div className="grid grid-rows-2 sm:justify-start xl:justify-center lg:justify-start ">
          <Link href="/" className="h-auto leading-none sm:block">
            <Image
              src="/logoWithName.png"
              width={720}
              height={720}
              alt="logo"
              priority={true}
              className="w-[150px] sm:w-[250px] object-contain h-auto my-5 sm:my-0"
            />
          </Link>
          <div className="flex sm:justify-center">
            <Link
              href="https://www.facebook.com/"
              target="_blank"
              rel="noreferrer"
            >
              <FacebookOutlined className="pr-3 flex items-center pl-3 text-3xl text-[#7D2B9A] transition-colors hover:text-purple-600" />
            </Link>

            <Link
              href="https://www.twitter.com/"
              target="_blank"
              rel="noreferrer"
            >
              <TwitterOutlined className="pr-3 flex items-center pl-3 text-[#7D2B9A] text-3xl transition-colors hover:text-purple-600" />
            </Link>

            <Link
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noreferrer"
            >
              <LinkedinOutlined className="pr-3 flex items-center pl-3 text-[#7D2B9A] text-3xl transition-colors hover:text-purple-600" />
            </Link>

            <Link
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
            >
              <InstagramOutlined className="inset-y-0 left-0 flex items-center pl-3 text-[#7D2B9A] text-3xl transition-colors hover:text-purple-600" />
            </Link>
            
          </div>
        </div>
        <div className="flex sm:justify-center sm:items-center">
          <dir className="grid grid-cols-1">
            <h3 className="mb-7">Contact Info</h3>
            <i className="bx bx-phone-call"></i>
            <span>Mon to Fri : 10:00AM - 06:00PM</span>

            <div className="flex mb-3">
              <PhoneOutlined className="flex items-center px-3 text-2xl text-[#7D2B9A] " />
              <span className="font-bold" href="tel:1235421457852">
                410-555-1212
              </span>
            </div>
            <i className="bx bx-envelope"></i>
            <div className="flex mb-3">
              <MailOutlined className="flex items-center px-3 text-2xl text-[#7D2B9A] " />
              <div className="flex flex-col">
                <span>Do You Have a Question?</span>

                <span className="font-bold" href="mailto:hello@aveb.com">
                  resources@sharing-sugar.org
                </span>
              </div>
            </div>
            <i className="bx bx-map"></i>
            <div className="flex mb-3">
              <EnvironmentOutlined className="flex items-center px-3 text-2xl text-[#7D2B9A] " />
              <span> 2750 Baltimore, Maryland, United States.</span>
              <a href="#" target="_blank" rel="noreferrer">
                    Find Us on Map
                  </a>
            </div>
          </dir>
        </div>
      </div> */}
      <div className="flex justify-center py-8 mt-18 ">
        <p className="text-[12px] sm:text-sm">
          Copyright &copy; {currentYear} MR.VET All rights reserved. Powered by{' '}
          <a href="https://booleanlabs.biz/" target="_blank" rel="noreferrer">
            BooleanLabs
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
