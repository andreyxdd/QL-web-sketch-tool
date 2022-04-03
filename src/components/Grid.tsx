import React from 'react';
import useUIStore, { IUIStore } from '../hooks/useUIStore';

interface IGrid {}

const Grid: React.FC<IGrid> = () => {
  const {
    showAxesHelper, showGrid, size, divisions,
  } = useUIStore(
    (state: IUIStore) => state.grid,
  );

  return (
    <>
      {showAxesHelper && <axesHelper />}
      {showGrid && <gridHelper args={[size, divisions, '#808080', '#181818']} />}
    </>
  );
};

export default Grid;
