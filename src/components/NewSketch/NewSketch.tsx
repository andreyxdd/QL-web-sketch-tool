import React from 'react';
import shallow from 'zustand/shallow';
import { Plane, Circle } from '@react-three/drei';
import { useMove } from '@use-gesture/react';
import { Mesh, Vector3 } from 'three';
import useSketch, { INewSketchStore } from '../../hooks/useNewSketch';
import { helperPlane, helperPoint } from '../../utils/geometryHelpers';
import SketchLine from './SketchLine';

interface INewSketch {}

const NewSketch: React.FC<INewSketch> = () => {
  const [isAddingLine, updateLine, currentLineId, lines, addLine] = useSketch(
    (state: INewSketchStore) => [
      state.isAddingLine,
      state.updateLine,
      state.currentLineId,
      state.lines,
      state.addLine,
    ],
    shallow,
  );

  const [isFirstPoint, setIsFirstPoint] = React.useState(true);
  const freePointRef = React.useRef<Mesh>();

  const bind = useMove(({ event }: any) => {
    event.ray.intersectPlane(helperPlane, helperPoint);
    const { x, z } = helperPoint;

    if (currentLineId) {
      updateLine(currentLineId, helperPoint);
    } else if (freePointRef.current) {
      freePointRef.current.position.setComponent(0, x);
      freePointRef.current.position.setComponent(2, z);
    }
  }, { enabled: isAddingLine });

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {lines.map((l) => (
        <SketchLine
          key={l.id}
          id={l.id}
          startPoint={l.startPoint}
          endPoint={l.endPoint}
        />
      ))}
      {isAddingLine
        && (
          <>
            <Circle
              ref={freePointRef}
              rotation={[-Math.PI / 2, 0, 0]}
              args={[0.1, 32]}
            >
              <meshBasicMaterial color='hotpink' />
            </Circle>
            {/* @ts-ignore */}
            <Plane
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...bind()}
              args={[10, 10]}
              rotation={[-Math.PI / 2, 0, 0]}
              onClick={() => {
                if (isFirstPoint) {
                  setIsFirstPoint(false);
                }
                if (freePointRef.current) {
                  addLine(
                    freePointRef.current.position,
                    new Vector3(0, 0, 0),
                  );
                }
              }}
            >
              <meshBasicMaterial transparent opacity={0.0} />
            </Plane>
          </>
        )}
    </>
  );
};

export default NewSketch;
