import React from 'react';
import { Circle } from '@react-three/drei';
import { useDrag } from '@use-gesture/react';
import { Vector3 } from 'three';
import { helperPlane, helperPoint } from '../../utils/geometryHelpers';
import useSketch, { ISketchStore } from '../../hooks/useSketch';

interface ISketchPoint {
  id: number;
  position: Vector3;
}

const SketchPoint: React.FC<ISketchPoint> = ({ id, position }) => {
  const [updateVertexPosition] = useSketch((state: ISketchStore) => [state.updateVertexPosition]);

  const [hovered, setHovered] = React.useState(false);

  const bind = useDrag(({ event }: any) => {
    event.ray.intersectPlane(helperPlane, helperPoint);
    updateVertexPosition(id, helperPoint);
  }, { pointerEvents: true });

  React.useEffect(() => {
    document.body.style.cursor = hovered ? 'crosshair' : 'auto';
  }, [hovered]);

  return (
    // @ts-ignore
    <Circle
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...bind()}
      position={position}
      rotation={[-Math.PI / 2, 0, 0]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      args={[0.1, 32]}
    >
      <meshBasicMaterial color={hovered ? 'hotpink' : 'white'} />
    </Circle>
  );
};

export default SketchPoint;
