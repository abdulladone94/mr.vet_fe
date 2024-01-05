import React from 'react';
import { Card } from 'antd';
const { Meta } = Card;
const CaseCard = ({ age, name, breed, image, heatMap, disease }) => (
  //   <div className="flex justify-center">
  <Card
    hoverable
    style={{
      width: 340,
      height: 340,
      marginRight: 20,
      backgroundColor: 'gainsboro',
    }}
  >
    <div className="flex flex-col items-center">
      <Meta title={name} />

      <p>{breed}</p>
    </div>
    <p className="mt-2">{age}</p>
    <p className="mt-2">{disease}</p>
    <div className="flex mt-5">
      <div className="h-10 w-48">
        <p>Image</p>
        <img className="rounded h-24 w-48" alt="example" src={image} />
      </div>
      <div className="h-10 w-48 ml-2">
        <p>Heat map Image</p>
        <img
          className="rounded h-24 w-48"
          alt="example"
          src="https://caninebodybalance.com.au/canine/media/pages/services/thermal-imaging/4a22a1e6f5-1664780008/dog-thermal-imaging.jpg"
        />
      </div>
    </div>
  </Card>
  //   </div>
);
export default CaseCard;
