/* eslint-disable no-param-reassign */
import create from 'zustand';
import produce from 'immer';
import { Vector3 } from 'three';
import { useControls } from 'leva';
import shallow from 'zustand/shallow';

const R = 0.08;
interface IPoint {
  id: number,
  position: Vector3,
  matchingPoints: Array<number>
}
export interface ILine {
  id: number;
  startPointId: number;
  endPointId: number;
}

interface IState {
  points: Array<IPoint>;
  lines: Array<ILine>;
  isAddingLine: boolean;
  currentLineId: number | null;
  isDimensionsVisible: boolean;
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
  setCurrentLineId: (id: number | null) => void;
  addPointConstraint: (pointId1: number, pointId2: number) => void;
  setIsDimensionsVisible: (is: boolean) => void;
}
/* eslint-enable no-unused-vars */

const initialState: IState = {
  points: [],
  lines: [],
  isAddingLine: false,
  currentLineId: null,
  isDimensionsVisible: false,
};

const useSketch = create<ISketchStore>((set: any, get: any) => ({
  ...initialState,
  addLine: (startPointPosition: Vector3, endPointPosition: Vector3) => set(produce(
    (state: IState) => {
      const id = state.lines.length + 1;

      const startPointId = state.points.length + 1;
      state.points.push({
        id: startPointId,
        position: startPointPosition,
        matchingPoints: id === 1 ? [] : [startPointId - 1],
      });

      const endPointId = startPointId + 1;
      state.points.push({
        id: endPointId,
        position: endPointPosition,
        matchingPoints: [endPointId + 1],
      });

      state.lines.push({ id, startPointId, endPointId });
      state.currentLineId = id;
    },
  )),
  removeLine: (id: number) => set(produce(
    (state: IState) => {
      const index = state.lines.findIndex((l) => l.id === id);
      state.points.pop();
      state.points.pop();
      if (index !== -1) state.lines.splice(index, 1);
    },
  )),
  updateLine: (
    id: number,
    newPosition: Vector3,
    isStartPoint: boolean = false,
  ) => set(produce(
    (state: IState) => {
      let { x, z } = newPosition;
      const { startPointId, endPointId } = state.lines[id - 1];
      const { points } = state;

      if (Math.abs(z - points[endPointId - 1].position.z) < R) {
        z = points[endPointId - 1].position.z;
      }

      if (Math.abs(z - points[startPointId - 1].position.z) < R) {
        z = points[startPointId - 1].position.z;
      }

      if (Math.abs(x - points[endPointId - 1].position.x) < R) {
        x = points[endPointId - 1].position.x;
      }

      if (Math.abs(x - points[startPointId - 1].position.x) < R) {
        x = points[startPointId - 1].position.x;
      }

      if (isStartPoint) {
        points[startPointId - 1].position = new Vector3(x, 0, z);

        const { matchingPoints } = points[startPointId - 1];
        if (matchingPoints) {
          matchingPoints.forEach(
            (pIdx: number) => {
              if (points[pIdx - 1]) {
                points[pIdx - 1].position = new Vector3(x, 0, z);
              }
            },
          );
        }
      } else {
        points[endPointId - 1].position = new Vector3(x, 0, z);
        const { matchingPoints } = points[endPointId - 1];
        if (matchingPoints) {
          matchingPoints.forEach(
            (pIdx: number) => {
              if (points[pIdx - 1]) {
                points[pIdx - 1].position = new Vector3(x, 0, z);
              }
            },
          );
        }
      }
    },
  )),
  updateLineLength: (id: number, newLength: number) => set(
    (state: IState) => {
      const line = state.lines.find((l) => l.id === id);

      if (line) {
        const { startPointId, endPointId } = line;
        const startPointPosition = state.points[startPointId - 1].position;
        const endPointPosition = state.points[endPointId - 1].position;
        const currentLength = startPointPosition.distanceTo(endPointPosition);
        const lengthChange = newLength - currentLength;

        // adjusting position of the end point in the given direction
        const newEndPoint = new Vector3();
        newEndPoint
          .subVectors(endPointPosition, startPointPosition)
          .multiplyScalar(1 + (lengthChange / newEndPoint.length()))
          .add(startPointPosition);

        get().updateLine(id, newEndPoint);
      }
    },
  ),
  startAddingLine: () => set({ isAddingLine: true }),
  stopAddingLine: () => set({ isAddingLine: false }),
  setCurrentLineId: (id: number | null) => set({ currentLineId: id }),
  addPointConstraint: (pointId1: number, pointId2: number) => set(produce((state: IState) => {
    state.points[pointId1 - 1].matchingPoints.push(pointId1);
    state.points[pointId2 - 1].matchingPoints.push(pointId2);
  })),
  setIsDimensionsVisible: (isDimensionsVisible: boolean) => set({ isDimensionsVisible }),
}));

export default useSketch;

export const useSketchGUI = (): void => {
  const [setIsDimensionsVisible] = useSketch((state: ISketchStore) => (
    [state.setIsDimensionsVisible]), shallow);
  useControls('Sketch', {
    isDimensionsVisible: {
      value: false,
      onChange: (newValue: boolean) => {
        setIsDimensionsVisible(newValue);
      },
      label: 'Show Dimensions',
    },
  });
};
