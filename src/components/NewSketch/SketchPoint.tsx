import React from 'react';
import { Circle } from '@react-three/drei';
import { useDrag } from '@use-gesture/react';
import { Vector3 } from 'three';
import { helperPlane, helperPoint } from '../../utils/geometryHelpers';
import useSketch, { INewSketchStore } from '../../hooks/useNewSketch';

interface ISketchPoint {
  lineId: number;
  position: Vector3;
  isStartPoint?: boolean;
}

const SketchPoint: React.FC<ISketchPoint> = ({ lineId, position, isStartPoint }) => {
  const [updateLine] = useSketch((state: INewSketchStore) => [state.updateLine]);

  const [hovered, setHovered] = React.useState(false);

  const bind = useDrag(({ event }: any) => {
    event.ray.intersectPlane(helperPlane, helperPoint);
    updateLine(lineId, helperPoint, isStartPoint);
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
