import React from 'react';
import shallow from 'zustand/shallow';
import { Vector3 } from 'three';
import useSketch, { ISketchStore } from '../../hooks/useSketch';

interface IPointField {
  pointId: number;
  lineId: number;
  isStartPoint?: boolean;
}

const PointField: React.FC<IPointField> = ({ pointId, lineId, isStartPoint }) => {
  const [points, updateLine] = useSketch(
    (state: ISketchStore) => [state.points, state.updateLine],
    shallow,
  );

  const [pointX, setPointX] = React.useState(points[pointId - 1].position.x);
  const [pointY, setPointY] = React.useState(-points[pointId - 1].position.z);

  React.useEffect(() => {
    setPointX(points[pointId - 1].position.x);
    setPointY(-points[pointId - 1].position.z);
  }, [points[pointId - 1].position]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    dir: string,
  ): void => {
    const newPoint = new Vector3();
    newPoint.setComponent(1, 0);

    if (dir === 'y') {
      newPoint.setComponent(0, pointX);
      newPoint.setComponent(2, -Number(e.target.value));
    }

    if (dir === 'x') {
      setPointX(Number(e.target.value));
      newPoint.setComponent(0, Number(e.target.value));
      newPoint.setComponent(2, pointY);
    }

    updateLine(lineId, newPoint, isStartPoint);
  };

  return (
    <>
      <p className='ml-2'>
        Point
        {' '}
        {pointId}
        :
      </p>
      <div className='ml-4 mr-6 flex flex-row gap-4 pt-1 pb-1'>
        <label
          className='basis-1/5 pt-2 pb-2'
          htmlFor={`point-${pointId}-x`}
        >
          x
          {' '}
          :
        </label>
        <input
          className='basis-4/5 pt-2 pb-2 pl-4'
          type='number'
          id={`point-${pointId}-x`}
          name='point-x-position'
          value={pointX.toFixed(2)}
          onChange={(e) => handleChange(e, 'x')}
        />
      </div>
      <div className='ml-4 mr-6 flex flex-row gap-4 pt-1 pb-1'>
        <label
          className='basis-1/5 pt-2 pb-2'
          htmlFor={`point-${pointId}-y`}
        >
          y
          {' '}
          :
        </label>
        <input
          className='basis-4/5 pt-2 pb-2 pl-4'
          type='number'
          id={`point-${pointId}-y`}
          name='point-y-position'
          value={pointY.toFixed(2)}
          onChange={(e) => handleChange(e, 'y')}
        />
      </div>
    </>
  );
};

export default PointField;
