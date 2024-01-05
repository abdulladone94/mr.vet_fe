// import {
//   CREATE_SUGAR_POST_ROUTE,
//   LOGIN_ROUTE,
//   MY_SUGAR_POST_ROUTE,
//   REGISTER_ROUTE,
// } from '@/constants/routes';
import { logout } from '@/utils/auth';
import { getAuthUser } from '@/utils/auth';
import { isBrowser } from '@/utils/lib';
import { Space, Dropdown, Avatar, Button, Form } from 'antd';
import { Layout } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import FilledButton from './UI/Buttons/FilledButton';
import { DownOutlined } from '@ant-design/icons';
import { CREATE_DOCTOR_ROUTE, LOGIN_ROUTE } from './constants/routes';
import ModalComponents from './ModalComponents';
import TextInputFields from './UI/InputFields/TextInputFields';

const { Header } = Layout;

const validatePassword = (rule, value) => {
  return new Promise((resolve, reject) => {
    const charRegex = /[a-zA-Z]/;
    const specialCharRegex = /(?=.*[!@#$%^&*])/;

    if (!value) {
      resolve();
    } else if (value.length < 8) {
      reject('Your password must be at least 8 characters');
    } else if (!charRegex.test(value)) {
      reject('Your password must contain at least one letter.');
    } else if (!specialCharRegex.test(value)) {
      reject('Your password must contain at least one special letter.');
    } else {
      resolve();
    }
  });
};

const HeaderSection = () => {
  const [user, setUser] = useState(getAuthUser());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState(null);
  const router = useRouter();
  const [form] = Form.useForm();
  const submitBtnRef = useRef();

  const handleLogout = () => {
    logout();
    setUser(null);
    router.push('/');
  };

  const items = [
    {
      key: '1',
      label: (
        <Link onClick={() => handleLogout()} href={'/'}>
          Log out
        </Link>
      ),
    },
    {
      key: '2',
      label: (
        <Link onClick={() => setIsModalOpen(true)} href={'/'}>
          Change Password
        </Link>
      ),
    },
  ];

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event) {
        setUser(getAuthUser());
      }
    };

    if (isBrowser()) {
      window.addEventListener('storage', handleStorageChange);
    }

    return () => {
      if (isBrowser()) {
        window.removeEventListener('storage', handleStorageChange);
      }
    };
  }, []);

  const onChangePassword = async (values) => {
    setPasswordLoading(true);
    try {
      const body = {
        oldPassword: values.old_password,
        newPassword: values.password,
        userNameByAccessToken: null,
      };

      const res = await api.user.changePassword(body);

      if (res.data.status === '404') {
        toast.error('Your old password is incorrect!');
      } else {
        toast.success('Password changed successfully!');

        setIsModalOpen(false);
        fetchUserDetails();
        form.resetFields();
      }
    } catch (error) {
      toast.error('Something went wrong!');
      console.log(error);
    }
    setPasswordLoading(false);
  };

  return (
    <Header className="bg-white rounded-b-2xl shadow-xl h-16 !p-0 z-50">
      <div className="flex items-center justify-between px-5 md:px-10">
        <Link href="/" className="hidden h-auto leading-none md:block">
          <Image
            src="/vet_logo.png"
            width={720}
            height={720}
            alt="logo"
            priority={true}
            className="w-[150px] md:w-[220px] object-contain h-[64px]"
          />
        </Link>

        <Link href="/" className="h-auto leading-none md:hidden">
          <Image
            // src="/mr.vet-login.jpeg"
            src="/public/vet_logo.png"
            width={720}
            height={720}
            alt="logo"
            priority={true}
            className="w-[50px] object-contain h-auto"
          />
        </Link>

        {user ? (
          <div className="flex items-center md:gap-1">
            <Link href={CREATE_DOCTOR_ROUTE}>
              <FilledButton variant="primary" label="Create Doctor" />
            </Link>

            <Dropdown
              className="border-0 shadow-none hover:!text-[#b462d1]"
              menu={{
                items,
              }}
              placement="bottomLeft"
              arrow
            >
              <Button className="flex items-center gap-2">
                <p className="!hidden md:!block font-bold   whitespace-pre-wrap overflow-hidden text-right leading-4 break-words max-w-[120px]">
                  {user.full_name}
                </p>
                <Avatar
                  src={user.profile_img_url ?? null}
                  size={38}
                  className={`${!user.profile_img_url && 'bg-[orange]'}`}
                >
                  {user.full_name && user.full_name[0]}
                </Avatar>
                <DownOutlined />
              </Button>
            </Dropdown>
          </div>
        ) : (
          <Space>
            <Link href={LOGIN_ROUTE}>
              <FilledButton variant="primary" label="Login" size="medium" />
            </Link>
            {/* <Link href={REGISTER_ROUTE}>
              <FilledButton
                variant="secondary"
                label="Register"
                size="medium"
              />
            </Link> */}
          </Space>
        )}
      </div>
      <ModalComponents
        title="Change Password"
        isModalOpen={isModalOpen}
        setIsModalOpen={() => setIsModalOpen(false)}
        handleOkClick={() => submitBtnRef.current.click()}
        confirmLoading={passwordLoading}
        error={passwordError}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onChangePassword}
          form={form}
        >
          <TextInputFields
            name="old_password"
            title="Old password"
            rules={[{ message: 'Old Password is required!' }]}
            type="password"
          />

          <TextInputFields
            name="password"
            title="New password"
            rules={[
              { message: 'New Password is required!' },
              { validator: validatePassword },
            ]}
            type="password"
          />

          <TextInputFields
            name="c_password"
            title="Confirm password"
            rules={[
              {
                message: 'Confirm Password is required!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      'The two passwords that you entered do not match!'
                    )
                  );
                },
              }),
            ]}
            dependencies={['password']}
            type="password"
          />

          <div style={{ display: 'none' }}>
            <Form.Item>
              <Button type="primary" htmlType="submit" ref={submitBtnRef}>
                Submit
              </Button>
            </Form.Item>
          </div>
        </Form>
      </ModalComponents>
    </Header>
  );
};

export default HeaderSection;
