import React from 'react';
import tw from 'tailwind-styled-components';
import useGlobal, { IGlobalStore } from '../hooks/useGlobal';

type ISketchSidebar = {}

interface SidebarProps {
  $show: boolean
}

// eslint-disable-next-line no-unused-vars
const SidebarContainer = tw.div<SidebarProps>`
  absolute
  w-[18vw]
  bg-slate-200
  text-center
  h-full
  z-10
  opacity-70
  ease-in-out
  duration-300
  ${(p) => (p.$show ? 'translate-x-0 ' : '-translate-x-full')}
`;

const SketchSidebar: React.FC<ISketchSidebar> = () => {
  const showSketchSidebar = useGlobal((state: IGlobalStore) => state.showSketchSidebar);

  return (
    <SidebarContainer $show={showSketchSidebar}>
      <h2 className='mt-24 font-semibold text-black '>
        Sketch Primitives
      </h2>
    </SidebarContainer>
  );
};

export default SketchSidebar;
