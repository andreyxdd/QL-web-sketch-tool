import React from 'react';
import { Canvas } from '@react-three/fiber';
import Controls from './Controls';
import Grid from './Grid';

interface ICanvas {}

const MainCanvas: React.FC<ICanvas> = () => (
  <Canvas camera={{ position: [2, 2, 2] }}>
    <Controls />
    <Grid />
  </Canvas>
);

export default MainCanvas;
