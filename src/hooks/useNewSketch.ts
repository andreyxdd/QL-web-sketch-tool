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

const useSketch = create<INewSketchStore>((set: any, get: any) => ({
  ...initialState,
  addLine: (startPoint: Vector3, endPoint: Vector3) => set(produce(
    (state: IState) => {
      console.log(startPoint);
      console.log(endPoint);
      state.lines.push({ id: state.lines.length, startPoint, endPoint });
      get().setCurrentLineId(state.lines.length);
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
        state.lines[id].startPoint = new Vector3(x, 0, z);
      } else {
        console.log(newPosition);
        state.lines[id].endPoint = new Vector3(x, 0, z);
      }
    },
  )),
  startAddingLine: () => set({ isAddingLine: true }),
  stopAddingLine: () => set({ isAddingLine: false }),
  setCurrentLineId: (id: number) => set({ currentLineId: id }),
}));

export default useSketch;
