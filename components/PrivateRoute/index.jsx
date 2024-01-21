import { isLoggedIn, logout } from '@/utils/auth';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useIdleTimer } from 'react-idle-timer';
import { isBrowser } from '@/utils/lib';
import FullPageLoader from '../FullPageLoader';

const PrivateRoute = ({ children }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const loggedIn = isLoggedIn();

  const protectedRoutes = [
    '/',
    '/cases',
    '/doctors/createDoctor',
    '/doctors/[id]',
  ];

  const pathIsProtected = protectedRoutes.indexOf(router.pathname) !== -1;

  const onIdle = () => {
    logout();
    if (isBrowser()) {
      window.dispatchEvent(new Event('storage'));
    }
    router.push('/');
  };

  useIdleTimer({
    onIdle,
    crossTab: true,
    timeout: 1000 * 60 * 60 * 12,
    throttle: 500,
  });

  useEffect(() => {
    setLoading(false);
    if (!loading && !loggedIn && pathIsProtected) {
      router.push('/auth/login');
    }
  }, [loading, loggedIn, pathIsProtected]);

  if ((loading || !loggedIn) && pathIsProtected) {
    return <FullPageLoader />;
  }

  return children;
};

export default PrivateRoute;
