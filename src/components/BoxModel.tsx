import React from 'react';
import * as THREE from 'three';
import { useDrag } from '@use-gesture/react';
import { Mesh } from 'three';
import { Box, Extrude } from '@react-three/drei';
import { helperPlane, helperPoint } from '../utils/geometryHelpers';
import useSpace, { ISpaceStore } from '../hooks/useSpace';
import useGlobal, { IGlobalStore } from '../hooks/useGlobal';

interface IBox {}

const boxSize = 2;

const BoxModel: React.FC<IBox> = () => {
  const boxRef = React.useRef<Mesh>();
  const projectionRef = React.useRef<Mesh>();
  const setIsDragging = useSpace((state: ISpaceStore) => state.setIsDragging);
  const isSketchView = useGlobal((state: IGlobalStore) => state.isSketchView);
  const isBoxVisible = useSpace((state: ISpaceStore) => state.isBoxVisible);

  const bind = useDrag(
    ({ active, event }: any) => {
      setIsDragging(active);

      if (boxRef.current && active) {
        event.ray.intersectPlane(helperPlane, helperPoint);
        boxRef.current.position.setComponent(0, helperPoint.x);
        boxRef.current.position.setComponent(1, 1);
        boxRef.current.position.setComponent(2, helperPoint.z);
      }

      if (projectionRef.current && active) {
        event.ray.intersectPlane(helperPlane, helperPoint);
        projectionRef.current.position.setComponent(0, helperPoint.x);
        projectionRef.current.position.setComponent(1, 0);
        projectionRef.current.position.setComponent(2, helperPoint.z);
      }
    },
  );

  const [hovered, setHovered] = React.useState(false);
  React.useEffect(() => {
    document.body.style.cursor = hovered ? 'move' : 'auto';
  }, [hovered]);

  const projectionShape = React.useMemo(() => {
    const shape = new THREE.Shape();

    if (projectionRef.current) {
      console.log(projectionRef.current.position);

      const xCoord = projectionRef.current.position.x;
      const yCoord = -projectionRef.current.position.z;

      shape.moveTo(xCoord + boxSize / 2, yCoord + boxSize / 2);
      shape.lineTo(xCoord + boxSize / 2, yCoord - boxSize / 2);
      shape.lineTo(xCoord - boxSize / 2, yCoord - boxSize / 2);
      shape.lineTo(xCoord - boxSize / 2, yCoord + boxSize / 2);
    }
    return shape;
  }, [projectionRef?.current?.position]);

  return (
    <>
      {/* @ts-ignore */}
      <Box
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...bind()}
        position={[0, 1, 0]}
        ref={boxRef}
        args={[2, 2, 2]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        visible={!isSketchView && isBoxVisible}
      >
        <meshNormalMaterial attach='material' />
      </Box>
      <Extrude
        args={[projectionShape, { bevelEnabled: false, depth: 1.e-5 }]}
        rotation={[-Math.PI / 2, 0, 0]}
        ref={projectionRef}
        position={[0, 0, 0]}
      >
        <meshPhysicalMaterial
          color='#3E64FF'
          attach='material'
          visible={isSketchView && isBoxVisible}
        />
      </Extrude>
    </>
  );
};

export default BoxModel;
