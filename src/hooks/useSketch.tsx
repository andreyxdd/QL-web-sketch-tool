import create from 'zustand';
import { Vector3 } from 'three';

interface IVertex{
  id: number;
  position: Vector3;
}

interface IState {
  vertices: Array<IVertex>;
  creatingVertex: boolean;
}

/* eslint-disable no-unused-vars */
export interface ISketchStore extends IState{
  updateVertexPosition: (id: number, newPosition: Vector3) => void;
  setVertices: (val: Array<IVertex>) => void;
  createNewVertex: () => void;
  stopCreatingVertex: () => void;
}
/* eslint-enable no-unused-vars */

const tempVector1 = new Vector3(1, 0, 1);
const tempVector2 = new Vector3(3, 0, 3);
const initialState: IState = {
  vertices: [
    { id: 1, position: tempVector1 },
    { id: 2, position: tempVector2 },
  ],
  creatingVertex: false,
};

const useSketch = create<ISketchStore>((set: any) => ({
  ...initialState,
  updateVertexPosition: (id: number, newPosition: Vector3) => set(
    (state: IState) => {
      const vertices = state.vertices.map((v) => {
        if (v.id === id) {
          return {
            ...v,
            position: new Vector3(newPosition.x, 0, newPosition.z),
          };
        }
        return v;
      });

      return { vertices };
    },
  ),
  setVertices: (newVertices: Array<IVertex>) => set(
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

export default useSketch;
