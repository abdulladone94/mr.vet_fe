import { Typography } from 'antd';
const { Title } = Typography;

const Text = ({ title, size }) => {
  return <Title className="!text-base md:!text-[40px] mb-5">{title}</Title>;
};

export default Text;
