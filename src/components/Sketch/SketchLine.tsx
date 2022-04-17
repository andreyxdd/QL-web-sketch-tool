import React from 'react';
import { Line } from '@react-three/drei';
import { Vector3 } from 'three';
import LineMeter from './LineMeter';

interface ISketchLine {
  id: number;
  v1: Vector3;
  v2: Vector3;
}

const SketchLine: React.FC<ISketchLine> = ({ id, v1, v2 }) => (
  <>
    <LineMeter lineId={id} v1={v1} v2={v2} />
    <Line
      points={[v1, v2]}
      lineWidth={0.8}
      color='white'
    />
  </>

);

export default SketchLine;
