import { Space, Spin } from 'antd';
import React from 'react';

const FullPageLoader = () => {
  return (
    <div className="grid w-full h-screen place-items-center">
      <Spin size="large" />
    </div>
  );
};

export default FullPageLoader;
