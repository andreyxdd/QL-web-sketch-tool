import React from 'react';
import shallow from 'zustand/shallow';
import useUIStore, { IUIStore } from '../../hooks/useUIStore';

import './styles.css';

interface IControlNavbarButton{}

const ControlNavbarButton: React.FC<IControlNavbarButton> = () => {
  const [sideNavbarOpened, setSideNavbarOpened] = useUIStore(
    (state: IUIStore) => [state.sideNavbarOpened, state.setSideNavbarOpened],
    shallow,
  );
  return (
    <button
      type='button'
      className='controlNavBtn'
      onClick={() => {
        setSideNavbarOpened(!sideNavbarOpened);
      }}
    >
      &#9776;
    </button>
  );
};

export default ControlNavbarButton;
