import React from 'react';
import { Line } from '@react-three/drei';
import shallow from 'zustand/shallow';
import SketchPoint from './SketchPoint';
import LineMeter from './LineMeter';
import useSketch, { ISketchStore } from '../../hooks/useSketch';

interface ISketchLine {
  id: number;
  startPointId: number;
  endPointId: number;
}

const SketchLine: React.FC<ISketchLine> = ({ id, startPointId, endPointId }) => {
  const [points, showLineMeter] = useSketch(
    (state: ISketchStore) => [state.points, state.isDimensionsVisible],
    shallow,
  );

  const startPointPosition = React.useMemo(
    () => points[startPointId - 1].position,
    [points, startPointId],
  );
  const endPointPosition = React.useMemo(
    () => points[endPointId - 1].position,
    [points, endPointId],
  );

  const [lineColor, setLineColor] = React.useState('#F8F8F8');
  React.useEffect(() => {
    if (startPointPosition.x === endPointPosition.x) {
      setLineColor('#FF5733');
    } else if (startPointPosition.z === endPointPosition.z) {
      setLineColor('#0096FF');
    } else {
      setLineColor('#F8F8F8');
    }
  }, [endPointPosition.x, endPointPosition.z, points, startPointPosition.x, startPointPosition.z]);

  return (
    <>
      <SketchPoint
        lineId={id}
        position={startPointPosition}
        isStartPoint
      />
      <Line
        points={[startPointPosition, endPointPosition]}
        lineWidth={1.5}
        color={lineColor}
      />
      {showLineMeter
        && <LineMeter lineId={id} startPoint={startPointPosition} endPoint={endPointPosition} />}
      <SketchPoint lineId={id} position={endPointPosition} />
    </>
  );
};

export default SketchLine;
