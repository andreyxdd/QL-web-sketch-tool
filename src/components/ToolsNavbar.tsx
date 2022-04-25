import React from 'react';
import tw from 'tailwind-styled-components';
import shallow from 'zustand/shallow';
import useGlobal, { IGlobalStore } from '../hooks/useGlobal';
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

      {/** <IconButton
        handleClick={() => {
          if (isExtrusionVisible) {
            hideExtrusion();
          } else {
            showExtrusion();
          }
        }}
        active={isExtrusionVisible}
      >
        <p>Show extrusion</p>
      </IconButton>

      <IconButton
        handleClick={() => {
          makeHorizontal(1);
        }}
        active={false}
      >
        <p>Horiz</p>
      </IconButton>
      <IconButton
        handleClick={() => {
          makeVertical(1);
        }}
        active={false}
      >
        <p>Vertical</p>
      </IconButton> */}
    </NavContainer>
  );
};

export default ToolsNavbar;
