import React from 'react';
// import { Line } from '@react-three/drei';
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

  const [lineColor, setLineColor] = React.useState('#B8B8B8');
  React.useEffect(() => {
    if (startPointPosition.x === endPointPosition.x) {
      setLineColor('#FF5733');
    } else if (startPointPosition.z === endPointPosition.z) {
      setLineColor('#0096FF');
    } else {
      setLineColor('#B8B8B8');
    }
  }, [endPointPosition.x, endPointPosition.z, points, startPointPosition.x, startPointPosition.z]);

  const onUpdate = React.useCallback(
    (self) => self.setFromPoints([startPointPosition, endPointPosition]),
    [startPointPosition, endPointPosition],
  );

  return (
    <>
      <SketchPoint
        lineId={id}
        pointId={startPointId}
        position={startPointPosition}
        isStartPoint
      />
      <line>
        <bufferGeometry attach='geometry' onUpdate={onUpdate} />
        <lineBasicMaterial
          attach='material'
          color={lineColor}
          linewidth={4}
          linecap='round'
          linejoin='round'
        />
      </line>
      {showLineMeter
        && <LineMeter lineId={id} startPoint={startPointPosition} endPoint={endPointPosition} />}
      <SketchPoint
        lineId={id}
        pointId={endPointId}
        position={endPointPosition}
      />
    </>
  );
};

export default SketchLine;
