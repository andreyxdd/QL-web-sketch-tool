import React from 'react';
import { Canvas } from '@react-three/fiber';
import ControlsAndCamera from './ControlsAndCamera';
import Grid from './Grid';

interface ICanvasBase {}

const CanvasBase: React.FC<ICanvasBase> = () => (
  <Canvas className='grow'>
    <ControlsAndCamera />
    <Grid />
  </Canvas>
);

export default CanvasBase;
