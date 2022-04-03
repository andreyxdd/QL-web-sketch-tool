import React from 'react';
import { Circle } from '@react-three/drei';
import { useDrag } from '@use-gesture/react';
import { SketchPlane, helperPoint, arrayToVector3 } from '../../utils/geometryHelpers';

interface IPoint {}

const Point: React.FC<IPoint> = () => {
  const [hovered, setHovered] = React.useState(false);
  const [position, setPosition] = React.useState([1, 0, 1]);

  const bind = useDrag(({ event }: any) => {
    event.ray.intersectPlane(SketchPlane, helperPoint);
    setPosition((p) => [helperPoint.x, p[1], helperPoint.z]);
  }, { pointerEvents: true });

  return (
    // @ts-ignore
    <Circle
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...bind()}
      position={arrayToVector3(position)}
      rotation={[-Math.PI / 2, 0, 0]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      args={[0.1, 32]}
    >
      <meshBasicMaterial color={hovered ? 'hotpink' : 'white'} />
    </Circle>
  );
};

export default Point;
