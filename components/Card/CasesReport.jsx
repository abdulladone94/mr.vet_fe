import Link from 'next/link';
import FilledButton from '../UI/Buttons/FilledButton';
import { useState } from 'react';
import ModalComponents from '../ModalComponents';

export default function CaseReport({
  profileImage,
  createdDate,
  name,
  dob,
  breed,
  species,
  gender,
  image,
  heatMap,
  disease,
  healthStatus,
  score,
  username,
  email,
  doctorFirst,
  doctorLast,
  button,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [modalTitle, setModalTitle] = useState('');

  const openModal = (image, title) => {
    setModalImage(image);
    setModalTitle(title);
    setIsModalOpen(true);
    console.log(modalImage);
  };
  console.log(modalImage);
  return (
    <div className="flex flex-col gap-8">
      <div className="overflow-hidden rounded-lg shadow-lg border-[#FD9340] border-2">
        <div className="flex items-center justify-between p-4 bg-[#dcdad9]">
          <h2 className="text-lg font-semibold">
            Pet Information
            <p className="text-sm">{createdDate}</p>
            <p className="text-sm">{doctorFirst + ' ' + doctorLast}</p>
          </h2>
          <img
            alt="Pet Image"
            className="rounded-full"
            height="50"
            src={profileImage}
            style={{
              aspectRatio: '50/50',
              objectFit: 'cover',
            }}
            width="50"
          />
        </div>
        <div className="grid gap-6 p-4">
          <div className="grid gap-2">
            <div className="flex space-x-4">
              <p className="font-light">Pet Name</p>
              <p className="font-medium">{name}</p>
            </div>
            <div className="flex space-x-4">
              <p className="font-light">Date of Birth</p>
              <p className="font-medium">{dob}</p>
            </div>
            <div className="flex space-x-4">
              <p className="font-light">Breed</p>
              <p className="font-medium">{breed}</p>
            </div>
            <div className="flex space-x-4">
              <p className="font-light">Species</p>
              <p className="font-medium">{species}</p>
            </div>
            <div className="flex space-x-4">
              <p className="font-light">Gender</p>
              <p className="font-medium">{gender}</p>
            </div>
          </div>
        </div>
        <div className="p-4 bg-[#dcdad9]">
          <h2 className="text-lg font-semibold text-left">Health Condition</h2>
        </div>
        <div className="grid gap-6 p-4">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="font-light">Uploaded Image</p>
              <Link
                href={'/cases'}
                onClick={() => {
                  openModal(image, 'Uploaded Image');
                }}
              >
                <img
                  alt="Pet Image"
                  className="aspect-[1/1] object-cover w-full"
                  height="200"
                  src={image}
                  width="200"
                />
              </Link>
            </div>
            <div>
              <p className="font-light">Analyzed Image</p>
              <Link
                href={'/cases'}
                onClick={() => {
                  openModal(heatMap, 'Analyzed Image');
                }}
              >
                <img
                  alt="Heat Map Image"
                  className="aspect-[1/1] object-cover w-full"
                  height="200"
                  src={heatMap}
                  width="200"
                />
              </Link>
            </div>
          </div>
          <div className="grid gap-2">
            <div className="flex space-x-4">
              <p className="font-light">Health Status</p>
              <p className="font-medium">{healthStatus}</p>
            </div>
            <div className="flex space-x-4">
              <p className="font-light">Predicted Disease</p>
              <p className="font-medium">{disease}</p>
            </div>

            <div className="flex space-x-4">
              <p className="font-light">Accuracy</p>
              <p className="font-medium">{score}</p>
            </div>
            <div className="flex space-x-4">
              <p className="font-light">Doctor Prediction</p>
              <p className="font-medium">--</p>
            </div>

            <div className="flex space-x-4">
              <p className="font-light">Doctor Comment</p>
              <p className="font-medium">--</p>
            </div>
          </div>
        </div>
        <div className="p-4 bg-[#dcdad9]">
          <h2 className="text-lg font-semibold text-left">Owner Information</h2>
        </div>
        <div className="grid gap-6 p-4">
          <div className="grid gap-2">
            <div className="flex space-x-4">
              <p className="font-light">Name</p>
              <p className="font-medium">{username}</p>
            </div>
            <div className="flex space-x-4">
              <p className="font-light">Email</p>
              <p className="font-medium">{email}</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center p-4">
          {/* <button className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700">
            Delete Pet Profile
          </button> */}
          <FilledButton
            label="Delete Report"
            variant="primary"
            onClick={button}
          />
        </div>
        {modalTitle && (
          <ModalComponents
            title={modalTitle}
            // title="Uploaded Image"
            isModalOpen={isModalOpen}
            setIsModalOpen={() => setIsModalOpen(false)}
            // okText="ok"
            // handleOkClick={false}
            // confirmLoading={passwordLoading}
            // error={passwordError}
          >
            {modalImage && (
              <img
                alt="Pet Image"
                className="aspect-[1/1] object-cover w-full"
                height="200"
                src={modalImage}
                width="200"
              />
            )}
          </ModalComponents>
        )}
      </div>
    </div>
  );
}
