import React from 'react';
import { Canvas } from '@react-three/fiber';
import ControlsAndCamera from './ControlsAndCamera';
import Grid from './Grid';
import Sketch from './NewSketch/NewSketch';
import useGlobal, { IGlobalStore } from '../hooks/useGlobal';

interface IWebGLCanvas {}

const WebGLCanvas: React.FC<IWebGLCanvas> = () => {
  const isSketchView = useGlobal(
    (state: IGlobalStore) => state.sketchView.isSketchView,
  );

  return (
    <Canvas className='grow'>
      <color attach='background' args={['#041830']} />
      <ControlsAndCamera />
      <Grid />
      {isSketchView
        && (
          <Sketch />
        )}
    </Canvas>
  );
};

export default WebGLCanvas;
