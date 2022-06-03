import React from 'react';
import tw from 'tailwind-styled-components';
import shallow from 'zustand/shallow';
import useGlobal, { IGlobalStore } from '../hooks/useGlobal';
import useSpace, { ISpaceStore } from '../hooks/useSpace';
import useNewSketch, { ISketchStore } from '../hooks/useSketch';
import IconButton from './IconButton';

const NavContainer = tw.div`
  flex
  flex-row
  w-full
  justify-start
  align-items-center
  bg-slate-200
  p-1
  z-20 
`;

interface INavbar {}

const Navbar: React.FC<INavbar> = () => {
  const [isSketchView, setIsSketchView] = useGlobal((state: IGlobalStore) => (
    [state.isSketchView, state.setIsSketchView]
  ), shallow);

  const [isAddingLine, startAddingLine, stopAddingLine, currentLineId, removeLine] = useNewSketch(
    (state: ISketchStore) => [
      state.isAddingLine,
      state.startAddingLine,
      state.stopAddingLine,
      state.currentLineId,
      state.removeLine,
    ],
    shallow,
  );

  const modelsToDisplay = useSpace((state: ISpaceStore) => state.modelsToDisplay);

  return (
    <NavContainer>
      <IconButton
        handleClick={() => {
          setIsSketchView(!isSketchView);
          if (isAddingLine) {
            stopAddingLine();
            if (currentLineId) removeLine(currentLineId);
          }
        }}
        active={isSketchView}
        isFirst
      >
        <p>
          {isSketchView ? 'Spatial' : 'Sketch'}
          {' '}
          View
        </p>
      </IconButton>
      <div className='p-2 border-gray-700 border-r border-y'>
        <p>
          Boxes count:
          {' '}
          {modelsToDisplay.filter((m) => m.name === 'Box').length}
        </p>
      </div>
      <div className='p-2 border-gray-700 border-r border-y'>
        <p>
          Dodecahedrons count:
          {' '}
          {modelsToDisplay.filter((m) => m.name === 'Dodecahedron').length}
        </p>
      </div>
      {isSketchView && (
        <IconButton
          handleClick={() => {
            if (isAddingLine) {
              stopAddingLine();
              if (currentLineId) removeLine(currentLineId);
            } else {
              startAddingLine();
            }
          }}
          active={isAddingLine}
        >
          <p>
            {isAddingLine ? 'Stop adding' : 'Add'}
            {' '}
            Line
          </p>
        </IconButton>
      )}
    </NavContainer>
  );
};

export default Navbar;
