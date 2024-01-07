import { Button, Form, Input, DatePicker } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import DateRangePicker from './DateRangePicker';
import moment from 'moment';
import { useDoctors } from '@/context/doctorContext';
import { useEffect } from 'react';

const { RangePicker } = DatePicker;
const disabledDate = (current) => {
  // Can not select days before today and today
  return current && current < moment().endOf('day');
};

const SearchFilters = ({ placeholder }) => {
  const { searchValue, setSearchValue } = useDoctors();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log(values);
    setSearchValue(values?.searchText);
  };
  useEffect(() => {
    form.setFieldValue('searchText', searchValue);
  }, [searchValue]);

  return (
    <Form onFinish={onFinish}>
      <div className="sm:flex">
        <div className="flex">
          <Form.Item name="searchText">
            <Input
              className="w-[308px] xl:w-[546px] md:w-[320px] rounded-md h-10 ml-5"
              placeholder={placeholder}
              // value={searchValue}
              // onChange={(e) =>
              //   form.setFieldsValue({ searchText: e.target.value })
              // }
              allowClear
            />
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              className="bg-[#7D2B9A] w-8 h-10 rounded-md"
              icon={<SearchOutlined />}
            />
          </Form.Item>
        </div>
      </div>
    </Form>
  );
};
export default SearchFilters;
