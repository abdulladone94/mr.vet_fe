import { Breadcrumb } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';

const BreadCrumb = () => {
  const router = useRouter();
  const pathname = router.pathname.split('/');
  console.log(pathname);

  return (
    <div>
      <Breadcrumb
        className="my-5"
        items={
          pathname.map((path) => ({
            title: <p>{path === '' ? 'Doctor' : ''}</p>,
          }))

          //   {
          //     title: <p>{pathname[1] === '' ? 'Doctors' : path}</p>,
          //   },
          //   {
          //     title: <a href="">Application Center</a>,
          //   },
          //   {
          //     title: <a href="">Application List</a>,
          //   },
          //   {
          //     title: 'An Application',
          //   },
        }
      />
    </div>
  );
};

export default BreadCrumb;
