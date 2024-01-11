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
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { CREATE_DOCTOR_ROUTE, LOGIN_ROUTE } from './constants/routes';
import ModalComponents from './ModalComponents';
import TextInputFields from './UI/InputFields/TextInputFields';
import { useDoctors } from '@/context/doctorContext';
import api from '@/api';
import toast from 'react-hot-toast';

const { Header } = Layout;

// const validatePassword = (rule, value) => {
//   return new Promise((resolve, reject) => {
//     const charRegex = /[a-zA-Z]/;
//     const specialCharRegex = /(?=.*[!@#$%^&*])/;

//     if (!value) {
//       resolve();
//     } else if (value.length < 8) {
//       reject('Your password must be at least 8 characters');
//     } else if (!charRegex.test(value)) {
//       reject('Your password must contain at least one letter.');
//     } else if (!specialCharRegex.test(value)) {
//       reject('Your password must contain at least one special letter.');
//     } else {
//       resolve();
//     }
//   });
// };

const HeaderSection = () => {
  const [user, setUser] = useState(getAuthUser());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState(null);
  const router = useRouter();
  const [form] = Form.useForm();
  const submitBtnRef = useRef();

  const { setSearchValue } = useDoctors();

  const handleLogout = () => {
    logout();
    setUser(null);
    router.push('/auth/login');
  };

  const items = [
    {
      key: '1',
      label: (
        <Link onClick={() => setIsModalOpen(true)} href={'/'}>
          Change Password
        </Link>
      ),
    },
    {
      key: '2',
      label: (
        <Link onClick={() => handleLogout()} href={'/'}>
          Log out
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
    console.log(values);
    setPasswordLoading(true);
    try {
      const body = {
        oldPassword: values.old_password,
        newPassword: values.password,
        userNameByAccessToken: null,
      };

      const res = await api.auth.changePassword(body);

      if (res.data.status === '404') {
        toast.error('Your old password is incorrect!');
      } else {
        toast.success('Password changed successfully!');

        setIsModalOpen(false);
        // fetchUserDetails();
        form.resetFields();
        handleLogout();
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
        <Link
          onClick={() => setSearchValue('')}
          href="/"
          className="hidden h-auto leading-none md:block"
        >
          <Image
            src="/vet_logo.png"
            width={720}
            height={720}
            alt="logo"
            priority={true}
            className="w-[150px] md:w-[220px] object-contain h-[64px] ml-16 pl-10"
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
              <FilledButton variant="primary" label="Add Doctor" />
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
                  // src={user.profile_img_url ?? '/public/mr.vet-login.jpeg'}
                  src={<UserOutlined />}
                  size={38}
                  className={`${!user.profile_img_url && 'bg-[#FD9340]'}`}
                >
                  {/* {user.full_name && user.full_name[0]} */}
                  {'Admin'}
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
            title="Current Password"
            rules={[{ message: 'Old Password is required!' }]}
            type="password"
          />

          <TextInputFields
            name="password"
            title="New Password"
            rules={[
              { message: 'New Password is required!' },
              // { validator: validatePassword },
            ]}
            type="password"
          />

          <TextInputFields
            name="c_password"
            title="Confirm New Password"
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

          <button type="primary" htmlType="submit" ref={submitBtnRef} />
        </Form>
      </ModalComponents>
    </Header>
  );
};

export default HeaderSection;
