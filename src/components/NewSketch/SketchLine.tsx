import React from 'react';
import { Line } from '@react-three/drei';
import { Vector3 } from 'three';
import SketchPoint from './SketchPoint';

interface ISketchLine {
  id: number;
  startPoint: Vector3;
  endPoint: Vector3;
}

const SketchLine: React.FC<ISketchLine> = ({ id, startPoint, endPoint }) => {
  // eslint-disable-next-line no-unused-vars
  const dummy = '';
  return (
    <>
      <SketchPoint lineId={id} position={startPoint} isStartPoint />
      <Line
        points={[startPoint, endPoint]}
        lineWidth={0.8}
        color='white'
      />
      <SketchPoint lineId={id} position={endPoint} />
    </>
  );
};

export default SketchLine;
