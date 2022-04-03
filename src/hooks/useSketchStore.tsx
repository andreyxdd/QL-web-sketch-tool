import create from 'zustand';

interface IVertice{
  id: number;
  position: Array<number>;
}

interface IState {
  vertices: Array<IVertice>;
}

/* eslint-disable no-unused-vars */
export interface ISketchStore extends IState{
  setVertices: (val: Array<IVertice>) => void;
}
/* eslint-enable no-unused-vars */

const initialState: IState = {
  vertices: [
    { id: 1, position: [1, 0, 1] },
    { id: 2, position: [3, 0, 3] },
  ],
};

const useSketchStore = create<ISketchStore>((set: any) => ({
  ...initialState,
  setVertices: (newVertices: Array<IVertice>) => set(
    () => ({ vertices: newVertices }),
  ),
}));

export default useSketchStore;
