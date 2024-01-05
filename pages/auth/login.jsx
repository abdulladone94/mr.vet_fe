import { Form } from 'antd';
// import { FORGOT_PASSWORD_ROUTE, REGISTER_ROUTE } from '@/constants/routes';
import AuthFormLayout from '@/components/Layout/AuthFormLayout';

import Link from 'next/link';
import api from '@/api';
import { setAuth } from '@/utils/auth';
import { useRouter } from 'next/router';
import { useState } from 'react';

import TextInputFields from '@/components/UI/InputFields/TextInputFields';
import FilledButton from '@/components/UI/Buttons/FilledButton';

const LoginPage = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (values) => {
    setIsLoading(true);
    try {
      const body = {
        username: values.username,
        password: values.password,
      };

      const { data } = await api.auth.login(body);
      if (data.accesToken !== '') {
        setAuth(data);
        router.push('/');
      }
    } catch (error) {
      console.log(error);
      setError(error?.response?.data?.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex justify-center w-full">
      <AuthFormLayout
        title="Login to your account"
        image="/mr.vet-login.jpeg"
        error={error}
      >
        <Form
          layout="vertical"
          name="normal_login"
          className="w-full"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <TextInputFields
            name="username"
            title="Username"
            // type="email"
            required={true}
            rules={[
              { required: true, message: 'Username is required' },
              { message: 'Please enter a valid username' },
            ]}
          />

          <TextInputFields
            name="password"
            title="Password"
            type="password"
            required={true}
            // TitleLink={
            //   <Link
            //     className="login-form-forgot text-base !text-[#7d2b9a] font-semibold"
            //     href={FORGOT_PASSWORD_ROUTE}
            //   >
            //     Forgot password
            //   </Link>
            // }
            rules={[{ required: true, message: 'Password is required' }]}
          />

          <Form.Item className="mt-10">
            <FilledButton
              label="Login"
              variant="primary"
              type="submit"
              loading={isLoading}
              fullWidth
            />
          </Form.Item>
          {/* <Form.Item className="text-base font-semibold">
            New to Share Sugar?{' '}
            <Link
              className="float-right text-base !text-[#7d2b9a] font-semibold"
              href={REGISTER_ROUTE}
            >
              Create your account
            </Link>
          </Form.Item> */}
        </Form>
      </AuthFormLayout>
    </div>
  );
};

export default LoginPage;
