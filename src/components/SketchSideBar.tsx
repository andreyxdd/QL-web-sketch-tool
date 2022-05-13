import React from 'react';
import tw from 'tailwind-styled-components';
import shallow from 'zustand/shallow';
import useGlobal, { IGlobalStore } from '../hooks/useGlobal';
import useSketch, { ISketchStore, ILine } from '../hooks/useSketch';

type ISketchSidebar = {}

interface SidebarProps {
  $show: boolean
}

// eslint-disable-next-line no-unused-vars
const SidebarContainer = tw.div<SidebarProps>`
  absolute
  w-[18vw]
  bg-slate-200
  h-full
  z-10
  opacity-70
  ease-in-out
  duration-300
  ${(p) => (p.$show ? 'translate-x-0 ' : '-translate-x-full')}
`;

const SketchSidebar: React.FC<ISketchSidebar> = () => {
  const showSketchSidebar = useGlobal((state: IGlobalStore) => state.showSketchSidebar);

  const [points, lines] = useSketch((state: ISketchStore) => [state.points, state.lines], shallow);

  return (
    <SidebarContainer $show={showSketchSidebar}>
      <h2 className='mt-24 mb-4 font-semibold text-black text-center'>
        Sketch Primitives
      </h2>
      {points.length > 2 && lines.map((line: ILine) => (
        <div key={line.id} className='ml-4'>
          <p>
            Line
            {' '}
            {line.id}
            :
          </p>
          <div key={line.id} className='ml-4'>
            <p>
              Point
              {' '}
              {line.startPointId}
              :
            </p>
            <p className='ml-6'>
              X:
              {' '}
              {points[line.startPointId - 1].position.x.toFixed(2)}
            </p>
            <p className='ml-6'>
              Y:
              {' '}
              {-points[line.startPointId - 1].position.z.toFixed(2)}
            </p>
          </div>

          <div key={line.id} className='ml-4'>
            <p>
              Point
              {' '}
              {line.endPointId}
              :
            </p>
            <p className='ml-6'>
              X:
              {' '}
              {points[line.endPointId - 1].position.x.toFixed(2)}
            </p>
            <p className='ml-6'>
              Y:
              {' '}
              {-points[line.endPointId - 1].position.z.toFixed(2)}
            </p>
          </div>
        </div>
      ))}
    </SidebarContainer>
  );
};

export default SketchSidebar;
