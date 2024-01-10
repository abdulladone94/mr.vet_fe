import { Card, Checkbox, Form, Radio, Spin, Upload, message } from 'antd';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import Image from 'next/image';
import TextInputFields from '@/components/UI/InputFields/TextInputFields';
import FilledButton from '@/components/UI/Buttons/FilledButton';
import api from '@/api';
import { isLoggedIn } from '@/utils/auth';
import toast from 'react-hot-toast';

const validatePhoneNumber = (rule, value) => {
  return new Promise((resolve, reject) => {
    const phoneNumberRegex = /^\+?\d{10,11}$/;
    if (!value) {
      // If value is empty or undefined, skip validation
      resolve();
    } else if (value.length > 12) {
      // If value has more than 12 characters, show an error message
      reject('Please enter a phone number with a maximum of 12 digits');
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
                required={true}
                rules={[
                  { required: false, message: 'Hospital Name is required' },
                ]}
              />
              <TextInputFields
                name="qualifications"
                title="Qualification"
                required={true}
                rules={[
                  { required: false, message: 'Qualification is required' },
                ]}
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
                rules={[
                  { required: true, message: 'New Password is required!' },
                ]}
                type="password"
              />

              <TextInputFields
                name="c_password"
                title="Confirm Password"
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

// import { Card, Checkbox, Form, Radio, Spin, Upload, message } from 'antd';
// import { useEffect, useState } from 'react';

// import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
// import dayjs from 'dayjs';
// import customParseFormat from 'dayjs/plugin/customParseFormat';
// dayjs.extend(customParseFormat);

// import api from '@/api';
// import { isLoggedIn } from '@/utils/auth';
// import { useRouter } from 'next/router';
// // import moment from 'moment';
// // import { useMasterData } from '@/context/MasterContext';
// // import RichTextEditor from '../UI/RichTextEditor';
// import Image from 'next/image';
// // import SearchDropdown from '../SearchDropdown';
// import { toast } from 'react-hot-toast';
// import TextInputFields from '@/components/UI/InputFields/TextInputFields';
// // import SelectField from '../UI/InputFields/SelectField';
// // import DateRangePicker from '../UI/DatePicker/DateRangePicker';
// import FilledButton from '@/components/UI/Buttons/FilledButton';

// const normFile = (e) => {
//   if (Array.isArray(e)) {
//     return e;
//   }
//   return e?.fileList;
// };

// const CreateDoctor = () => {
//   const [initialValue, setInitialValue] = useState(null);
//   const [postType, setPostType] = useState('1');

//   const [description, setDescription] = useState('');
//   const [alertMessage, setAlertMessage] = useState(null);
//   const [subCategories, setSubCategories] = useState([]);
//   //   const { categories, locations } = useMasterData();
//   const [isLoading, setIsLoading] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const [selectedPictures, setSelectedPictures] = useState([]);

//   const [disabled, setDisabled] = useState(false);
//   const [isGlobal, setIsGlobal] = useState(false);

//   const [locationOptions, setLocationOptions] = useState([]);
//   const [categoryOptions, setCategoryOptions] = useState([]);
//   const [error, setError] = useState(null);
//   const loggedIn = isLoggedIn();
//   const router = useRouter();
//   const { query } = router;

//   const [form] = Form.useForm();
//   const dateFormat = 'YYYY/MM/DD';

//   //   // handle createOffer
//   //   useEffect(() => {
//   //     if (query && query["create-offer"]) {
//   //       setPostType("2");
//   //       setDisabled(true);
//   //     }
//   //   }, [query["create-offer"]]);

//   //   const handleCategoryChange = (value) => {
//   //     setSubCategories(
//   //       categories
//   //         .filter((x) => x.categoryId === value)[0]
//   //         ?.subCategoryList.map((category) => ({
//   //           value: category.subCategoryId,
//   //           name: category.subCategoryName,
//   //         }))
//   //     );
//   //   };

//   //   const onFinish = async (values) => {
//   //     setIsSubmitting(true);
//   //     try {
//   //       let formdata = new FormData();
//   //       const body = {
//   //         title: values.title,
//   //         description: description,
//   //         value: values.estimate,
//   //         categoryId: values.category,
//   //         subCategoryId: values.sub_category,
//   //         locationId: values.location,
//   //       };

//   //       if (
//   //         dayjs(values.available_date?.[1]).format("YYYY-MM-DD") >
//   //         new Date().toISOString().split("T")[0]
//   //       ) {
//   //         body["availableStartDate"] = dayjs(values.available_date?.[0]).format(
//   //           "YYYY-MM-DD"
//   //         );
//   //         body["availableEndDate"] = dayjs(values.available_date?.[1]).format(
//   //           "YYYY-MM-DD"
//   //         );
//   //       }

//   //       if (!query.sugarId) {
//   //         body["statusId"] = 1;
//   //         body["sugarPostTypeId"] = postType;
//   //       }

//   //       if (query["create-offer"]) {
//   //         body["isGlobal"] = isGlobal;
//   //       }

//   //       formdata.append("data", JSON.stringify(body));

//   //       if (values.picture?.length > 0) {
//   //         values.picture?.forEach((picture) => {
//   //           formdata.append("file", picture.originFileObj);
//   //         });
//   //       } else {
//   //         const emptyFile = new Blob([], { type: "application/octet-stream" });
//   //         formdata.append("file", emptyFile, "empty.txt");
//   //       }

//   //       let response;
//   //       if (query.sugarId) {
//   //         response = await api.sugar.update(formdata, query.sugarId);

//   //         if (response.data.status === "500") {
//   //           await setError(response.data.message);
//   //           throw 500;
//   //         } else {
//   //           fetchSugarPost();
//   //         }
//   //       } else {
//   //         response = await api.sugar.create(formdata);
//   //         if (response.data.status === "500") {
//   //           await setError(response.data.message);
//   //           throw 500;
//   //         } else {
//   //           form.resetFields();
//   //           setDescription("");
//   //           setPostType("1");
//   //           setIsGlobal(false);

//   //           if (response.data.other && query["create-offer"]) {
//   //             await api.sugar.createSugarPostRequest(
//   //               query["create-offer"],
//   //               response.data.other
//   //             );
//   //           }
//   //         }
//   //       }
//   //       setIsSubmitting(false);
//   //     } catch (error) {
//   //       setIsSubmitting(false);
//   //       console.log(">>", error);
//   //       throw error;
//   //     }
//   //   };

//   //   const handleSubmit = async (value) => {
//   //     try {
//   //       await onFinish(value),
//   //         toast.success(
//   //           `Doctor ${query.sugarId ? "updated" : "created"} ${
//   //             query["create-offer"] ? " & request sent" : ""
//   //           }!`
//   //         );
//   //       router.push("/profile/my-sugar-posts");
//   //     } catch {
//   //       toast.error("Something went wrong, try again later!");
//   //     }
//   //   };

//   //   const fetchSugarPost = async () => {
//   //     setIsLoading(true);
//   //     try {
//   //       const res = await api.sugar.getById(query.sugarId);

//   //       setSubCategories(
//   //         categories
//   //           ?.filter((x) => x.categoryName === res.data.category)[0]
//   //           ?.subCategoryList?.map((category) => ({
//   //             value: category.subCategoryId,
//   //             name: category.subCategoryName,
//   //           }))
//   //       );
//   //       setDescription(res.data.description);
//   //       setSelectedPictures(res.data.imageObjectList || []);
//   //       const init = {
//   //         title: res.data.title,
//   //         location: locations.find((x) => x.locationName === res.data.location)
//   //           ?.locationId,

//   //         category: categories.find((x) => x.categoryName === res.data.category)
//   //           ?.categoryId,

//   //         sub_category: categories
//   //           .filter((x) => x.categoryName === res.data.category)[0]
//   //           ?.subCategoryList?.find(
//   //             (x) => x.subCategoryName === res.data.subCategory
//   //           ).subCategoryId,

//   //         estimate: res.data.value,
//   //         description: res.data.description,
//   //         available_date: [],
//   //       };

//   //       if (res.data.availableStartDate) {
//   //         init["available_date"] = [
//   //           res.data.availableStartDate &&
//   //             dayjs(res.data.availableStartDate, dateFormat),
//   //           res.data.availableEndDate &&
//   //             dayjs(res.data.availableEndDate, dateFormat),
//   //         ];
//   //       }

//   //       if (res.data.sugarPostType === "sharesugar") {
//   //         setPostType("2");
//   //       }
//   //       setInitialValue(init);
//   //     } catch (error) {
//   //       console.log(error);
//   //     }
//   //     setIsLoading(false);
//   //   };

//   //   const deleteImage = async (id) => {
//   //     try {
//   //       await api.sugar.deleteImage(id);
//   //       fetchSugarPost();
//   //     } catch (error) {
//   //       console.log(error);
//   //     }
//   //   };

//   //   const handleDeleteImage = async (id) => {
//   //     toast.promise(deleteImage(id), {
//   //       loading: `Deleting...`,
//   //       success: `Sugar image deleted!`,
//   //       error: "Something went wrong, try again later!",
//   //     });
//   //   };

//   //   function beforeUpload(file) {
//   //     const MAX_FILE_SIZE = 2;

//   //     const isSizeValid = file.size / 1024 / 1024 < MAX_FILE_SIZE;
//   //     if (!isSizeValid) {
//   //       message.error(`File must be smaller than ${MAX_FILE_SIZE}MB!`);
//   //     }
//   //     return isSizeValid;
//   //   }

//   //   useEffect(() => {
//   //     if (query.sugarId) {
//   //       fetchSugarPost();
//   //     } else {
//   //       setInitialValue({
//   //         title: "",
//   //         location: "",
//   //         category: "",
//   //         sub_category: "",
//   //         description: "",
//   //         estimate: "",
//   //         available_date: [],
//   //         picture: [],
//   //       });
//   //     }
//   //   }, [query.sugarId]);

//   //   useEffect(() => {
//   //     if (locations) {
//   //       const option = locations.map((location) => ({
//   //         value: location.locationId,
//   //         name: location.locationName,
//   //       }));

//   //       setLocationOptions(option);
//   //     }

//   //     if (categories) {
//   //       const option = categories.map((category) => ({
//   //         value: category.categoryId,
//   //         name: category.categoryName,
//   //       }));

//   //       setCategoryOptions(option);
//   //     }
//   //   }, [locations, categories]);

//   return (
//     <div className="responsive">
//       {/* <div className="my-10">
//         <SearchDropdown />
//       </div> */}
//       {isLoading && (
//         <div className="grid h-screen place-content-center">
//           <Spin />
//         </div>
//       )}
//       {initialValue && (
//         <Form
//           layout="vertical"
//           initialValues={initialValue}
//           style={{
//             maxWidth: 600,
//           }}
//           //   disabled={!loggedIn}
//           onFinish={handleSubmit}
//           form={form}
//           scrollToFirstError
//         >
//           {(values, formInstance) => {
//             return (
//               <>
//                 <h1 className="mb-10 text-3xl font-semibold">
//                   {query.sugarId ? 'Update' : 'Create a new'} Doctor
//                 </h1>
//                 {/* <Form.Item
//                   label={
//                     <div className="flex justify-between w-full text-base">
//                       <label className=" font-bold text-[#475569]">
//                         Select the post type
//                       </label>
//                     </div>
//                   }
//                 >
//                   <Radio.Group
//                     disabled={disabled | !!query.sugarId}
//                     onChange={(e) => setPostType(e.target.value)}
//                     value={postType}
//                   >
//                     <Radio value={'1'}>Want Sugar</Radio>
//                     <Radio value={'2'}>Share Sugar</Radio>
//                   </Radio.Group>
//                 </Form.Item> */}

//                 <TextInputFiels
//                   name="title"
//                   title="Title"
//                   required={true}
//                   rules={[
//                     {
//                       required: true,
//                       message: 'Title is required!',
//                     },
//                     {
//                       max: 150,
//                       message:
//                         'Description cannot be more than 150 characters.',
//                     },
//                   ]}
//                 />

//                 {/* <SelectField
//                   title="Location"
//                   name="location"
//                   required={true}
//                   rules={[
//                     {
//                       required: true,
//                       message: 'Location is required!',
//                     },
//                   ]}
//                   options={locationOptions}
//                 />

//                 <SelectField
//                   title="Category"
//                   name="category"
//                   required={true}
//                   rules={[
//                     {
//                       required: true,
//                       message: 'Category is required!',
//                     },
//                   ]}
//                   options={categoryOptions}
//                   onChange={(e) => handleCategoryChange(e)}
//                 />

//                 <SelectField
//                   title="Sub category"
//                   name="sub_category"
//                   required={true}
//                   rules={[
//                     {
//                       required: true,
//                       message: 'Sub Category is required!',
//                     },
//                   ]}
//                   options={subCategories}
//                 /> */}

//                 {/* <RichTextEditor
//                   name="description"
//                   title="Description"
//                   required={true}
//                   rules={[
//                     {
//                       message: 'Description is required!',
//                     },
//                     {
//                       max: 255,
//                       message:
//                         'Description cannot be more than 255 characters.',
//                     },
//                   ]}
//                   onChange={(e) => setDescription(e)}
//                   initialValue={description}
//                   error={formInstance.getFieldError('description')}
//                 /> */}

//                 <TextInputFiels
//                   name="estimate"
//                   title="Estimated value"
//                   addonBefore="USD"
//                   rules={[
//                     {
//                       pattern: /^[0-9]+$/,
//                       message: 'Please enter a value',
//                     },
//                   ]}
//                 />

//                 {/* <DateRangePicker
//                   name="available_date"
//                   title="Available date"
//                   format={dateFormat}
//                 /> */}

//                 {/* {selectedPictures && (
//                   <div className="grid grid-cols-4 gap-2 my-5">
//                     {selectedPictures.map((pic, i) => (
//                       <Card
//                         key={pic.imageId}
//                         bodyStyle={{ padding: '0' }}
//                         cover={
//                           <Image
//                             alt="example"
//                             src={pic.imageUrl}
//                             className="object-cover h-28"
//                             width={720}
//                             height={720}
//                           />
//                         }
//                         actions={[
//                           <DeleteOutlined
//                             key="delete"
//                             onClick={() => handleDeleteImage(pic.imageId)}
//                           />,
//                         ]}
//                       ></Card>
//                     ))}
//                   </div>
//                 )} */}

//                 {/* {selectedPictures?.length < 4 && (
//                   <Form.Item
//                     label={
//                       <div className="flex justify-between w-full text-base">
//                         <label className=" font-bold text-[#475569]">
//                           Upload images
//                         </label>
//                       </div>
//                     }
//                     valuePropName="fileList"
//                     name="picture"
//                     getValueFromEvent={normFile}
//                   >
//                     <Upload
//                       listType="picture-card"
//                       maxCount={4 - selectedPictures?.length}
//                       beforeUpload={beforeUpload}
//                     >
//                       <div>
//                         <PlusOutlined />
//                         <div style={{ marginTop: 8 }}>Upload</div>
//                       </div>
//                     </Upload>
//                   </Form.Item>
//                 )}

//                 {disabled && (
//                   <Checkbox
//                     checked={isGlobal}
//                     className="mb-5"
//                     onChange={(e) => {
//                       setIsGlobal((prevValue) => !prevValue);
//                     }}
//                   >
//                     isGlobal
//                   </Checkbox>
//                 )} */}

//                 <Form.Item>
//                   <FilledButton
//                     variant="primary"
//                     label="Post"
//                     type="submit"
//                     loading={isSubmitting}
//                   />
//                 </Form.Item>
//               </>
//             );
//           }}
//         </Form>
//       )}
//     </div>
//   );
// };

// export default CreateDoctor;
