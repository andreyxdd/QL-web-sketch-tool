import React from 'react';
import tw from 'tailwind-styled-components';
import WebGLCanvas from './components/WebGLCanvas';
import ToolsNavbar from './components/ToolsNavbar';
import Helper from './components/Helper';

const Container = tw.div`
  flex
  flex-col
  h-full
`;

function App(): JSX.Element {
  return (
    <>
      <Container>
        <ToolsNavbar />
        <WebGLCanvas />
      </Container>
      <Helper />
    </>
  );
}

export default App;
