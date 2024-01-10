import FilledButton from '../UI/Buttons/FilledButton';

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

  button,
}) {
  return (
    <div className="flex flex-col gap-8">
      <div className="overflow-hidden rounded-lg shadow-lg border-[#FD9340] border-2">
        <div className="flex items-center justify-between p-4 bg-[#dcdad9]">
          <h2 className="text-lg font-semibold">
            Pet Information
            <p className="text-sm">{createdDate}</p>
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
              <img
                alt="Pet Image"
                className="aspect-[1/1] object-cover w-full"
                height="200"
                src={image}
                width="200"
              />
            </div>
            <div>
              <p className="font-light">Analyzed Image</p>
              <img
                alt="Heat Map Image"
                className="aspect-[1/1] object-cover w-full"
                height="200"
                src={heatMap}
                width="200"
              />
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
      </div>
    </div>

    // <div className="flex flex-col gap-8">
    //   <div className="overflow-hidden rounded-lg shadow-lg">
    //     <div className="p-4 bg-gray-200">
    //       <h2 className="text-lg font-semibold text-center">Pet Information</h2>
    //     </div>
    //     <div className="grid gap-6 p-4">
    //       <div className="grid gap-2">
    //         <div className="flex space-x-4">
    //           <p className="font-light">Pet Name</p>
    //           <p className="font-medium">Fluffy</p>
    //         </div>
    //         <div className="flex space-x-4">
    //           <p className="font-light">Date of Birth</p>
    //           <p className="font-medium">January 1, 2020</p>
    //         </div>
    //         <div className="flex space-x-4">
    //           <p className="font-light">Breed</p>
    //           <p className="font-medium">Golden Retriever</p>
    //         </div>
    //       </div>
    //       <div className="grid grid-cols-2 gap-2">
    //         <div>
    //           <p className="font-light">Image</p>
    //           <img
    //             alt="Pet Image"
    //             className="aspect-[1/1] object-cover w-full"
    //             height="200"
    //             src="/placeholder.svg"
    //             width="200"
    //           />
    //         </div>
    //         <div>
    //           <p className="font-light">Heat Map Image</p>
    //           <img
    //             alt="Heat Map Image"
    //             className="aspect-[1/1] object-cover w-full"
    //             height="200"
    //             src="/placeholder.svg"
    //             width="200"
    //           />
    //         </div>
    //       </div>
    //     </div>
    //     <div className="p-4 bg-gray-200">
    //       <h2 className="text-lg font-semibold text-center">Health Concerns</h2>
    //     </div>
    //     <div className="grid gap-6 p-4">
    //       <div className="grid gap-2">
    //         <div className="flex space-x-4">
    //           <p className="font-light">Predicted Disease</p>
    //           <p className="font-medium">Canine Parvovirus</p>
    //         </div>
    //         <div className="flex space-x-4">
    //           <p className="font-light">Health Status</p>
    //           <p className="font-medium">At Risk</p>
    //         </div>
    //         <div className="flex space-x-4">
    //           <p className="font-light">Prediction Score</p>
    //           <p className="font-medium">85%</p>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="p-4 bg-gray-200">
    //       <h2 className="text-lg font-semibold text-center">
    //         Owner's Information
    //       </h2>
    //     </div>
    //     <div className="grid gap-6 p-4">
    //       <div className="grid gap-2">
    //         <div className="flex space-x-4">
    //           <p className="font-light">Name</p>
    //           <p className="font-medium">John Doe</p>
    //         </div>
    //         <div className="flex space-x-4">
    //           <p className="font-light">Email</p>
    //           <p className="font-medium">johndoe@example.com</p>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="flex justify-center p-4">
    //       <button className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700">
    //         Delete Pet Profile
    //       </button>
    //     </div>
    //   </div>
    // </div>

    // <div className="flex flex-col gap-6">
    //   <div className="overflow-hidden rounded-lg shadow-lg">
    //     <div className="p-4 bg-gray-200">
    //       <h2 className="text-lg font-semibold text-center">Pet Information</h2>
    //     </div>
    //     <div className="grid gap-4 p-4">
    //       <div className="grid gap-1">
    //         <p className="font-light">Pet Name</p>
    //         <p className="font-medium">Fluffy</p>
    //         <p className="font-light">Date of Birth</p>
    //         <p className="font-medium">January 1, 2020</p>
    //         <p className="font-light">Breed</p>
    //         <p className="font-medium">Golden Retriever</p>
    //       </div>
    //       <div className="grid grid-cols-2 gap-1">
    //         <div>
    //           <p className="font-light">Image</p>
    //           <img
    //             alt="Pet Image"
    //             className="aspect-[1/1] object-cover w-full"
    //             height="200"
    //             src="/placeholder.svg"
    //             width="200"
    //           />
    //         </div>
    //         <div>
    //           <p className="font-light">Heat Map Image</p>
    //           <img
    //             alt="Heat Map Image"
    //             className="aspect-[1/1] object-cover w-full"
    //             height="200"
    //             src="/placeholder.svg"
    //             width="200"
    //           />
    //         </div>
    //       </div>
    //     </div>
    //     <div className="p-4 bg-gray-200">
    //       <h2 className="text-lg font-semibold text-center">Health Concerns</h2>
    //     </div>
    //     <div className="grid gap-4 p-4">
    //       <div className="grid gap-1">
    //         <p className="font-light">Predicted Disease</p>
    //         <p className="font-medium">Canine Parvovirus</p>
    //         <p className="font-light">Health Status</p>
    //         <p className="font-medium">At Risk</p>
    //         <p className="font-light">Prediction Score</p>
    //         <p className="font-medium">85%</p>
    //       </div>
    //     </div>
    //     <div className="p-4 bg-gray-200">
    //       <h2 className="text-lg font-semibold text-center">
    //         Owner's Information
    //       </h2>
    //     </div>
    //     <div className="grid gap-4 p-4">
    //       <div className="grid gap-1">
    //         <p className="font-light">Name</p>
    //         <p className="font-medium">John Doe</p>
    //         <p className="font-light">Email</p>
    //         <p className="font-medium">johndoe@example.com</p>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}

// // import { CardTitle, CardHeader, CardContent, Card } from '@/components/ui/card';
// // import { Label } from '@/components/ui/label';

// export default function CaseReport() {
//   return (
//     <div className="grid gap-6">
//       <Card>
//         <CardHeader className="bg-gray-200">
//           <CardTitle>Pet Information</CardTitle>
//         </CardHeader>
//         <CardContent className="grid gap-4">
//           <div className="grid gap-1">
//             <Label>Pet Name</Label>
//             <p className="font-medium">Fluffy</p>
//           </div>
//           <div className="grid gap-1">
//             <Label>Date of Birth</Label>
//             <p className="font-medium">January 1, 2020</p>
//           </div>
//           <div className="grid gap-1">
//             <Label>Breed</Label>
//             <p className="font-medium">Golden Retriever</p>
//           </div>
//         </CardContent>
//       </Card>
//       <Card>
//         <CardHeader className="bg-gray-200">
//           <CardTitle>Health Concerns</CardTitle>
//         </CardHeader>
//         <CardContent className="grid gap-4">
//           <div className="grid grid-cols-2 gap-1">
//             <div>
//               <Label>Image</Label>
//               <img
//                 alt="Pet Image"
//                 className="aspect-[1/1] object-cover w-full"
//                 height="200"
//                 src="/placeholder.svg"
//                 width="200"
//               />
//             </div>
//             <div>
//               <Label>Heat Map Image</Label>
//               <img
//                 alt="Heat Map Image"
//                 className="aspect-[1/1] object-cover w-full"
//                 height="200"
//                 src="/placeholder.svg"
//                 width="200"
//               />
//             </div>
//           </div>
//           <div className="grid gap-1">
//             <Label>Predicted Disease</Label>
//             <p className="font-medium">Canine Parvovirus</p>
//           </div>
//           <div className="grid gap-1">
//             <Label>Health Status</Label>
//             <p className="font-medium">At Risk</p>
//           </div>
//           <div className="grid gap-1">
//             <Label>Prediction Score</Label>
//             <p className="font-medium">85%</p>
//           </div>
//         </CardContent>
//       </Card>
//       <Card>
//         <CardHeader className="bg-gray-200">
//           <CardTitle>Owner's Information</CardTitle>
//         </CardHeader>
//         <CardContent className="grid gap-4">
//           <div className="grid gap-1">
//             <Label>Name</Label>
//             <p className="font-medium">John Doe</p>
//           </div>
//           <div className="grid gap-1">
//             <Label>Email</Label>
//             <p className="font-medium">johndoe@example.com</p>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
