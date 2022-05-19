import React from 'react';
import tw from 'tailwind-styled-components';
import useGlobal, { IGlobalStore } from '../hooks/useGlobal';

type ICollectionSidebar = {}

interface SidebarProps {
  $show: boolean
}

// eslint-disable-next-line no-unused-vars
const SidebarContainer = tw.div<SidebarProps>`
  absolute
  w-[16vw]
  bg-slate-200
  h-full
  z-10
  opacity-80
  ease-in-out
  duration-300
  ${(p) => (p.$show ? 'translate-x-0 ' : '-translate-x-full')}
  overflow-auto
`;

const CollectionSidebar: React.FC<ICollectionSidebar> = () => {
  const showCollectionSidebar = useGlobal((state: IGlobalStore) => state.showCollectionSidebar);

  return (
    <SidebarContainer $show={showCollectionSidebar}>
      <h2 className='mt-24 mb-4 font-semibold text-black text-center'>
        3D Models Collection
      </h2>
      <div className='ml-4 pb-8'>
        Hello
      </div>
    </SidebarContainer>
  );
};

export default CollectionSidebar;
