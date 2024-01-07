import { Button, Form, DatePicker } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import moment from 'moment';

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';
const disabledDate = (current) => {
  // Can not select days before today and today
  return current && current < moment().endOf('day');
};

const DateSearchFilters = ({ setSearchDate }) => {
  const onFinish = (values) => {
    // console.log(values.dateRange[0].format('YYYY-MM-DD'));
    setSearchDate({
      toDate: values.dateRange[1].format('YYYY-MM-DD'),
      fromDate: values.dateRange[0].format('YYYY-MM-DD'),
    });
  };
  return (
    <Form onFinish={onFinish}>
      <div className="sm:flex">
        <div className="flex">
          <Form.Item name="dateRange">
            <RangePicker
              className="border-1 w-full max-w-md bg-[#FCFCFD] border-[#CBD5E1] placeholder-[#CBD5E1] text-[#5a6063] hover:!border-indigo-400 focus:!border-indigo-400"
              size="large"
              // disabledDate={disabledDate}
              format={dateFormat}
            />
          </Form.Item>

          <Form.Item>
            <Button
              htmlType="submit"
              className="bg-[#FD9340] w-8 h-10 rounded-md ml-1"
              icon={<SearchOutlined />}
            />
          </Form.Item>
        </div>
      </div>
    </Form>
  );
};
export default DateSearchFilters;
