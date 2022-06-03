import create from 'zustand';

const defaultSketchViewHeight = 10;

interface IState {
  isSketchView: boolean;
  showSketchSidebar: boolean;
  showCollectionSidebar: boolean;
  cameraPosition: [number, number, number];
}

/* eslint-disable no-unused-vars */
export interface IGlobalStore extends IState{
  setIsSketchView: (is: boolean) => void;
  setShowSketchSidebar: (show: boolean) => void;
  setShowCollectionSidebar: (show: boolean) => void;
}
/* eslint-enable no-unused-vars */

const initialState: IState = {
  isSketchView: false,
  showSketchSidebar: true,
  showCollectionSidebar: true,
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
  setShowSketchSidebar: (showSketchSidebar: boolean) => set({ showSketchSidebar }),
  setShowCollectionSidebar: (showCollectionSidebar: boolean) => set({ showCollectionSidebar }),
}));

export default useGlobal;
