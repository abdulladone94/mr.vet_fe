import PrivateRoute from '@/components/PrivateRoute';
import { DoctorProvider } from '@/context/doctorContext';
import { UserProvider } from '@/context/userContext';
import '@/styles/globals.css';
import dynamic from 'next/dynamic';
const Layout = dynamic(() => import('@/components/Layout/Layout'), {
  ssr: false,
});

export default function App({ Component, pageProps }) {
  const auth = Component.auth;
  return (
    <>
      <PrivateRoute>
        <UserProvider>
          <DoctorProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </DoctorProvider>
        </UserProvider>
      </PrivateRoute>
      {/* {auth ? (
        <PrivateRoute>
          <DoctorProvider>
            <UserProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </UserProvider>
          </DoctorProvider>
        </PrivateRoute>
      ) : (
        <Component {...pageProps} />
      )} */}
    </>
  );
}
