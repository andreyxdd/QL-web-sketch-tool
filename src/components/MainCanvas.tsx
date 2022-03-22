import React from 'react';
import { Canvas } from '@react-three/fiber';
import ControlsAndCamera from './ControlsAndCamera';
import Grid from './Grid';

interface ICanvas {}

const MainCanvas: React.FC<ICanvas> = () => (
  <Canvas>
    <ControlsAndCamera />
    <Grid />
  </Canvas>
);

export default MainCanvas;
