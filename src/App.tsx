import React from 'react';
import tw from 'tailwind-styled-components';
import CanvasBase from './components/CanvasBase';
import ToolsNavbar from './components/ToolsNavbar';

const Container = tw.div`
  flex
  flex-col
  h-full
`;

function App(): JSX.Element {
  return (
    <Container>
      <ToolsNavbar />
      <CanvasBase />
    </Container>
  );
}

export default App;
