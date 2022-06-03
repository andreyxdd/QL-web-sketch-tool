import React from 'react';

type ISidebarController = {
  showSidebar: boolean;
  // eslint-disable-next-line no-unused-vars
  setShowSidebar: (show: boolean) => void;
}

const SidebarController: React.FC<ISidebarController> = ({
  showSidebar, setShowSidebar,
}) => {
  if (showSidebar) {
    return (
      <button
        type='button'
        className='flex text-4xl text-black items-center cursor-pointer fixed left-4 top-14 z-50'
        onClick={() => setShowSidebar(!showSidebar)}
      >
        x
      </button>
    );
  }
  return (
    <svg
      onClick={() => setShowSidebar(!showSidebar)}
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

export default SidebarController;
