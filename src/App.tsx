import React from 'react';
import tw from 'tailwind-styled-components';
import CanvasBase from './components/CanvasBase';
// import ControlNavbarButton from './components/SideNavbar/ControlNavbarButton';
// import SideNavbar from './components/SideNavbar/SideNavbar';

const Container = tw.div`
  flex
  flex-col
  h-full
`;

function App(): JSX.Element {
  return (
    <Container>
      <div className='bg-green-300'>Navbar</div>
      <CanvasBase />
    </Container>
  );
}

export default App;
