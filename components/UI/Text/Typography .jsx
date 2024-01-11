import { Typography } from 'antd';
const { Title } = Typography;

const Text = ({ title, size }) => {
  return <Title level={size}>{title}</Title>;
};

export default Text;
