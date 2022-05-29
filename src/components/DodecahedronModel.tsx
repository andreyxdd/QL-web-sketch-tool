import React from 'react';
import * as THREE from 'three';
import { useDrag } from '@use-gesture/react';
import { Mesh } from 'three';
import { Dodecahedron, Extrude, Html } from '@react-three/drei';
import { helperPlane, helperPoint } from '../utils/geometryHelpers';
import useSpace, { ISpaceStore } from '../hooks/useSpace';
import useGlobal, { IGlobalStore } from '../hooks/useGlobal';

interface IDodecahedron {}

const dodecahedronRadius = 2.14;

const DodecahedronModel: React.FC<IDodecahedron> = () => {
  const dodecahedronRef = React.useRef<Mesh>();
  const projectionRef = React.useRef<Mesh>();
  const setIsDragging = useSpace((state: ISpaceStore) => state.setIsDragging);
  const isDodecahedronVisible = useSpace((state: ISpaceStore) => state.isDodecahedronVisible);
  const isSketchView = useGlobal((state: IGlobalStore) => state.isSketchView);

  const bind = useDrag(
    ({ active, event }: any) => {
      setIsDragging(active);
      event.ray.intersectPlane(helperPlane, helperPoint);

      if (active && isDodecahedronVisible) {
        if (dodecahedronRef.current) {
          dodecahedronRef.current.position.setComponent(0, helperPoint.x);
          dodecahedronRef.current.position.setComponent(1, 2);
          dodecahedronRef.current.position.setComponent(2, helperPoint.z);
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
    document.body.style.cursor = hovered && isDodecahedronVisible ? 'move' : 'auto';
  }, [hovered, isDodecahedronVisible]);

  const projectionShape = React.useMemo(() => {
    const shape = new THREE.Shape();

    if (projectionRef.current) {
      const xCoord = projectionRef.current.position.x;
      const yCoord = -projectionRef.current.position.z;

      shape.moveTo(xCoord + dodecahedronRadius, yCoord + dodecahedronRadius);
      shape.lineTo(xCoord + dodecahedronRadius, yCoord - dodecahedronRadius);
      shape.lineTo(xCoord - dodecahedronRadius, yCoord - dodecahedronRadius);
      shape.lineTo(xCoord - dodecahedronRadius, yCoord + dodecahedronRadius);
    }

    return shape;
  }, [projectionRef?.current]);

  return (
    <>
      {/* @ts-ignore */}
      <Dodecahedron
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...bind()}
        ref={dodecahedronRef}
        args={[dodecahedronRadius, 0]}
        position={[0, 2, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        visible={!isSketchView && isDodecahedronVisible}
      >
        <meshNormalMaterial attach='material' />
      </Dodecahedron>
      <Extrude
        args={[projectionShape, { bevelEnabled: false, depth: 1.e-1 }]}
        rotation={[-Math.PI / 2, 0, 0]}
        ref={projectionRef}
        position={[0, 0, 0]}
        renderOrder={2}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshBasicMaterial
          color='#3E34FF'
          attach='material'
          visible={isSketchView && isDodecahedronVisible}
        />
        {isSketchView && isDodecahedronVisible
          && (
            <Html
              as='div'
              center
              distanceFactor={20}
              style={{ pointerEvents: 'none' }}
            >
              Dodecahedron
            </Html>
          )}
      </Extrude>
    </>
  );
};

export default DodecahedronModel;
