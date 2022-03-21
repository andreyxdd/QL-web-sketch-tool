import React from 'react';

interface IGrid {}

const Grid: React.FC<IGrid> = () => (
  <>
    <axesHelper />
    <gridHelper args={[100, 100, '#808080', '#181818']} />
  </>
);

export default Grid;
