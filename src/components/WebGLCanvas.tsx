import React from 'react';
import { Canvas } from '@react-three/fiber';
import ControlsAndCamera from './ControlsAndCamera';
import Grid from './Grid';
import Sketch from './Sketch/Sketch';
import useStore, { IStore } from '../hooks/useStore';

interface IWebGLCanvas {}

const WebGLCanvas: React.FC<IWebGLCanvas> = () => {
  const isSketchView = useStore(
    (state: IStore) => state.sketch.isSketchView,
  );

  return (
    <Canvas className='grow'>
      <color attach='background' args={['#041830']} />
      <ControlsAndCamera />
      <Grid />
      {isSketchView && <Sketch />}
    </Canvas>
  );
};

export default WebGLCanvas;
