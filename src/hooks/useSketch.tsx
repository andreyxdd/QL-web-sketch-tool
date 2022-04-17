import create from 'zustand';
import { Vector3 } from 'three';

interface IVertex {
  id: number;
  position: Vector3;
}

interface ILine {
  id: number;
  startVertex: IVertex;
  endVertex: IVertex;
}

interface IState {
  vertices: Array<IVertex>;
  lines: Array<ILine>;
  creatingVertex: boolean;
}

/* eslint-disable no-unused-vars */
export interface ISketchStore extends IState {
  updateVertexPosition: (id: number, newPosition: Vector3) => void;
  makeHorizontal: (id: number) => void;
  makeVertical: (id: number) => void;
  updateLineLength: (id: number, newLength: number) => void;
  setVertices: (val: Array<IVertex>) => void;
  createNewVertex: () => void;
  stopCreatingVertex: () => void;
}
/* eslint-enable no-unused-vars */

const tempVector1 = new Vector3(1, 0, -2);
const tempVector2 = new Vector3(3, 0, -1);
const initialState: IState = {
  vertices: [
    { id: 1, position: tempVector1 },
    { id: 2, position: tempVector2 },
  ],
  lines: [
    {
      id: 1,
      startVertex: { id: 1, position: tempVector1 },
      endVertex: { id: 2, position: tempVector2 },
    },
  ],
  creatingVertex: false,
};

const useSketch = create<ISketchStore>((set: any, get: any) => ({
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

      const lines = state.lines.map((l) => {
        if (l.startVertex.id === id) {
          return {
            ...l,
            startVertex: { id, position: new Vector3(newPosition.x, 0, newPosition.z) },
          };
        }
        if (l.endVertex.id === id) {
          return {
            ...l,
            endVertex: { id, position: new Vector3(newPosition.x, 0, newPosition.z) },
          };
        }
        return l;
      });

      return { vertices, lines };
    },
  ),
  makeHorizontal: (id: number) => set(
    (state: IState) => {
      const line = state.lines.find((l) => l.id === id);

      if (line) {
        const { startVertex, endVertex } = line;

        const currentLength = startVertex.position.distanceTo(endVertex.position);

        const newEndVertexPosition = new Vector3(
          startVertex.position.x + currentLength,
          0,
          startVertex.position.z,
        );

        if (endVertex.position.x < startVertex.position.x) {
          newEndVertexPosition.setComponent(0, startVertex.position.x - currentLength);
        }

        get().updateVertexPosition(endVertex.id, newEndVertexPosition);
      }
    },
  ),
  makeVertical: (id: number) => set(
    (state: IState) => {
      const line = state.lines.find((l) => l.id === id);

      if (line) {
        const { startVertex, endVertex } = line;

        const currentLength = startVertex.position.distanceTo(endVertex.position);

        const newEndVertexPosition = new Vector3(
          startVertex.position.x,
          0,
          startVertex.position.z + currentLength,
        );

        if (endVertex.position.z < startVertex.position.z) {
          newEndVertexPosition.setComponent(2, startVertex.position.z - currentLength);
        }

        get().updateVertexPosition(endVertex.id, newEndVertexPosition);
      }
    },
  ),
  updateLineLength: (id: number, newLength: number) => set(
    (state: IState) => {
      const line = state.lines.find((l) => l.id === id);

      if (line) {
        const { startVertex, endVertex } = line;

        const currentLength = startVertex.position.distanceTo(endVertex.position);

        const lengthChange = newLength - currentLength;

        const newEndVertexPosition = new Vector3();
        newEndVertexPosition
          .subVectors(endVertex.position, startVertex.position)
          .multiplyScalar(1 + (lengthChange / newEndVertexPosition.length()))
          .add(startVertex.position);

        get().updateVertexPosition(endVertex.id, newEndVertexPosition);
      }
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
