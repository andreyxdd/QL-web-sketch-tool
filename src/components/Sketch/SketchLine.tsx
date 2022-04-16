import React from 'react';
import { Line } from '@react-three/drei';
import useSketch, { ISketchStore } from '../../hooks/useSketch';

interface ISketchLine {}

const SketchLine: React.FC<ISketchLine> = () => {
  const vertices = useSketch((state: ISketchStore) => state.vertices);

  return (
    <Line
      points={vertices.map((v) => v.position)}
      lineWidth={0.8}
      color='white'
    />
  );
};

export default SketchLine;
