import React from 'react';
import tw from 'tailwind-styled-components';
import shallow from 'zustand/shallow';
import useGlobal, { IGlobalStore } from '../../hooks/useGlobal';
import useSketch, { ISketchStore, ILine } from '../../hooks/useSketch';
import PointField from './PointField';

type ISketchSidebar = {}

interface SidebarProps {
  $show: boolean
}

// eslint-disable-next-line no-unused-vars
const SidebarContainer = tw.div<SidebarProps>`
  absolute
  w-[20vw]
  bg-slate-200
  h-full
  z-10
  ease-in-out
  duration-300
  ${(p) => (p.$show ? 'translate-x-0 ' : '-translate-x-full')}
  overflow-auto
`;

const SketchSidebar: React.FC<ISketchSidebar> = () => {
  const showSketchSidebar = useGlobal((state: IGlobalStore) => state.showSketchSidebar);

  // eslint-disable-next-line no-unused-vars
  const [points, lines] = useSketch((state: ISketchStore) => [state.points, state.lines], shallow);

  return (
    <SidebarContainer $show={showSketchSidebar}>
      <h2 className='mt-24 mb-4 font-semibold text-lg text-black text-center'>
        Sketch Primitives
      </h2>
      <div className='ml-4 pb-8'>
        {lines.length > 0 && lines.map((line: ILine) => (
          <div key={line.id} className='pt-4'>
            <p className='pb-4 font-semibold'>
              Line
              {' '}
              {line.id}
              :
            </p>
            <PointField pointId={line.startPointId} lineId={line.id} isStartPoint />
            <PointField pointId={line.endPointId} lineId={line.id} />
            <div className='border-b-2 border-slate-400 pb-4' />
          </div>
        ))}
      </div>
    </SidebarContainer>
  );
};

export default SketchSidebar;
