import React from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import shallow from 'zustand/shallow';
import useStore, { IStore } from '../hooks/useStore';

const ControlsAndCamera = (): JSX.Element => {
  const { camera } = useThree();
  const controlsRef = React.useRef<any>();
  const [{ isSketchView }, position] = useStore(
    (state: IStore) => [state.sketch, state.cameraPosition],
    shallow,
  );

  useFrame(() => controlsRef.current.update());

  React.useEffect(() => {
    controlsRef.current.reset();
    controlsRef.current.target.set(0, 0, 0);
    camera.position.set(position[0], position[1], position[2]);
  }, [isSketchView, position, camera]);

  return (
    <OrbitControls
      ref={controlsRef}
      camera={camera}
      maxPolarAngle={Math.PI / 2}
      enableRotate={!isSketchView}
    />
  );
};

export default ControlsAndCamera;
