import { Button, Form, Input, DatePicker, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import api from '@/api';

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';

const MultiSearchFilter = ({ setSearchValues }) => {
  const [allDoctors, setAllDoctors] = useState([]);
  console.log(allDoctors);

  const getAllDoctors = async (pageSize) => {
    try {
      const response = await api.doctor.getAllDoctors({
        // pageNo: page,
        // noOfItem: pageSize,
        pageNo: '1',
        noOfItem: '10000',
      });
      setAllDoctors(response.data.results || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllDoctors();
  }, []);

  const onFinish = (values) => {
    console.log(values);
    // console.log(values.dateRange[0].format('YYYY-MM-DD'));
    setSearchValues({
      toDate: values.dateRange?.[1]?.format('YYYY-MM-DD'),
      fromDate: values.dateRange?.[0]?.format('YYYY-MM-DD'),
      name: values.doctor,
      healthStatus: values.healthStatus,
    });
  };
  return (
    <Form onFinish={onFinish}>
      <div className="sm:flex">
        <div className="flex">
          <Form.Item name="healthStatus" className="m-0">
            <Select
              placeholder="Health status"
              className="pl-6 w-[308px]  md:w-[320px]"
              size={'large'}
              style={{
                width: 308,
              }}
              allowClear
              options={[
                {
                  value: 'Normal',
                  label: 'Normal',
                },
                {
                  value: 'Not Normal',
                  label: 'Not Normal',
                },
              ]}
            ></Select>
          </Form.Item>

          <Form.Item name="dateRange">
            <RangePicker
              className="mx-2 w-[308px]  md:w-[320px] border-1 w-full max-w-md bg-[#FCFCFD] border-[#CBD5E1] placeholder-[#CBD5E1] text-[#5a6063] hover:!border-indigo-400 focus:!border-indigo-400"
              size="large"
              // disabledDate={disabledDate}
              format={dateFormat}
            />
          </Form.Item>

          {/* <div className="relative shrink-0 w-full sm:w-[200px]"> */}
          <Form.Item name="doctor" className="m-0">
            <Select
              placeholder="Select doctor"
              className="pl-6 w-[308px]  md:w-[320px]"
              size={'large'}
              allowClear
              style={{
                width: 308,
              }}
              // showArrow={false}
              // bordered={false}
            >
              {allDoctors?.map((doctor) => (
                <Select.Option key={doctor.id} value={doctor.first_name}>
                  {doctor.first_name + ' ' + doctor.last_name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item>
            <Button
              htmlType="submit"
              className="bg-[#FD9340]  h-10 rounded-md ml-1 w-[308px]  md:w-[320px]"
              icon={<SearchOutlined />}
            />
          </Form.Item>
        </div>
      </div>
    </Form>
  );
};

export default MultiSearchFilter;
