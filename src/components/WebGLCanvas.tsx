import React from 'react';
import { Canvas } from '@react-three/fiber';
import ControlsAndCamera from './ControlsAndCamera';
import Grid from './Grid';

interface IWebGLCanvas {}

const WebGLCanvas: React.FC<IWebGLCanvas> = () => (
  <Canvas className='grow'>
    <color attach='background' args={['#041830']} />
    <ControlsAndCamera />
    <Grid />
  </Canvas>
);

export default WebGLCanvas;
