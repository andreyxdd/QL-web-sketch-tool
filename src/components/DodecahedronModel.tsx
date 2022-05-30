import React, { MutableRefObject, SetStateAction } from 'react';
import { Mesh } from 'three';
import { Dodecahedron } from '@react-three/drei';
import { ReactDOMAttributes } from '@use-gesture/react';

interface IDodecahedron {
  dodecahedronRef: MutableRefObject<Mesh | undefined>;
  dodecahedronRadius: number;
  // eslint-disable-next-line no-unused-vars
  bind: (...args: any[]) => ReactDOMAttributes;
  setHovered: React.Dispatch<SetStateAction<boolean>>;
  isVisible: boolean;
}

const DodecahedronModel: React.FC<IDodecahedron> = ({
  dodecahedronRef, dodecahedronRadius, bind, setHovered, isVisible,
}) => (
  // @ts-ignore
  <Dodecahedron
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...bind()}
    ref={dodecahedronRef}
    args={[dodecahedronRadius, 0]}
    position={[0, 2, 0]}
    onPointerOver={() => setHovered(true)}
    onPointerOut={() => setHovered(false)}
    visible={isVisible}
  >
    <meshNormalMaterial attach='material' />
  </Dodecahedron>
);
export default DodecahedronModel;
