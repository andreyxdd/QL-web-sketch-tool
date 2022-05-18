import React from 'react';
import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr } from '@react-three/drei';
import shallow from 'zustand/shallow';
import ControlsAndCamera from './ControlsAndCamera';
import useGrid, { IGridStore, useGridGUI } from '../hooks/useGrid';
import useGlobal, { IGlobalStore } from '../hooks/useGlobal';
import useSpace, { ISpaceStore, useSpaceGUI } from '../hooks/useSpace';
import { useSketchGUI } from '../hooks/useSketch';
import Sketch from './Sketch/Sketch';
import Extrusion from './Extrusion';
import BoxModel from './BoxModel';
import DodecahedronModel from './DodecahedronModel';

interface IWebGLCanvas {}

const WebGLCanvas: React.FC<IWebGLCanvas> = () => {
  const [isAxesVisible, isGridVisible, size, divisions] = useGrid((state: IGridStore) => [
    state.isAxesVisible,
    state.isGridVisible,
    state.size,
    state.divisions,
  ], shallow);
  useGridGUI();

  const [isExtrusionVisible, isDragging] = useSpace(
    (state: ISpaceStore) => [state.isExtrusionVisible, state.isDragging],
    shallow,
  );
  useSpaceGUI();

  const isSketchView = useGlobal((state: IGlobalStore) => state.isSketchView);
  useSketchGUI();

  return (
    <Canvas
      mode='concurrent'
      className='grow'
      shadows
      frameloop={isSketchView || isDragging ? undefined : 'demand'}
      performance={{
        current: 1,
        min: 0.1,
        max: 1,
        debounce: 200,
      }}
      dpr={[1, 2]}
    >
      <BoxModel />
      <DodecahedronModel />
      <color attach='background' args={['#041830']} />
      <ControlsAndCamera />
      <mesh visible={isAxesVisible}>
        <axesHelper />
      </mesh>
      <mesh visible={isGridVisible}>
        <gridHelper args={[size, divisions, '#C0C0C0', '#484848']} />
      </mesh>
      <ambientLight intensity={0.8} />
      <directionalLight
        intensity={0.8}
        castShadow
        position={[10, 50, 10]}
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
      />
      <spotLight position={[100, 100, 100]} castShadow />
      {isSketchView && <Sketch />}
      {isExtrusionVisible && !isSketchView && <Extrusion />}
      <AdaptiveDpr pixelated />
    </Canvas>
  );
};

export default WebGLCanvas;
