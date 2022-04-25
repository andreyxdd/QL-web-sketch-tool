import React from 'react';
import { Canvas } from '@react-three/fiber';
import shallow from 'zustand/shallow';
import ControlsAndCamera from './ControlsAndCamera';
import Grid from './Grid';
import Sketch from './Sketch/Sketch';
import useGlobal, { IGlobalStore } from '../hooks/useGlobal';
import Extrusion from './Extrusion';

interface IWebGLCanvas {}

const WebGLCanvas: React.FC<IWebGLCanvas> = () => {
  const [isSketchView, isExtrusionVisible] = useGlobal((state: IGlobalStore) => [
    state.sketchView.isSketchView,
    state.isExtrusionVisible,
  ], shallow);

  return (
    <Canvas className='grow'>
      <color attach='background' args={['#041830']} />
      <ControlsAndCamera />
      <Grid />
      {isExtrusionVisible && !isSketchView && <Extrusion />}
      {isSketchView
        && (
          <Sketch />
        )}
    </Canvas>
  );
};

export default WebGLCanvas;
