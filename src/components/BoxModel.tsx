import React, { MutableRefObject, SetStateAction } from 'react';
import { Mesh } from 'three';
import { Box } from '@react-three/drei';
import { ReactDOMAttributes } from '@use-gesture/react';

interface IBoxModel {
  boxRef: MutableRefObject<Mesh | undefined>;
  boxSize: number;
  // eslint-disable-next-line no-unused-vars
  bind: (...args: any[]) => ReactDOMAttributes;
  setHovered: React.Dispatch<SetStateAction<boolean>>;
  isVisible: boolean;
}

const BoxModel: React.FC<IBoxModel> = ({
  boxRef, boxSize, bind, setHovered, isVisible,
}) => (
  // @ts-ignore
  <Box
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...bind()}
    position={[0, 1, 0]}
    ref={boxRef}
    args={[boxSize, boxSize, boxSize]}
    onPointerOver={() => setHovered(true)}
    onPointerOut={() => setHovered(false)}
    visible={isVisible}
  >
    <meshNormalMaterial attach='material' />
  </Box>
);

export default BoxModel;
