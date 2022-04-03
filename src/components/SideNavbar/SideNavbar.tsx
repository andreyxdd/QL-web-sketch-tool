import React from 'react';
import shallow from 'zustand/shallow';
import useUIStore, { IUIStore } from '../../hooks/useUIStore';

import './styles.css';

interface ISideNavbar {}

const SideNavbar: React.FC<ISideNavbar> = () => {
  const [
    grid,
    setGrid,
    sketchView,
    setSketchView,
    sideNavbarOpened,
    setSideNavbarOpened,
  ] = useUIStore((state: IUIStore) => (
    [
      state.grid,
      state.setGrid,
      state.sketchView,
      state.setSketchView,
      state.sideNavbarOpened,
      state.setSideNavbarOpened,
    ]
  ), shallow);
  const { showAxesHelper } = grid;
  const { isSketchView } = sketchView;

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
          setSketchView({ ...sketchView, isSketchView: !isSketchView });
        }}
      >
        {`${isSketchView ? 'Hide' : 'Show'} sketch view`}
      </button>
    </div>
  );
};

export default SideNavbar;
