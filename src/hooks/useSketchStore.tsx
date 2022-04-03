import create from 'zustand';

interface IVertice{
  id: number;
  position: Array<number>;
}

interface IState {
  vertices: Array<IVertice>;
  creatingVertex: boolean;
}

/* eslint-disable no-unused-vars */
export interface ISketchStore extends IState{
  setVertices: (val: Array<IVertice>) => void;
  createNewVertex: () => void;
  stopCreatingVertex: () => void;
}
/* eslint-enable no-unused-vars */

const initialState: IState = {
  vertices: [
    { id: 1, position: [1, 0, 1] },
    { id: 2, position: [3, 0, 3] },
  ],
  creatingVertex: false,
};

const useSketchStore = create<ISketchStore>((set: any) => ({
  ...initialState,
  setVertices: (newVertices: Array<IVertice>) => set(
    () => ({ vertices: newVertices }),
  ),
  createNewVertex: () => set((state: IState) => (
    {
      vertices: [...state.vertices, {
        id: state.vertices.length + 1,
        position: [0, 0, 0],
      }],
      creatingVertex: true,
    }
  )),
  stopCreatingVertex: () => set(() => ({ creatingVertex: false })),
}));

export default useSketchStore;
