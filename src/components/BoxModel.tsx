import React from 'react';
import * as THREE from 'three';
import { useDrag } from '@use-gesture/react';
import { Mesh } from 'three';
import { Box, Extrude, Html } from '@react-three/drei';
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
      event.ray.intersectPlane(helperPlane, helperPoint);

      if (active && isBoxVisible) {
        if (boxRef.current) {
          boxRef.current.position.setComponent(0, helperPoint.x);
          boxRef.current.position.setComponent(1, 1);
          boxRef.current.position.setComponent(2, helperPoint.z);
        }

        if (projectionRef.current) {
          projectionRef.current.position.setComponent(0, helperPoint.x);
          projectionRef.current.position.setComponent(1, 0);
          projectionRef.current.position.setComponent(2, helperPoint.z);
        }

        document.body.style.cursor = 'move';
      }
    },
  );

  const [hovered, setHovered] = React.useState(false);
  React.useEffect(() => {
    document.body.style.cursor = hovered && isBoxVisible ? 'move' : 'auto';
  }, [hovered, isBoxVisible]);

  const projectionShape = React.useMemo(() => {
    const shape = new THREE.Shape();

    if (projectionRef.current) {
      const xCoord = projectionRef.current.position.x;
      const yCoord = -projectionRef.current.position.z;

      shape.moveTo(xCoord + boxSize / 2, yCoord + boxSize / 2);
      shape.lineTo(xCoord + boxSize / 2, yCoord - boxSize / 2);
      shape.lineTo(xCoord - boxSize / 2, yCoord - boxSize / 2);
      shape.lineTo(xCoord - boxSize / 2, yCoord + boxSize / 2);
    }

    return shape;
  }, [projectionRef?.current]);

  return (
    <>
      {/* @ts-ignore */}
      <Box
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...bind()}
        position={[0, 1, 0]}
        ref={boxRef}
        args={[boxSize, boxSize, boxSize]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        visible={!isSketchView && isBoxVisible}
      >
        <meshNormalMaterial attach='material' />
      </Box>
      <Extrude
        args={[projectionShape, { bevelEnabled: false, depth: 1.e-1 }]}
        rotation={[-Math.PI / 2, 0, 0]}
        ref={projectionRef}
        position={[0, 0, 0]}
        renderOrder={2}
      >
        <meshBasicMaterial
          color='#3E64FF'
          depthWrite
          attach='material'
          visible={isSketchView && isBoxVisible}
        />
        {isSketchView && isBoxVisible && (
          <Html
            as='div'
            center
            distanceFactor={20}
            style={{ pointerEvents: 'none' }}
          >
            Box
          </Html>
        )}
      </Extrude>
    </>
  );
};

export default BoxModel;
