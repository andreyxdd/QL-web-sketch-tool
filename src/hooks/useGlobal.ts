import create from 'zustand';

const defaultSketchViewHeight = 10;

interface IState {
  isSketchView: boolean;
  showSketchSidebar: boolean;
  cameraPosition: [number, number, number];
}

/* eslint-disable no-unused-vars */
export interface IGlobalStore extends IState{
  setIsSketchView: (is: boolean) => void;
  setSketchShowSidebar: (show: boolean) => void;
}
/* eslint-enable no-unused-vars */

const initialState: IState = {
  isSketchView: false,
  showSketchSidebar: true,
  cameraPosition: [10, 10, 10],
};

const useGlobal = create<IGlobalStore>((set: any) => ({
  ...initialState,
  setIsSketchView: (isSketchView: boolean) => set(
    () => ({
      isSketchView,
      cameraPosition: isSketchView
        ? [0, defaultSketchViewHeight, 0] : initialState.cameraPosition,
    }),
  ),
  setSketchShowSidebar: (showSketchSidebar: boolean) => set({ showSketchSidebar }),
}));

export default useGlobal;
