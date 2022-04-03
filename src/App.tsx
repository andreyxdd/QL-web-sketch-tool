import React from 'react';
import tw from 'tailwind-styled-components';
import WebGLCanvas from './components/WebGLCanvas';
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
      <WebGLCanvas />
    </Container>
  );
}

export default App;
