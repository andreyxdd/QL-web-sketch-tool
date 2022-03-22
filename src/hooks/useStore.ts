import create from 'zustand';

interface IGrid{
  showAxesHelper: boolean;
  size: number;
  divisions: number;
}

interface ISketch{
  isSketchView: boolean;
  yCoordinate: number;
}

interface IState {
  grid: IGrid;
  sketch: ISketch;
  cameraPosition: [number, number, number];
  sideNavbarOpened: boolean;
}

/* eslint-disable no-unused-vars */
export interface IStore extends IState{
  setGrid: (val: IGrid) => void;
  setSketch: (val: ISketch) => void;
  setSideNavbarOpened: (val: boolean) => void;
}
/* eslint-enable no-unused-vars */

const initialState: IState = {
  grid: {
    showAxesHelper: true,
    size: 10,
    divisions: 10,
  },
  sketch: {
    isSketchView: false,
    yCoordinate: 10,
  },
  cameraPosition: [2, 2, 2],
  sideNavbarOpened: false,
};

const useStore = create<IStore>((set: any) => ({
  grid: initialState.grid,
  setGrid: (newGrid: IGrid) => set(
    () => ({ grid: newGrid }),
  ),
  sketch: initialState.sketch,
  setSketch: (newSketch: ISketch) => set(
    () => ({
      sketch: newSketch,
      cameraPosition: newSketch.isSketchView
        ? [0, newSketch.yCoordinate, 0] : initialState.cameraPosition,
    }),
  ),
  cameraPosition: initialState.cameraPosition,
  sideNavbarOpened: initialState.sideNavbarOpened,
  setSideNavbarOpened: (value: boolean) => set(
    () => ({ sideNavbarOpened: value }),
  ),
}));

export default useStore;
