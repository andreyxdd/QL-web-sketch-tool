import React from 'react';
import shallow from 'zustand/shallow';
import useGlobal, { IGlobalStore } from '../hooks/useGlobal';

type ISketchSidebarController = {}

const SketchSidebarController: React.FC<ISketchSidebarController> = () => {
  const [showSketchSidebar, setSketchShowSidebar] = useGlobal(
    (state: IGlobalStore) => [state.showSketchSidebar, state.setSketchShowSidebar],
    shallow,
  );

  if (showSketchSidebar) {
    return (
      <button
        type='button'
        className='flex text-4xl text-black items-center cursor-pointer fixed left-4 top-14 z-50'
        onClick={() => setSketchShowSidebar(!showSketchSidebar)}
      >
        x
      </button>
    );
  }
  return (
    <svg
      onClick={() => setSketchShowSidebar(!showSketchSidebar)}
      className='flex items-center cursor-pointer fixed left-3 top-16 z-30'
      fill='#F0F0F0'
      viewBox='0 0 100 80'
      width='40'
      height='40'
    >
      <rect width='80' height='8' />
      <rect y='30' width='80' height='8' />
      <rect y='60' width='80' height='8' />
    </svg>
  );
};

export default SketchSidebarController;
