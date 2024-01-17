import { Card, Checkbox, Form, Radio, Spin, Upload, message } from 'antd';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import TextInputFields from '@/components/UI/InputFields/TextInputFields';
import FilledButton from '@/components/UI/Buttons/FilledButton';
import api from '@/api';
import { isLoggedIn } from '@/utils/auth';
import toast from 'react-hot-toast';

const validatePhoneNumber = (rule, value) => {
  return new Promise((resolve, reject) => {
    // const phoneNumberRegex = /^\+?\d{10,11}$/;
    const phoneNumberRegex = /^[\d\s()+-]{1,14}$/;
    if (!value) {
      // If value is empty or undefined, skip validation
      resolve();
    } else if (value.length > 14) {
      // If value has more than 12 characters, show an error message
      reject('Please enter a phone number with a maximum of 14 digits');
    } else if (!phoneNumberRegex.test(value)) {
      // If value doesn't match the phone number regex, show an error message
      reject('Please enter a valid phone number');
    } else {
      // Otherwise, the validation passed
      resolve();
    }
  });
};

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

const createDoctor = () => {
  const router = useRouter();
  const { query } = router;
  const editDoctorDetails = query.doctor ? JSON.parse(query.doctor) : {};
  const isUpdate = !!editDoctorDetails.id;

  const initialValue = {
    first_name: editDoctorDetails.fName || '',
    last_name: editDoctorDetails.lName || '',
    email: editDoctorDetails.email || '',
    phone_number: editDoctorDetails.mobile || '',
    hospital_name: editDoctorDetails.hospital || '',
    qualifications: editDoctorDetails.qualification || '',
    registration_number: editDoctorDetails.registration || '',
    password: '',
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  // const [error, setError] = useState(null);

  const loggedIn = isLoggedIn();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    setIsSubmitting(true);
    try {
      const body = {
        id: editDoctorDetails.id?.toString(),
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        phone_number: values.phone_number,
        hospital_name: values.hospital_name,
        qualifications: values.qualifications,
        registration_number: values.registration_number,
        password: values.password,
      };

      if (isUpdate) {
        response = await api.doctor.updateDoctor(body);
      } else {
        response = await api.doctor.createDoctor(body);
      }
      form.resetFields();
      setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(false);
      console.log('>>', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (value) => {
    try {
      await onFinish(value);
      toast.success(`Doctor is ${isUpdate ? 'updated' : 'created'}`);
      router.push('/');
    } catch {
      toast.error('Something went wrong, Try again later!');
    }
  };

  return (
    <div className="responsive">
      {isSubmitting && (
        <div className="grid h-screen place-content-center">
          <Spin />
        </div>
      )}

      <Form
        layout="vertical"
        initialValues={initialValue}
        style={{
          maxWidth: 600,
        }}
        disabled={!loggedIn}
        onFinish={handleSubmit}
        form={form}
        scrollToFirstError
      >
        {(values, formInstance) => {
          return (
            <>
              <h1 className="mb-10 text-3xl font-semibold">Add Doctor</h1>

              <TextInputFields
                name="first_name"
                title="First Name"
                required={true}
                rules={[
                  {
                    required: true,
                    message: 'First Name is required!',
                  },
                  {
                    max: 20,
                    message: 'First Name cannot be more than 20 characters.',
                  },
                ]}
              />
              <TextInputFields
                name="last_name"
                title="Last Name"
                required={true}
                rules={[
                  {
                    required: true,
                    message: 'Last Name is required!',
                  },
                  {
                    max: 20,
                    message: 'Last Name cannot be more than 20 characters.',
                  },
                ]}
              />

              <TextInputFields
                name="email"
                title="Email"
                required={true}
                rules={[
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                  {
                    required: true,
                    message: 'E-mail is required',
                  },
                ]}
                // disabled
              />
              <TextInputFields
                name="phone_number"
                title="Mobile Number"
                required={true}
                rules={[
                  { required: true, message: 'Mobile Number is required' },
                  { validator: validatePhoneNumber },
                ]}
              />
              <TextInputFields
                name="hospital_name"
                title="Hospital Name"
                required={false}
                // rules={[
                //   { required: false, message: 'Hospital Name is required' },
                // ]}
              />
              <TextInputFields
                name="qualifications"
                title="Qualification"
                required={false}
                // rules={[
                //   { required: false, message: 'Qualification is required' },
                // ]}
              />
              <TextInputFields
                name="registration_number"
                title="Registration Number"
                required={true}
                rules={[
                  {
                    required: true,
                    message: 'Registration Number is required',
                  },
                ]}
              />
              <TextInputFields
                name="password"
                title="Password"
                required={true}
                rules={[
                  { required: true, message: 'New Password is required!' },
                ]}
                type="password"
              />

              <TextInputFields
                name="c_password"
                title="Confirm Password"
                required={true}
                rules={[
                  { required: true, message: 'Confirm Password is required!' },
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

              <Form.Item>
                <FilledButton
                  variant="primary"
                  label={isUpdate ? 'Update' : 'Add'}
                  type="submit"
                  loading={isSubmitting}
                />
              </Form.Item>
            </>
          );
        }}
      </Form>
    </div>
  );
};

export default createDoctor;
