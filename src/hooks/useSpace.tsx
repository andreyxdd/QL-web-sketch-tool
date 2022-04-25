import create from 'zustand';
import { useControls } from 'leva';
import shallow from 'zustand/shallow';

interface IState {
  extrusionDepth: number;
  isExtrusionVisible: boolean;
  isDragging: boolean;
  isDodecahedronVisible: boolean;
  isBoxVisible: boolean;
}

/* eslint-disable no-unused-vars */
export interface ISpaceStore extends IState{
  setExtrusionDepth: (extrusionDepth: number) => void;
  setIsExtrusionVisible: (isExtrusionVisible: boolean) => void;
  setIsDragging: (isDragging: boolean) => void;
  setIsDodecahedronVisible: (isDodecahedronVisible: boolean) => void;
  setIsBoxVisible: (isBoxVisible: boolean) => void;
}
/* eslint-enable no-unused-vars */

const initialState: IState = {
  extrusionDepth: 5,
  isExtrusionVisible: true,
  isDragging: false,
  isDodecahedronVisible: false,
  isBoxVisible: false,
};

const useSpace = create<ISpaceStore>((set: any) => ({
  ...initialState,
  setExtrusionDepth: (extrusionDepth: number) => set({ extrusionDepth }),
  setIsExtrusionVisible: (isExtrusionVisible: boolean) => set({ isExtrusionVisible }),
  setIsDragging: (isDragging: boolean) => set({ isDragging }),
  setIsDodecahedronVisible: (isDodecahedronVisible: boolean) => set({ isDodecahedronVisible }),
  setIsBoxVisible: (isBoxVisible: boolean) => set({ isBoxVisible }),
}));

export default useSpace;

export const useSpaceGUI = (): void => {
  const [setExtrusionDepth, setIsExtrusionVisible] = useSpace((state: ISpaceStore) => (
    [state.setExtrusionDepth, state.setIsExtrusionVisible]), shallow);

  useControls('3D Layout', {
    isExtrusionVisible: {
      value: true,
      onChange: (newValue: boolean) => {
        setIsExtrusionVisible(newValue);
      },
      label: 'Show walls',
    },
    extrusionDepth: {
      value: 5,
      min: 0.1,
      max: 10,
      onChange: (newValue: number) => {
        setExtrusionDepth(newValue);
      },
      label: 'Wall height',
    },
  });
};
