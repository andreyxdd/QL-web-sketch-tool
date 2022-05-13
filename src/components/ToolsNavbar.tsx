import React from 'react';
import tw from 'tailwind-styled-components';
import shallow from 'zustand/shallow';
import useGlobal, { IGlobalStore } from '../hooks/useGlobal';
import useNewSketch, { ISketchStore } from '../hooks/useSketch';
import useSpace, { ISpaceStore } from '../hooks/useSpace';
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

interface IToolsNavbar {}

const ToolsNavbar: React.FC<IToolsNavbar> = () => {
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

  const [isBoxVisible, isDodecahedronVisible, setIsDodecahedronVisible, setIsBoxVisible] = useSpace(
    (state: ISpaceStore) => [
      state.isBoxVisible,
      state.isDodecahedronVisible,
      state.setIsDodecahedronVisible,
      state.setIsBoxVisible,
    ],
    shallow,
  );

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
      <IconButton
        handleClick={() => {
          setIsBoxVisible(!isBoxVisible);
        }}
        active={isBoxVisible}
      >
        <p>
          {isBoxVisible ? 'Hide' : 'Show'}
          {' '}
          Box
        </p>
      </IconButton>
      <IconButton
        handleClick={() => {
          setIsDodecahedronVisible(!isDodecahedronVisible);
        }}
        active={isDodecahedronVisible}
      >
        <p>
          {isDodecahedronVisible ? 'Hide' : 'Show'}
          {' '}
          Dodecahedron
        </p>
      </IconButton>
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

export default ToolsNavbar;
