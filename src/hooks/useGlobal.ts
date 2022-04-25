import create from 'zustand';

interface IGrid{
  showAxesHelper: boolean;
  showGrid: boolean;
  size: number;
  divisions: number;
}

interface ISketchView{
  isSketchView: boolean;
  yCoordinate: number;
}

interface IState {
  grid: IGrid;
  sketchView: ISketchView;
  cameraPosition: [number, number, number];
  sideNavbarOpened: boolean;
  isExtrusionVisible: boolean
}

/* eslint-disable no-unused-vars */
export interface IGlobalStore extends IState{
  setGrid: (val: IGrid) => void;
  setSketchView: (val: ISketchView) => void;
  setSideNavbarOpened: (val: boolean) => void;
  showExtrusion: () => void;
  hideExtrusion: () => void;
}
/* eslint-enable no-unused-vars */

const initialState: IState = {
  grid: {
    showAxesHelper: true,
    showGrid: true,
    size: 10,
    divisions: 10,
  },
  sketchView: {
    isSketchView: false,
    yCoordinate: 10,
  },
  isExtrusionVisible: false,
  cameraPosition: [2, 2, 2],
  sideNavbarOpened: false,
};

const useGlobal = create<IGlobalStore>((set: any) => ({
  ...initialState,
  setGrid: (newGrid: IGrid) => set(
    () => ({ grid: newGrid }),
  ),
  setSketchView: (newSketchView: ISketchView) => set(
    () => ({
      sketchView: newSketchView,
      cameraPosition: newSketchView.isSketchView
        ? [0, newSketchView.yCoordinate, 0] : initialState.cameraPosition,
    }),
  ),
  setSideNavbarOpened: (value: boolean) => set(
    () => ({ sideNavbarOpened: value }),
  ),
  showExtrusion: () => set({ isExtrusionVisible: true }),
  hideExtrusion: () => set({ isExtrusionVisible: false }),
}));

export default useGlobal;
