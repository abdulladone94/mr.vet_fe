import { Button } from 'antd';
import React from 'react';

const FilledButton = ({
  label,
  variant,
  onClick,
  fullWidth,
  loading,
  type,
  size,
}) => {
  const style = {
    primary: 'bg-[#7D2B9A] text-white hover:!bg-[#a43ac9] hover:!text-white',
    secondary:
      'bg-gray-300 text-gray-600 hover:bg-gray-400 hover:!text-gray-600',
  };

  return (
    <Button
      htmlType={type ?? 'button'}
      onClick={() => onClick && onClick()}
      className={`border-0 font-semibold min-w-[100px] ${style[variant]}`}
      size={size || 'large'}
      block={fullWidth}
      loading={loading}
    >
      {label}
    </Button>
  );
};

export default FilledButton;
