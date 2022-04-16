import React from 'react';
import shallow from 'zustand/shallow';
import useGlobal, { IGlobalStore } from '../../hooks/useGlobal';

import './styles.css';

interface IControlNavbarButton{}

const ControlNavbarButton: React.FC<IControlNavbarButton> = () => {
  const [sideNavbarOpened, setSideNavbarOpened] = useGlobal(
    (state: IGlobalStore) => [state.sideNavbarOpened, state.setSideNavbarOpened],
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
