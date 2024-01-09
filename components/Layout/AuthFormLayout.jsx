/*
 * File: AuthFormLayout.jsx
 * Project: Sharing Sugar
 * Author: Ginthozan Varnakulasingam (ginthozanv@booleanlanbs.biz)
 * File Created: 25 April 2023
 * Copyright 2023 - 2023 Booleanlabs.
 */

import { Typography, Row, Alert } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
const { Title, Text } = Typography;

import { Lato } from 'next/font/google';
import { Toaster } from 'react-hot-toast';

const lato = Lato({
  weight: ['100', '300', '400', '700', '900'],
  subsets: ['latin'],
});

const AuthFormLayout = ({ title, image, error, children, successMessage }) => {
  return (
    <div
      className={`h-screen w-full grid grid-cols-1 md:grid-cols-2 md:overflow-hidden ${lato.className}`}
    >
      <Toaster />
      <div className="flex items-center justify-center">
        <div className="flex flex-col w-full max-w-md m-5 lg:mx-auto">
          <div className="mb-5 text-left lg:mb-10">
            {/* <Link href="/" className="flex justify-center h-auto">
              <Image
                src="/vet_logo.png"
                width={720}
                height={720}
                alt="logo"
                priority={true}
                className="w-[150px] object-contain h-auto"
              />
            </Link> */}
            <div className="flex flex-col justify-start mt-5">
              <h1 className="text-3xl lg:text-4xl">{title}</h1>
              <Text className="mt-2" type="secondary">
                Care for your furry friend, anytime, anywhere.
              </Text>
            </div>
          </div>
          {successMessage || error ? (
            <Alert
              message={successMessage ? successMessage : error}
              type={successMessage ? 'success' : 'error'}
              showIcon
            />
          ) : null}

          {children}
        </div>
      </div>
      <div className="justify-center hidden shadow-2xl md:flex">
        <Image
          src={image}
          alt="login-image"
          width={1024}
          height={1024}
          className="object-contain w-4/5 h-screen"
          priority
        />
      </div>
    </div>
  );
};

export default AuthFormLayout;
