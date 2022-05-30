import React from 'react';
import * as THREE from 'three';
import { useDrag } from '@use-gesture/react';
import { Mesh } from 'three';
import { Extrude, Html } from '@react-three/drei';
import { helperPlane, helperPoint } from '../utils/geometryHelpers';
import useSpace, { ISpaceStore } from '../hooks/useSpace';
import useGlobal, { IGlobalStore } from '../hooks/useGlobal';
import BoxModel from './BoxModel';
import DodecahedronModel from './DodecahedronModel';

interface IModelComponent {
  name: string;
  characteristicSizes: { x: number, y: number, z: number };
}

const Model: React.FC<IModelComponent> = ({ name, characteristicSizes }) => {
  const modelRef = React.useRef<Mesh>();
  const projectionRef = React.useRef<Mesh>();
  const setIsDragging = useSpace((state: ISpaceStore) => state.setIsDragging);
  const isSketchView = useGlobal((state: IGlobalStore) => state.isSketchView);

  const elevation = name === 'Box' ? 1 : 2;
  const boundingSquareSize = name === 'Box' ? characteristicSizes.x / 2 : characteristicSizes.x;

  const bind = useDrag(
    ({ active, event }: any) => {
      setIsDragging(active);
      event.ray.intersectPlane(helperPlane, helperPoint);

      if (active) {
        if (modelRef.current) {
          modelRef.current.position.setComponent(0, helperPoint.x);
          modelRef.current.position.setComponent(1, elevation);
          modelRef.current.position.setComponent(2, helperPoint.z);
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
    document.body.style.cursor = hovered ? 'move' : 'auto';
  }, [hovered]);

  const projectionShape = React.useMemo(() => {
    const shape = new THREE.Shape();

    if (projectionRef.current) {
      const xCoord = projectionRef.current.position.x;
      const yCoord = -projectionRef.current.position.z;

      shape.moveTo(xCoord + boundingSquareSize, yCoord + boundingSquareSize);
      shape.lineTo(xCoord + boundingSquareSize, yCoord - boundingSquareSize);
      shape.lineTo(xCoord - boundingSquareSize, yCoord - boundingSquareSize);
      shape.lineTo(xCoord - boundingSquareSize, yCoord + boundingSquareSize);
    }

    return shape;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectionRef?.current]);

  return (
    <>
      {name === 'Box' ? (
        <BoxModel
          boxRef={modelRef}
          boxSize={characteristicSizes.x}
          bind={bind}
          setHovered={setHovered}
          isVisible={!isSketchView}
        />
      ) : (
        <DodecahedronModel
          dodecahedronRef={modelRef}
          dodecahedronRadius={characteristicSizes.x}
          bind={bind}
          setHovered={setHovered}
          isVisible={!isSketchView}
        />
      )}
      <Extrude
        args={[projectionShape, { bevelEnabled: false, depth: 1.e-1 }]}
        rotation={[-Math.PI / 2, 0, 0]}
        ref={projectionRef}
        position={[0, 0, 0]}
        renderOrder={2}
        frustumCulled={false}
      >
        <meshBasicMaterial
          color={name === 'Box' ? '#89a0fa' : '#ef89fa'}
          depthWrite
          attach='material'
          visible={isSketchView}
        />
        {isSketchView && (
          <Html
            as='div'
            center
            distanceFactor={20}
            style={{ pointerEvents: 'none' }}
            frustumCulled={false}
          >
            {name}
          </Html>
        )}
      </Extrude>
    </>
  );
};

export default Model;
