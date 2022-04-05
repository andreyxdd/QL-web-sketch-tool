import React from 'react';
import { Line } from '@react-three/drei';
import useSketchStore, { ISketchStore } from '../../hooks/useSketchStore';

interface ISketchLine {}

const SketchLine: React.FC<ISketchLine> = () => {
  // eslint-disable-next-line no-unused-vars
  const vertices = useSketchStore(
    (state: ISketchStore) => state.vertices,
  );

  return (
    <Line
      points={vertices.map((v) => v.position) as [[number, number, number]]}
      lineWidth={0.8}
      color='white'
    />
  );
};

export default SketchLine;
