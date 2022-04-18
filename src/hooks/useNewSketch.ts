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
export interface INewSketchStore extends IState {
  addLine: (startPoint: Vector3, endPoint: Vector3) => void;
  removeLine: (id: number) => void;
  updateLine: (
    id: number,
    newPosition: Vector3,
    isStartPoint?: boolean,
  ) => void;
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

const useSketch = create<INewSketchStore>((set: any) => ({
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
  startAddingLine: () => set({ isAddingLine: true }),
  stopAddingLine: () => set({ isAddingLine: false }),
  setCurrentLineId: (id: number) => set({ currentLineId: id }),
}));

export default useSketch;
