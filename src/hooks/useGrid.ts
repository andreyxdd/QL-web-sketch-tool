import create from 'zustand';
import { useControls } from 'leva';
import shallow from 'zustand/shallow';

interface IState {
  isAxesVisible: boolean;
  isGridVisible: boolean;
  size: number;
  divisions: number;
}

/* eslint-disable no-unused-vars */
export interface IGridStore extends IState{
  setIsAxesVisible: (isVisible: boolean) => void;
  setIsGridVisible: (isVisible: boolean) => void;
  setSize: (size: number) => void;
  setDivisions: (divisions: number) => void;
}
/* eslint-enable no-unused-vars */

const initialState: IState = {
  isAxesVisible: true,
  isGridVisible: true,
  size: 20,
  divisions: 20,
};

const useGrid = create<IGridStore>((set: any) => ({
  ...initialState,
  setIsAxesVisible: (isVisible: boolean) => set({ isAxesVisible: isVisible }),
  setIsGridVisible: (isVisible: boolean) => set({ isGridVisible: isVisible }),
  setSize: (size: number) => set({ size }),
  setDivisions: (divisions: number) => set({ divisions }),
}));

export default useGrid;

export const useGridGUI = (): void => {
  const [setIsAxesVisible, setIsGridVisible,
    setSize, setDivisions] = useGrid((state: IGridStore) => (
    [state.setIsAxesVisible, state.setIsGridVisible,
      state.setSize, state.setDivisions]), shallow);

  useControls('Grid Settings', {
    Axes: {
      value: true,
      onChange: (newValue: boolean) => {
        setIsAxesVisible(newValue);
      },
      label: 'Show Axes',
    },
    Grid: {
      value: true,
      onChange: (newValue: boolean) => {
        setIsGridVisible(newValue);
      },
      label: 'Show Grid',
    },
    Size: {
      value: 20,
      min: 1,
      max: 100,
      onChange: (newValue: number) => {
        setSize(newValue);
      },
      label: 'Size',
    },
    Divisions: {
      value: 20,
      min: 1,
      max: 100,
      onChange: (newValue: number) => {
        setDivisions(newValue);
      },
      label: 'Divisions',
    },
  });
};
