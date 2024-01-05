import Head from 'next/head';
import React from 'react';

const HeadTitle = ({ title }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content="" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/brandLogo.png" />
    </Head>
  );
};

export default HeadTitle;
