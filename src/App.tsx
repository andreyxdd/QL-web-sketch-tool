import React from 'react';
import tw from 'tailwind-styled-components';
import WebGLCanvas from './components/WebGLCanvas';
import ToolsNavbar from './components/ToolsNavbar';
import SpatialHelper from './components/SpatialHelper';
import SketchHelper from './components/SketchHelper';
import useGlobal, { IGlobalStore } from './hooks/useGlobal';

const Container = tw.div`
  flex
  flex-col
  h-full
`;

function App(): JSX.Element {
  const isSketchView = useGlobal((state: IGlobalStore) => state.isSketchView);
  return (
    <>
      <Container>
        <ToolsNavbar />
        <WebGLCanvas />
      </Container>
      {isSketchView ? <SketchHelper /> : <SpatialHelper />}
    </>
  );
}

export default App;
