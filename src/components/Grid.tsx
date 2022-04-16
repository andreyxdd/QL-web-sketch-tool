import React from 'react';
import useGlobal, { IGlobalStore } from '../hooks/useGlobal';

interface IGrid {}

const Grid: React.FC<IGrid> = () => {
  const {
    showAxesHelper, showGrid, size, divisions,
  } = useGlobal((state: IGlobalStore) => state.grid);

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
