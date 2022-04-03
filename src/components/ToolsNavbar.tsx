import React from 'react';
import tw from 'tailwind-styled-components';
import shallow from 'zustand/shallow';
import useUIStore, { IUIStore } from '../hooks/useUIStore';
import useSketchStore, { ISketchStore } from '../hooks/useSketchStore';
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
  const [
    grid,
    setGrid,
    sketchView,
    setSketchView,
  ] = useUIStore((state: IUIStore) => (
    [
      state.grid,
      state.setGrid,
      state.sketchView,
      state.setSketchView,
    ]
  ), shallow);
  const { showAxesHelper, showGrid } = grid;
  const { isSketchView } = sketchView;

  const createNewVertex = useSketchStore(
    (state: ISketchStore) => (state.createNewVertex),
  );

  return (
    <NavContainer>
      <IconButton
        handleClick={() => {
          setSketchView({ ...sketchView, isSketchView: !isSketchView });
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
          createNewVertex();
        }}
        active={false}
      >
        <p>Point</p>
      </IconButton>
    </NavContainer>
  );
};

export default ToolsNavbar;
