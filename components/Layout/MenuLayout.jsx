import { Layout, Menu, Select } from 'antd';
import { useRouter } from 'next/router';
import {
  InteractionOutlined,
  ProfileOutlined,
  SettingOutlined,
  PlusSquareOutlined,
} from '@ant-design/icons';
const { Sider } = Layout;

const items = [
  {
    key: `0`,
    label: (
      <>
        <PlusSquareOutlined className="mr-3" /> Doctors
      </>
    ),
    path: '/',
  },
  {
    key: `1`,
    label: (
      <>
        <ProfileOutlined className="mr-3" />
        Cases
      </>
    ),
    path: '/cases',
  },
];

const MenuLayout = ({ children }) => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-start w-full gap-16 mb-20 md:flex-row">
      <div className="w-full md:hidden">
        <Select
          defaultValue="/"
          className="border-1 w-full !bg-[#FCFCFD] !border-[#CBD5E1] !placeholder-[#CBD5E1] !text-[#5a6063] hover:!border-indigo-400 focus:!border-indigo-400"
          size="large"
          onChange={(e) => router.push(e)}
          options={[
            { value: '/', label: 'Doctors' },
            { value: '/cases', label: 'Cases' },
          ]}
        />
      </div>
      <Layout className="hidden md:block flex-none py-5 bg-white shadow-lg w-[230px] rounded-lg">
        <Sider>
          <Menu
            className="w-[230px] bg-white"
            onClick={(e) => router.push(items[e.key].path)}
            mode="inline"
            defaultSelectedKeys={['1']}
            style={{
              height: '100%',
            }}
            items={items}
            selectedKeys={
              items?.filter((x) => x.path === router.asPath)[0]?.key
            }
          />
        </Sider>
      </Layout>
      <div className="w-full mb-20">{children}</div>
    </div>
  );
};

export default MenuLayout;
