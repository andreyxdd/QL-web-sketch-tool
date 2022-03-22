import React from 'react';
import shallow from 'zustand/shallow';
import useStore, { IStore } from '../../hooks/useStore';

import './styles.css';

interface IControlNavbarButton{}

const ControlNavbarButton: React.FC<IControlNavbarButton> = () => {
  const [sideNavbarOpened, setSideNavbarOpened] = useStore(
    (state: IStore) => [state.sideNavbarOpened, state.setSideNavbarOpened],
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
