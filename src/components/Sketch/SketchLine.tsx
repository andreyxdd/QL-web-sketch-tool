import React from 'react';
import { Line } from '@react-three/drei';
import SketchPoint from './SketchPoint';
// import LineMeter from './LineMeter';
import useSketch, { ISketchStore } from '../../hooks/useSketch';

interface ISketchLine {
  id: number;
  startPointId: number;
  endPointId: number;
}

const SketchLine: React.FC<ISketchLine> = ({ id, startPointId, endPointId }) => {
  const points = useSketch((state: ISketchStore) => state.points);
  const startPointPosition = React.useMemo(
    () => points[startPointId - 1].position,
    [points, startPointId],
  );
  const endPointPosition = React.useMemo(
    () => points[endPointId - 1].position,
    [points, endPointId],
  );
  const [hovered, setHovered] = React.useState(false);

  return (
    <>
      <SketchPoint
        lineId={id}
        position={startPointPosition}
        setLineHovered={setHovered}
        isStartPoint
      />
      <Line
        points={[startPointPosition, endPointPosition]}
        lineWidth={3}
        color={hovered ? 'blue' : 'white'}
        onPointerOver={() => setHovered(false)}
        onPointerOut={() => setHovered(false)}
      />
      {/* <LineMeter lineId={id} startPoint={startPointPosition} endPoint={endPointPosition} /> */}
      <SketchPoint lineId={id} position={endPointPosition} setLineHovered={setHovered} />
    </>
  );
};

export default SketchLine;
