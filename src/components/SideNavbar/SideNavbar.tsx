import React from 'react';
import shallow from 'zustand/shallow';
import useStore, { IStore } from '../../hooks/useStore';

import './styles.css';

interface ISideNavbar {}

const SideNavbar: React.FC<ISideNavbar> = () => {
  const [
    grid,
    setGrid,
    sketch,
    setSketch,
    sideNavbarOpened,
    setSideNavbarOpened,
  ] = useStore((state: IStore) => (
    [
      state.grid,
      state.setGrid,
      state.sketch,
      state.setSketch,
      state.sideNavbarOpened,
      state.setSideNavbarOpened,
    ]
  ), shallow);
  const { showAxesHelper } = grid;
  const { isSketchView } = sketch;

  return (
    <div
      className='sideNav'
      style={{ width: sideNavbarOpened ? '250px' : '0' }}
    >
      <button
        type='button'
        className='closeBtn'
        onClick={() => { setSideNavbarOpened(false); }}
      >
        &times;
      </button>
      <button
        type='button'
        className='sideNavBtn'
        onClick={() => {
          setGrid({ ...grid, showAxesHelper: !showAxesHelper });
        }}
      >
        {`${showAxesHelper ? 'Hide' : 'Show'} axes helper`}
      </button>
      <button
        type='button'
        className='sideNavBtn'
        onClick={() => {
          setSketch({ ...sketch, isSketchView: !isSketchView });
        }}
      >
        {`${isSketchView ? 'Hide' : 'Show'} sketch view`}
      </button>
    </div>
  );
};

export default SideNavbar;
