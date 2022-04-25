import React from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import shallow from 'zustand/shallow';
import useGlobal, { IGlobalStore } from '../hooks/useGlobal';
import useSpace, { ISpaceStore } from '../hooks/useSpace';

const ControlsAndCamera = (): JSX.Element => {
  const { camera } = useThree();
  const controlsRef = React.useRef<any>();
  const [isSketchView, position] = useGlobal(
    (state: IGlobalStore) => [state.isSketchView, state.cameraPosition],
    shallow,
  );
  const isDragging = useSpace(
    (state: ISpaceStore) => state.isDragging,
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
      enableDamping={false}
      enabled={!isDragging}
    />
  );
};

export default ControlsAndCamera;
