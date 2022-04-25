import React from 'react';
import { Canvas } from '@react-three/fiber';
import shallow from 'zustand/shallow';
import ControlsAndCamera from './ControlsAndCamera';
import useGrid, { IGridStore, useGridGUI } from '../hooks/useGrid';
import useGlobal, { IGlobalStore } from '../hooks/useGlobal';
import Sketch from './Sketch/Sketch';

interface IWebGLCanvas {}

const WebGLCanvas: React.FC<IWebGLCanvas> = () => {
  const [isAxesVisible, isGridVisible, size, divisions] = useGrid((state: IGridStore) => [
    state.isAxesVisible,
    state.isGridVisible,
    state.size,
    state.divisions,
  ], shallow);
  useGridGUI();

  const isSketchView = useGlobal((state: IGlobalStore) => state.isSketchView);

  return (
    <Canvas
      className='grow'
      frameloop={isSketchView ? undefined : 'demand'}
      performance={{
        current: 1,
        min: 0.1,
        max: 1,
        debounce: 200,
      }}
    >
      <color attach='background' args={['#041830']} />
      <ControlsAndCamera />
      <mesh visible={isAxesVisible}>
        <axesHelper />
      </mesh>
      <mesh visible={isGridVisible}>
        <gridHelper args={[size, divisions, '#F0F0F0', '#585858']} />
      </mesh>
      {isSketchView && <Sketch />}
    </Canvas>
  );
};

export default WebGLCanvas;
