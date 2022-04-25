import create from 'zustand';

const defaultSketchViewHeight = 10;

interface IState {
  isSketchView: boolean;
  cameraPosition: [number, number, number];
}

/* eslint-disable no-unused-vars */
export interface IGlobalStore extends IState{
  setIsSketchView: (is: boolean) => void;
}
/* eslint-enable no-unused-vars */

const initialState: IState = {
  isSketchView: false,
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
}));

export default useGlobal;
