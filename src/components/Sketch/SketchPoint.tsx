import React from 'react';
import { Circle, Html } from '@react-three/drei';
import { useDrag } from '@use-gesture/react';
import { Vector3 } from 'three';

import { helperPlane, helperPoint } from '../../utils/geometryHelpers';
import useSketch, { ISketchStore } from '../../hooks/useSketch';

interface ISketchPoint {
  lineId: number;
  pointId: number;
  position: Vector3;
  setLineHovered?: React.Dispatch<React.SetStateAction<boolean>>;
  isStartPoint?: boolean;
}

const SketchPoint: React.FC<ISketchPoint> = ({
  lineId, pointId, position, isStartPoint,
}) => {
  const [updateLine] = useSketch((state: ISketchStore) => [state.updateLine]);

  const [hovered, setHovered] = React.useState(false);

  const bind = useDrag(({ event }: any) => {
    event.ray.intersectPlane(helperPlane, helperPoint);
    updateLine(lineId, helperPoint, isStartPoint);
  }, { pointerEvents: true });

  React.useEffect(() => {
    document.body.style.cursor = hovered ? 'move' : 'auto';
  }, [hovered]);

  const adjustHtml = isStartPoint ? -0.5 : 0.5;

  return (

    <>
      {/* @ts-ignore */}
      <Circle
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...bind()}
        position={position}
        rotation={[-Math.PI / 2, 0, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        args={[0.1, 8]}
      >
        <meshBasicMaterial
          color='#F0F0F0'
          transparent
          opacity={0.0}
        />
      </Circle>
      <Circle
        position={position}
        rotation={[-Math.PI / 2, 0, 0]}
        args={[0.05, 16]}
      >
        <meshBasicMaterial
          color={hovered ? 'hotpink' : '#F0F0F0'}
        />
      </Circle>
      <Html
        as='div'
        center
        style={{
          color: 'white',
          userSelect: 'none',
        }}
        distanceFactor={20}
        position={[position.x + adjustHtml / 2, 0, position.z + adjustHtml]}
      >
        {pointId}
      </Html>
    </>
  );
};

export default SketchPoint;
