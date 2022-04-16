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
      <mesh visible={showAxesHelper}>
        <axesHelper />
      </mesh>
      <mesh visible={showGrid}>
        <gridHelper args={[size, divisions, '#808080', '#181818']} />
      </mesh>
    </>
  );
};

export default Grid;
