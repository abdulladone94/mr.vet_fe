import { Breadcrumb, Layout, theme } from 'antd';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { Toaster } from 'react-hot-toast';
import Footer from '../Footer';

const HeaderSection = dynamic(() => import('@/components/Header'), {
  ssr: false,
});

const { Content } = Layout;

const AppLayout = ({ children }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const router = useRouter();
  const pathname = router.pathname.split('/');

  return (
    <Layout className="bg-white layout">
      <Toaster />
      <HeaderSection />
      <div>
        <div className="responsive">
          {/* {pathname[1] !== '' && pathname[1] !== 'createDoctor' && (
            <Breadcrumb
              className="my-5"
              items={pathname.map((path, i) => ({
                title: (
                  <p className="capitalize">
                    {path === ''
                      ? 'Home'
                      : path[0] === '['
                      ? 'Cases'
                      : path.replace('-', ' ')}
                  </p>
                ),
              }))}
            />
          )} */}
        </div>
        <div>{children}</div>
      </div>
      {/* <Footer style={{ textAlign: "center" }}>©2023 Booleanlabs</Footer>/ */}
      <Footer />
    </Layout>
  );
};

export default AppLayout;
