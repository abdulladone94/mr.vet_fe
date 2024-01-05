import { Space, Table, Tag } from 'antd';
// const columns = [
//   {
//     title: 'First Name',
//     dataIndex: 'name',
//     key: 'name',
//     render: (text) => <a>{text}</a>,
//   },
//   {
//     title: 'Last Name',
//     dataIndex: 'age',
//     key: 'age',
//   },
//   {
//     title: 'Email',
//     dataIndex: 'address',
//     key: 'address',
//   },
//   {
//     title: 'Mobile No',
//     dataIndex: 'address',
//     key: 'address',
//   },
//   {
//     title: 'Hospital Name',
//     dataIndex: 'address',
//     key: 'address',
//   },
//   {
//     title: 'Qualification',
//     dataIndex: 'address',
//     key: 'address',
//   },
//   {
//     title: 'Registration No',
//     dataIndex: 'address',
//     key: 'address',
//   },
//   //   {
//   //     title: 'Tags',
//   //     key: 'tags',
//   //     dataIndex: 'tags',
//   //     render: (_, { tags }) => (
//   //       <>
//   //         {tags.map((tag) => {
//   //           let color = tag.length > 5 ? 'geekblue' : 'green';
//   //           if (tag === 'loser') {
//   //             color = 'volcano';
//   //           }
//   //           return (
//   //             <Tag color={color} key={tag}>
//   //               {tag.toUpperCase()}
//   //             </Tag>
//   //           );
//   //         })}
//   //       </>
//   //     ),
//   //   },
//   {
//     title: 'Action',
//     key: 'action',
//     render: (_, record) => (
//       <Space size="middle">
//         <a>Edit</a>
//         <a>Delete</a>
//       </Space>
//     ),
//   },
// ];
// const data = [
//   {
//     key: '1',
//     name: 'John Brown',
//     age: 32,
//     address: 'New York No. 1 Lake Park',
//     tags: ['nice', 'developer'],
//   },
//   {
//     key: '2',
//     name: 'Jim Green',
//     age: 42,
//     address: 'London No. 1 Lake Park',
//     tags: ['loser'],
//   },
//   {
//     key: '3',
//     name: 'Joe Black',
//     age: 32,
//     address: 'Sydney No. 1 Lake Park',
//     tags: ['cool', 'teacher'],
//   },
// ];
const DoctorTable = ({ data, columns }) => (
  <Table columns={columns} dataSource={data} />
);
export default DoctorTable;
