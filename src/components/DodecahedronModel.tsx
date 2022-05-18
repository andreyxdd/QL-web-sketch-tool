import React from 'react';
import { useDrag } from '@use-gesture/react';
import { Mesh } from 'three';
import { Dodecahedron } from '@react-three/drei';
import { helperPlane, helperPoint } from '../utils/geometryHelpers';
import useSpace, { ISpaceStore } from '../hooks/useSpace';

interface IDodecahedron {}

const DodecahedronModel: React.FC<IDodecahedron> = () => {
  const dodecahedronRef = React.useRef<Mesh>();
  const setIsDragging = useSpace(
    (state: ISpaceStore) => state.setIsDragging,
  );
  const isDodecahedronVisible = useSpace((state: ISpaceStore) => state.isDodecahedronVisible);

  const bind = useDrag(
    ({ active, event }: any) => {
      setIsDragging(active);

      if (dodecahedronRef.current && active) {
        event.ray.intersectPlane(helperPlane, helperPoint);
        dodecahedronRef.current.position.setComponent(0, helperPoint.x);
        dodecahedronRef.current.position.setComponent(1, 1);
        dodecahedronRef.current.position.setComponent(2, helperPoint.z);
      }
    },
  );

  const [hovered, setHovered] = React.useState(false);
  React.useEffect(() => {
    document.body.style.cursor = hovered ? 'move' : 'auto';
  }, [hovered]);

  return (
    // @ts-ignore
    <Dodecahedron
    // eslint-disable-next-line react/jsx-props-no-spreading
      {...bind()}
      ref={dodecahedronRef}
      args={[1, 0]}
      position={[0, 1, 0]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      visible={isDodecahedronVisible}
    >
      <meshNormalMaterial attach='material' />
    </Dodecahedron>
  );
};

export default DodecahedronModel;
