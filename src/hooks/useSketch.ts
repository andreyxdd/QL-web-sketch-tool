/* eslint-disable no-param-reassign */
import create from 'zustand';
import produce from 'immer';
import { Vector3 } from 'three';

interface ILine {
  id: number;
  startPoint: Vector3,
  endPoint: Vector3
}

interface IState {
  lines: Array<ILine>;
  isAddingLine: boolean;
  currentLineId: number | null;
}

/* eslint-disable no-unused-vars */
export interface ISketchStore extends IState {
  addLine: (startPoint: Vector3, endPoint: Vector3) => void;
  removeLine: (id: number) => void;
  updateLine: (
    id: number,
    newPosition: Vector3,
    isStartPoint?: boolean,
  ) => void;
  updateLineLength: (id: number, newLength: number) => void;
  startAddingLine: () => void;
  stopAddingLine: () => void;
  setCurrentLineId: (id: number) => void;
}
/* eslint-enable no-unused-vars */

const initialState: IState = {
  lines: [],
  isAddingLine: false,
  currentLineId: null,
};

const useSketch = create<ISketchStore>((set: any, get: any) => ({
  ...initialState,
  addLine: (startPoint: Vector3, endPoint: Vector3) => set(produce(
    (state: IState) => {
      const id = state.lines.length + 1;
      state.lines.push({ id, startPoint, endPoint });
      state.currentLineId = id;
    },
  )),
  removeLine: (id: number) => set(produce(
    (state: IState) => {
      const index = state.lines.findIndex((l) => l.id === id);
      if (index !== -1) state.lines.splice(index, 1);
    },
  )),
  updateLine: (
    id: number,
    newPosition: Vector3,
    isStartPoint: boolean = false,
  ) => set(produce(
    (state: IState) => {
      const { x, z } = newPosition;
      if (isStartPoint) {
        state.lines[id - 1].startPoint = new Vector3(x, 0, z);
      } else {
        state.lines[id - 1].endPoint = new Vector3(x, 0, z);
      }
    },
  )),
  updateLineLength: (id: number, newLength: number) => set(
    (state: IState) => {
      const line = state.lines.find((l) => l.id === id);

      if (line) {
        const { startPoint, endPoint } = line;
        const currentLength = startPoint.distanceTo(endPoint);
        const lengthChange = newLength - currentLength;

        // adjusting position of the end point in the given direction
        const newEndPoint = new Vector3();
        newEndPoint
          .subVectors(endPoint, startPoint)
          .multiplyScalar(1 + (lengthChange / newEndPoint.length()))
          .add(startPoint);

        get().updateLine(id, newEndPoint);
      }
    },
  ),
  startAddingLine: () => set({ isAddingLine: true }),
  stopAddingLine: () => set({ isAddingLine: false }),
  setCurrentLineId: (id: number) => set({ currentLineId: id }),
}));

export default useSketch;
