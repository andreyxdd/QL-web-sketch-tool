import React from 'react';
import MainCanvas from './components/MainCanvas';
import ControlNavbarButton from './components/SideNavbar/ControlNavbarButton';
import SideNavbar from './components/SideNavbar/SideNavbar';

function App(): JSX.Element {
  return (
    <>
      <ControlNavbarButton />
      <SideNavbar />
      <MainCanvas />
    </>
  );
}

export default App;
