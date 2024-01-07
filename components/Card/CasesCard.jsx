import React from 'react';
import { Card } from 'antd';
const { Meta } = Card;
const CaseCard = ({ age, name, breed, image, heatMap, disease, score }) => (
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
    <p className="mt-2">{score}</p>
    <div className="flex mt-5">
      <div className="w-48 h-10">
        <p>Image</p>
        <img className="w-48 h-24 rounded" alt="example" src={image} />
      </div>
      <div className="w-48 h-10 ml-2">
        <p>Heat map Image</p>
        <img className="w-48 h-24 rounded" alt="example" src={heatMap} />
      </div>
    </div>
  </Card>
  //   </div>
);
export default CaseCard;
