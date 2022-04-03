import React from 'react';
import Point from './Point';
import useSketchStore, { ISketchStore } from '../../hooks/useSketchStore';

interface ISketchJSX {}

const Sketch: React.FC<ISketchJSX> = () => {
  const vertices = useSketchStore(
    (state: ISketchStore) => state.vertices,
  );

  return (
    <>
      {vertices.map((v) => (
        <Point
          key={v.id}
          id={v.id}
          position={v.position}
        />
      ))}
    </>
  );
};

export default Sketch;
