import React from 'react';
import { Card } from 'antd';
import FilledButton from '../UI/Buttons/FilledButton';
const { Meta } = Card;
const CaseCard = ({
  age,
  name,
  breed,
  image,
  heatMap,
  disease,
  score,
  button,
}) => (
  //   <div className="flex justify-center">
  <Card
    hoverable
    style={{
      width: 340,
      height: 380,
      marginRight: 20,
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
      <div className="h-32 w-36">
        <p>Image</p>
        <img className="w-48 h-24 rounded" alt="example" src={image} />
      </div>
      <div className="h-32 ml-2 w-36">
        <p>Heat map Image</p>
        <img className="w-48 h-24 rounded" alt="example" src={heatMap} />
      </div>
    </div>
    <div className="flex justify-center">
      <FilledButton label="Delete" variant="primary" onClick={button} />
    </div>
  </Card>
  //   </div>
);
export default CaseCard;
