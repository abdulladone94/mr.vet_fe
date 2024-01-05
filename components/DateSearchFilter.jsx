import { Button, Cascader, Form, Input, Select, DatePicker } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import DateRangePicker from './DateRangePicker';
import moment from 'moment';

const { RangePicker } = DatePicker;
const disabledDate = (current) => {
  // Can not select days before today and today
  return current && current < moment().endOf('day');
};

const DateSearchFilters = ({ placeholder }) => {
  const onFinish = (values) => {
    console.log(values);
  };
  return (
    <Form onFinish={onFinish}>
      <div className="sm:flex">
        {/* <div className="w-[340px] lg:w-[248px] md:w-[152px]"> */}
        {/* <Form.Item name="category">
            <Cascader
              placeholder="Doctors"
              options={[
                {
                  value: 'vehicles',
                  label: 'Vehicles',
                  children: [
                    {
                      value: 'bus',
                      label: 'Bus',
                    },
                    {
                      value: 'car',
                      label: 'Car',
                    },
                    {
                      value: 'van',
                      label: 'Van',
                    },
                    {
                      value: 'other',
                      label: 'Other',
                    },
                  ],
                },
                { value: 'property', label: 'Property', children: [] },
                { value: 'services', label: 'Services', children: [] },
                { value: 'equipments', label: 'Equipments', children: [] },
              ]}
            />
          </Form.Item> */}
        {/* </div> */}

        {/* <div className="w-[340px] lg:w-[248px] md:w-[152px] md:mx-4 lg:mx-8 sm:my-0 my-6">
          <Form.Item name="location">
            <Select placeholder="Cases">
              <Select.Option value="Baltimore">Case 1</Select.Option>
            </Select>
          </Form.Item>
        </div> */}

        <div className="flex">
          {/* <Form.Item
          //   label={
          //     <div className="flex justify-between w-full text-base">
          //       <label className=" font-bold text-[#475569]">{title}</label>
          //     </div>
          //   }
          //   name={name}
          //   className="w-full mb-2 lg:mb-4"
          >
            <RangePicker
              className="border-1 w-full max-w-md bg-[#FCFCFD] border-[#CBD5E1] placeholder-[#CBD5E1] text-[#5a6063] hover:!border-indigo-400 focus:!border-indigo-400"
              size="large"
              disabledDate={disabledDate}
              format={dateFormat}
            />
          </Form.Item> */}
          <Form.Item
            name="dateRange"
            //   label={
            //     <div className="flex justify-between w-full text-base">
            //       <label className=" font-bold text-[#475569]">{title}</label>
            //     </div>
            //   }
            //   name={name}
            //   className="w-full mb-2 lg:mb-4"
          >
            <RangePicker
              className="border-1 w-full max-w-md bg-[#FCFCFD] border-[#CBD5E1] placeholder-[#CBD5E1] text-[#5a6063] hover:!border-indigo-400 focus:!border-indigo-400"
              size="large"
              disabledDate={disabledDate}
              // format={dateFormat}
            />
          </Form.Item>
          <Form.Item name="searchText">
            <Input
              className="w-[308px] xl:w-[546px] md:w-[320px] rounded-md h-10 ml-5"
              placeholder={placeholder}
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
          {/* <DateRangePicker /> */}
        </div>
      </div>
    </Form>
  );
};
export default DateSearchFilters;
