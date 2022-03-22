import create from 'zustand';

interface IGrid{
  showHelper: boolean;
  size: number;
  divisions: number;
}

interface IStore{
  grid: IGrid;
  // eslint-disable-next-line no-unused-vars
  setGrid: (grid: IGrid) => void;
  cameraPosition: [number, number, number];
  // eslint-disable-next-line no-unused-vars
  setCameraPosition: (coords: [number, number, number]) => void;
}

const useStore = create<IStore>((set: any) => ({
  grid: {
    showHelper: true, size: 10, divisions: 10,
  },
  setGrid: (grid: IGrid) => set(() => ({ grid })),
  cameraPosition: [2, 2, 2],
  setCameraPosition: (cameraPosition: [number, number, number]) => set(() => ({ cameraPosition })),
}));

export default useStore;
