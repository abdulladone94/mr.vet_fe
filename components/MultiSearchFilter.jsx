import { Button, Form, Input, DatePicker, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';

const MultiSearchFilter = ({ setSearchValues }) => {
  const onFinish = (values) => {
    console.log(values);
    // console.log(values.dateRange[0].format('YYYY-MM-DD'));
    setSearchValues({
      toDate: values.dateRange?.[1]?.format('YYYY-MM-DD'),
      fromDate: values.dateRange?.[0]?.format('YYYY-MM-DD'),
      name: values.searchText,
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
            >
              {/* {locations?.map((location) => (
                <Select.Option
                  key={location.locationId}
                  value={location.locationId}
                >
                  {location.locationName}
                </Select.Option>
              ))} */}
            </Select>
          </Form.Item>

          <Form.Item name="dateRange">
            <RangePicker
              className="mx-2 w-[308px]  md:w-[320px] border-1 w-full max-w-md bg-[#FCFCFD] border-[#CBD5E1] placeholder-[#CBD5E1] text-[#5a6063] hover:!border-indigo-400 focus:!border-indigo-400"
              size="large"
              // disabledDate={disabledDate}
              format={dateFormat}
            />
          </Form.Item>
          <Form.Item name="searchText">
            <Input
              className="w-[308px] xl:w-[546px] md:w-[320px] rounded-md h-10"
              style={{ width: '300px' }}
              placeholder="Search Cases"
              // value={form.getFieldValue('searchText')}
              // onChange={(e) =>
              //   form.setFieldsValue({ searchText: e.target.value })
              // }
              allowClear
            />
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
