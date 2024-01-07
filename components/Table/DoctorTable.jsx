import { Space, Table, Tag } from 'antd';

const DoctorTable = ({ data, columns }) => (
  <Table columns={columns} dataSource={data} />
);
export default DoctorTable;
