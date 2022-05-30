import create from 'zustand';
import { useControls } from 'leva';
import shallow from 'zustand/shallow';

export interface IModel {
  id: number;
  name: string;
  characteristicSizes: { x: number, y: number, z: number };
  material?: string;
}
interface IState {
  extrusionDepth: number;
  isExtrusionVisible: boolean;
  isDragging: boolean;
  modelsToDisplay: Array<IModel>;
}

/* eslint-disable no-unused-vars */
export interface ISpaceStore extends IState{
  setExtrusionDepth: (extrusionDepth: number) => void;
  setIsExtrusionVisible: (isExtrusionVisible: boolean) => void;
  setIsDragging: (isDragging: boolean) => void;
  addModelToDisplay: (
    name: string,
    material: string,
    characteristicSizes: { x: number, y: number, z: number }
  ) => void;
  removeModelToDisplay: (id: number) => void;
}
/* eslint-enable no-unused-vars */

const initialState: IState = {
  extrusionDepth: 5,
  isExtrusionVisible: true,
  isDragging: false,
  modelsToDisplay: [],
};

const useSpace = create<ISpaceStore>((set: any) => ({
  ...initialState,
  setExtrusionDepth: (extrusionDepth: number) => set({ extrusionDepth }),
  setIsExtrusionVisible: (isExtrusionVisible: boolean) => set({ isExtrusionVisible }),
  setIsDragging: (isDragging: boolean) => set({ isDragging }),
  addModelToDisplay: (
    name: string,
    material: string,
    characteristicSizes: { x: number, y: number, z: number },
  ) => set((state: ISpaceStore) => (
    {
      modelsToDisplay: [
        ...state.modelsToDisplay,
        {
          name,
          characteristicSizes,
          material,
          id: state.modelsToDisplay.length + 1,
        },
      ],
    }
  )),
  removeModelToDisplay: (id: number) => set((state: ISpaceStore) => (
    {
      modelsToDisplay: state.modelsToDisplay.filter((model) => model.id !== id),
    }
  )),
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
