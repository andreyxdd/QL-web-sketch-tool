import React from 'react';
import * as THREE from 'three';
import shallow from 'zustand/shallow';
import useSketch, { ISketchStore } from '../hooks/useSketch';

interface IExtrusion {}

const Extrusion : React.FC<IExtrusion> = () => {
  // eslint-disable-next-line no-unused-vars
  const [lines, points] = useSketch((state: ISketchStore) => [state.lines, state.points], shallow);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {lines && lines.map((line) => {
        const lineShape = new THREE.Shape();
        const lineStartPointIdx = line.startPointId - 1;
        const lineEndPointIdx = line.endPointId - 1;

        lineShape.moveTo(
          points[lineStartPointIdx].position.x,
          -points[lineStartPointIdx].position.z,
        );
        lineShape.lineTo(
          points[lineEndPointIdx].position.x,
          -points[lineEndPointIdx].position.z,
        );
        return (
          <mesh rotation={[-Math.PI / 2, 0, 0]} key={line.startPointId}>
            <extrudeGeometry
              name='sketch-extrusion'
              args={[lineShape, { bevelEnabled: false, depth: 5 }]}
            />
            <meshBasicMaterial
              name='sketch-extrusion'
              color={0xff0000}
            />
          </mesh>
        );
      })}
    </>
  );
};

export default Extrusion;
