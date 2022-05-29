import React from 'react';
import tw from 'tailwind-styled-components';
import shallow from 'zustand/shallow';
import WebGLCanvas from './components/WebGLCanvas';
import ToolsNavbar from './components/ToolsNavbar';
import SketchSideBar from './components/Sketch/SketchSidebar';
import CollectionSidebar from './components/Collection/CollectionSidebar';
import SidebarController from './components/SidebarController';
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

  const [showSketchSidebar, setShowSketchSidebar] = useGlobal(
    (state: IGlobalStore) => [state.showSketchSidebar, state.setShowSketchSidebar],
    shallow,
  );
  const [showCollectionSidebar, setShowCollectionSidebar] = useGlobal(
    (state: IGlobalStore) => [state.showCollectionSidebar, state.setShowCollectionSidebar],
    shallow,
  );

  return (
    <>
      <Container>
        <ToolsNavbar />
        {isSketchView && (
          <>
            <SidebarController
              showSidebar={showSketchSidebar}
              setShowSidebar={setShowSketchSidebar}
            />
            <SketchSideBar />
          </>
        )}
        {!isSketchView && (
          <>
            <SidebarController
              showSidebar={showCollectionSidebar}
              setShowSidebar={setShowCollectionSidebar}
            />
            <CollectionSidebar />
          </>
        )}
        <WebGLCanvas />
      </Container>
      {isSketchView ? <SketchHelper /> : <SpatialHelper />}
    </>
  );
}

export default App;
