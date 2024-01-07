import { DoctorProvider } from '@/context/doctorContext';
import '@/styles/globals.css';
import dynamic from 'next/dynamic';
const Layout = dynamic(() => import('@/components/Layout/Layout'), {
  ssr: false,
});

export default function App({ Component, pageProps }) {
  return (
    <>
      <DoctorProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </DoctorProvider>
    </>
  );
}
