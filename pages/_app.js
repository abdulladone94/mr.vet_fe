import { DoctorProvider } from '@/context/doctorContext';
import { UserProvider } from '@/context/userContext';
import '@/styles/globals.css';
import dynamic from 'next/dynamic';
const Layout = dynamic(() => import('@/components/Layout/Layout'), {
  ssr: false,
});

export default function App({ Component, pageProps }) {
  return (
    <>
      <UserProvider>
        <DoctorProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </DoctorProvider>
      </UserProvider>
    </>
  );
}
