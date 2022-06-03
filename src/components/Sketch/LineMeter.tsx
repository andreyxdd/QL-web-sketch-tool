import React from 'react';
import { Line } from '@react-three/drei';
import * as THREE from 'three';
import MeterInput from './MeterInput';

const h = 0.5;
const serifWidth = 0.5;
const serifColor = '#fdfd96';

const headLength = 0.12;
const headWidth = 0.06;
const arrowColor = '#ffff66';

interface ILineMeter {
  lineId: number;
  startPoint: THREE.Vector3;
  endPoint: THREE.Vector3;
}

const LineMeter: React.FC<ILineMeter> = ({ lineId, startPoint, endPoint }) => {
  const {
    serifPoints, arrowDirection, lineOffsetMidPoint, lineLength,
  } = React.useMemo(() => {
    const normal = new THREE.Vector3()
      .subVectors(startPoint, endPoint)
      .applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI * 0.5)
      .normalize();

    const lineMidPoint = new THREE.Vector3()
      .subVectors(endPoint, startPoint)
      .multiplyScalar(-0.5)
      .add(endPoint);
    const offsetMidPoint = normal.clone().setLength(h).add(lineMidPoint);

    const arrowDirectionVector = new THREE.Vector3()
      .subVectors(endPoint, lineMidPoint);

    return {
      serifPoints: [
        [endPoint, normal.clone().setLength(h).add(endPoint)],
        [startPoint, normal.clone().setLength(h).add(startPoint)],
      ],
      arrowDirection: arrowDirectionVector.normalize(),
      lineOffsetMidPoint: offsetMidPoint,
      lineLength: startPoint.distanceTo(endPoint),
    };
  }, [startPoint, endPoint]);

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
