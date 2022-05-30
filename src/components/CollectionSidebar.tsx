import React from 'react';
import tw from 'tailwind-styled-components';
import useGlobal, { IGlobalStore } from '../hooks/useGlobal';
import useSpace, { ISpaceStore } from '../hooks/useSpace';
import modelsCollection from '../models/modelsCollection';

type ICollectionSidebar = {}

interface SidebarProps {
  $show: boolean
}

// eslint-disable-next-line no-unused-vars
const SidebarContainer = tw.div<SidebarProps>`
  absolute
  w-[24vw]
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
  const addModelToDisplay = useSpace((state: ISpaceStore) => state.addModelToDisplay);

  return (
    <SidebarContainer $show={showCollectionSidebar}>
      <h2 className='mt-24 mb-4 font-semibold text-lg text-black text-center'>
        3D Models Collection
      </h2>
      <div className='pb-4 ml-4 mr-4'>
        {/* eslint-disable-next-line max-len */}
        Below buttons allow adding the multiple 3D models to the sketch. The list will be extended with the custom models, i.e. hydraulic equipment.
      </div>
      <div className='border-b-2 border-slate-400' />
      <div className='ml-4 mr-4 pt-4 pb-8 grid grid-cols-2 gap-2'>
        {modelsCollection.map((item) => (
          <button
            type='button'
            key={item.name}
            className='hover:bg-slate-400'
            onClick={() => {
              addModelToDisplay(
                item.name,
                item.material,
                item.characteristicSizes,
              );
            }}
          >
            <div className='flex flex-col border-4 rounded-md border-indigo-600 p-2'>
              <p className='flex justify-center font-semibold pb-2'>
                {item.name}
              </p>
              <div className='flex flex-row'>
                <p className='mr-1'>
                  Material:
                </p>
                <p className='italic'>
                  {item.material}
                </p>
              </div>
              <p className='flex justify-start'>Characteristic sizes, m:</p>
              <p className='flex justify-center italic'>
                {item.characteristicSizes.x}
                {' '}
                x
                {' '}
                {item.characteristicSizes.y}
                {' '}
                x
                {' '}
                {item.characteristicSizes.z}
              </p>
            </div>
          </button>
        ))}
      </div>
    </SidebarContainer>
  );
};

export default CollectionSidebar;
