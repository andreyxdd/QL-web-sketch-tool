import React from 'react';
import shallow from 'zustand/shallow';
import SketchPoint from './SketchPoint';
import SketchLine from './SketchLine';
import useSketch, { ISketchStore } from '../../hooks/useSketch';

interface ISketchJSX {}

const Sketch: React.FC<ISketchJSX> = () => {
  const [vertices, lines] = useSketch(
    (state: ISketchStore) => [state.vertices, state.lines],
    shallow,
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
      {lines.map((line) => (
        <SketchLine
          key={line.id}
          id={line.id}
          v1={line.startVertex.position}
          v2={line.endVertex.position}
        />
      ))}
    </>
  );
};

export default Sketch;
