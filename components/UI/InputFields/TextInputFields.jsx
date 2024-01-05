import { Form, Input } from 'antd';
import React from 'react';

const TextInputFields = ({
  title,
  TitleLink,
  name,
  type,
  placeholder,
  rules,
  disabled,
  dependencies,
  required,
  addonBefore,
  pattern,
}) => {
  return (
    <Form.Item
      className="!w-full mb-2 lg:mb-4"
      name={name}
      rules={rules}
      dependencies={dependencies}
      required={false}
      label={
        title && (
          <div className="flex items-center justify-between w-full text-base">
            <div className="flex items-center justify-center text-base">
              <label className="font-bold text-[#475569]">{title}</label>
              {required && <span className="text-[#ff4d4f] text-xl">*</span>}
            </div>
            {TitleLink}
          </div>
        )
      }
    >
      <Input
        size="large"
        className="border-1 max-w-md bg-[#FCFCFD] border-[#CBD5E1] placeholder-[#CBD5E1] text-[#5a6063] hover:!border-indigo-400 focus:!border-indigo-400"
        placeholder={placeholder}
        type={type}
        disabled={disabled}
        addonBefore={addonBefore}
        pattern={pattern}
      />
    </Form.Item>
  );
};

export default TextInputFields;
