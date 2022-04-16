import React from 'react';
import SketchPoint from './SketchPoint';
import SketchLine from './SketchLine';
import useSketchStore, { ISketchStore } from '../../hooks/useSketchStore';

interface ISketchJSX {}

const Sketch: React.FC<ISketchJSX> = () => {
  const vertices = useSketchStore(
    (state: ISketchStore) => state.vertices,
  );

  return (
    <>
      {vertices.map((v) => (
        <SketchPoint
          key={v.id}
          id={v.id}
          position={v.position}
        />
      ))}
      <SketchLine />
    </>
  );
};

export default Sketch;
