import React from 'react';
import { Line } from '@react-three/drei';
import * as THREE from 'three';
import MeterInput from './MeterInput';

const h = 0.5;
const serifWidth = 0.5;
const serifColor = 'grey';

const headLength = 0.12;
const headWidth = 0.06;
const arrowColor = 0xffff00;

interface ILineMeter {
  lineId: number;
  v1: THREE.Vector3;
  v2: THREE.Vector3;
}

const LineMeter: React.FC<ILineMeter> = ({ lineId, v1, v2 }) => {
  const {
    serifPoints, arrowDirection, lineOffsetMidPoint, lineLength,
  } = React.useMemo(() => {
    const normal = new THREE.Vector3()
      .subVectors(v1, v2)
      .applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI * 0.5)
      .normalize();

    const lineMidPoint = new THREE.Vector3()
      .subVectors(v2, v1)
      .multiplyScalar(-0.5)
      .add(v2);
    const offsetMidPoint = normal.clone().setLength(h).add(lineMidPoint);

    const arrowDirectionVector = new THREE.Vector3()
      .subVectors(v2, lineMidPoint);

    return {
      serifPoints: [
        [v2, normal.clone().setLength(h).add(v2)],
        [v1, normal.clone().setLength(h).add(v1)],
      ],
      arrowDirection: arrowDirectionVector.normalize(),
      lineOffsetMidPoint: offsetMidPoint,
      lineLength: v1.distanceTo(v2),
    };
  }, [v1, v2]);

  return (
    <>
      <Line points={serifPoints[0]} lineWidth={serifWidth} color={serifColor} />
      <Line points={serifPoints[1]} lineWidth={serifWidth} color={serifColor} />
      <arrowHelper args={[
        arrowDirection, lineOffsetMidPoint, lineLength / 2,
        arrowColor, headLength, headWidth,
      ]}
      />
      <arrowHelper
        args={[
          arrowDirection.clone().negate(), lineOffsetMidPoint, lineLength / 2,
          arrowColor, headLength, headWidth,
        ]}
      />
      <mesh position={lineOffsetMidPoint}>
        <MeterInput value={lineLength} lineId={lineId} />
      </mesh>
    </>
  );
};

export default LineMeter;
