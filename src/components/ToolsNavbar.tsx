import React from 'react';
import tw from 'tailwind-styled-components';
import shallow from 'zustand/shallow';
import useGlobal, { IGlobalStore } from '../hooks/useGlobal';
import useNewSketch, { ISketchStore } from '../hooks/useSketch';
import IconButton from './IconButton';
import { IconGrid, IconSketch, IconXYZ } from './Icons';

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
  const [grid,
    setGrid,
    sketchView, setSketchView,
    isExtrusionVisible, showExtrusion, hideExtrusion] = useGlobal((state: IGlobalStore) => (
    [state.grid,
      state.setGrid,
      state.sketchView,
      state.setSketchView,
      state.isExtrusionVisible,
      state.showExtrusion,
      state.hideExtrusion,
    ]
  ), shallow);
  const { showAxesHelper, showGrid } = grid;
  const { isSketchView } = sketchView;

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
          setSketchView({ ...sketchView, isSketchView: !isSketchView });
          if (isAddingLine) {
            stopAddingLine();
            if (currentLineId) removeLine(currentLineId);
          }
        }}
        active={isSketchView}
        isFirst
      >
        <IconSketch />
      </IconButton>
      <IconButton
        handleClick={() => {
          setGrid({ ...grid, showGrid: !showGrid });
        }}
        active={showGrid}
      >
        <IconGrid />
      </IconButton>
      <IconButton
        handleClick={() => {
          setGrid({ ...grid, showAxesHelper: !showAxesHelper });
        }}
        active={showAxesHelper}
      >
        <IconXYZ />
      </IconButton>
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
        <p>Line</p>
      </IconButton>
      <IconButton
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
      {/**
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
