import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { arrayToVector3 } from '../../utils/geometryHelpers';

interface IBox {
  position: Array<number>;
}

const Box: React.FC<IBox> = ({ position }) => {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef<THREE.Mesh>();

  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);

  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.x += 0.01;
    }
    return ref.current && ref.current.rotation.x;
  });

  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      position={arrayToVector3(position)}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={() => click(!clicked)}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  );
};

export default Box;
