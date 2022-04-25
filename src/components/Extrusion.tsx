import React from 'react';
import * as THREE from 'three';
import shallow from 'zustand/shallow';
import useSketch, { ISketchStore } from '../hooks/useSketch';
import useSpace, { ISpaceStore } from '../hooks/useSpace';

interface IExtrusion {}

const Extrusion : React.FC<IExtrusion> = () => {
  const [lines, points] = useSketch((state: ISketchStore) => [state.lines, state.points], shallow);
  const depth = useSpace((state: ISpaceStore) => state.extrusionDepth);

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
          <mesh rotation={[-Math.PI / 2, 0, 0]} key={line.startPointId} castShadow>
            <extrudeGeometry
              name='sketch-extrusion'
              args={[lineShape, { bevelEnabled: false, depth }]}
            />
            <meshLambertMaterial
              name='sketch-extrusion'
              color='#D3D3D3'
              attach='material'
              opacity={0.8}
              transparent
            />
          </mesh>
        );
      })}
    </>
  );
};

export default Extrusion;
