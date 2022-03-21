import React from 'react';
import { OrbitControls } from '@react-three/drei';

const Controls = (): JSX.Element => (
  <OrbitControls
    maxPolarAngle={Math.PI / 2}
  />
);

export default Controls;
