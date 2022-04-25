import React from 'react';
import { useDrag } from '@use-gesture/react';
import { Mesh } from 'three';
import { Box } from '@react-three/drei';
import { helperPlane, helperPoint } from '../utils/geometryHelpers';
import useSpace, { ISpaceStore } from '../hooks/useSpace';

interface IBox {}

const BoxModel: React.FC<IBox> = () => {
  const boxRef = React.useRef<Mesh>();
  const setIsDragging = useSpace(
    (state: ISpaceStore) => state.setIsDragging,
  );

  const bind = useDrag(
    ({ active, event }: any) => {
      setIsDragging(active);

      if (boxRef.current && active) {
        event.ray.intersectPlane(helperPlane, helperPoint);
        boxRef.current.position.setComponent(0, helperPoint.x);
        boxRef.current.position.setComponent(1, 1);
        boxRef.current.position.setComponent(2, helperPoint.z);
      }
    },
  );

  const [hovered, setHovered] = React.useState(false);
  React.useEffect(() => {
    document.body.style.cursor = hovered ? 'move' : 'auto';
  }, [hovered]);

  return (
    // @ts-ignore
    <Box
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...bind()}
      position={[0, 1, 0]}
      ref={boxRef}
      args={[2, 2, 2]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <meshNormalMaterial attach='material' />
    </Box>
  );
};

export default BoxModel;
