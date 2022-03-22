import React from 'react';
import useStore, { IStore } from '../hooks/useStore';

interface IGrid {}

const Grid: React.FC<IGrid> = () => {
  const { showAxesHelper, size, divisions } = useStore(
    (state: IStore) => state.grid,
  );

  return (
    <>
      {showAxesHelper && <axesHelper />}
      <gridHelper args={[size, divisions, '#808080', '#181818']} />
    </>
  );
};

export default Grid;
