import React from 'react';
import { Plane } from '@react-three/drei';
import { useMove } from '@use-gesture/react';
import shallow from 'zustand/shallow';
import useSketch, { ISketchStore } from '../../hooks/useSketch';
import { helperPlane, helperPoint } from '../../utils/geometryHelpers';

interface ISketchPlane {}

const SketchPlane: React.FC<ISketchPlane> = () => {
  const [updateVertexPosition, vertices, creatingVertex, stopCreatingVertex] = useSketch(
    (state: ISketchStore) => [
      state.updateVertexPosition,
      state.vertices,
      state.creatingVertex,
      state.stopCreatingVertex,
    ],
    shallow,
  );

  const bind = useMove(({ event }: any) => {
    event.ray.intersectPlane(helperPlane, helperPoint);

    const vertexIndex = vertices.length;
    updateVertexPosition(vertexIndex, helperPoint);
  }, { enabled: creatingVertex });

  return (
    // @ts-ignore
    <Plane
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...bind()}
      args={[10, 10]}
      rotation={[-Math.PI / 2, 0, 0]}
      onClick={() => {
        console.log('stop creating vertex');
        if (creatingVertex) stopCreatingVertex();
      }}
    >
      <meshBasicMaterial transparent opacity={0.0} />
    </Plane>
  );
};

export default SketchPlane;
