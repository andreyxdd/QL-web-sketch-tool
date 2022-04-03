import React from 'react';
import { Canvas } from '@react-three/fiber';
import ControlsAndCamera from './ControlsAndCamera';
import Grid from './Grid';
import Sketch from './Sketch/Sketch';
import useUIStore, { IUIStore } from '../hooks/useUIStore';

interface IWebGLCanvas {}

const WebGLCanvas: React.FC<IWebGLCanvas> = () => {
  const isSketchView = useUIStore(
    (state: IUIStore) => state.sketchView.isSketchView,
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
