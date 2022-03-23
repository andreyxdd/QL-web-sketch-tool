export type Point2D = {
  x: number;
  y: number;
};

export type Line2D = {
  p1: Point2D;
  p2: Point2D;
};

/* eslint-disable no-unused-vars */
export type GeometryList<T> = {
  items: Array<T>;
  add: (item: T) => T;
  removeLast: () => void;
  eachItem: (callback: (item: T) => void) => void;
  length: () => number;
}

export type GeometryListPointsExtension = {
  getClosest: (
    this: GeometryList<Point2D>,
    from: Point2D,
    minDistance: number
  ) => Point2D | null;
  draw: (
    this: GeometryList<Point2D>,
    context: CanvasRenderingContext2D,
  ) => void;
  find: (
    this: GeometryList<Point2D>,
    pointToFind: Point2D,
  ) => Point2D | undefined
}

export type PointsList = GeometryList<Point2D> & GeometryListPointsExtension;

export type GeometryListLinesExtension = {
  getClosest: (
    this: GeometryList<Line2D>,
    from: Point2D,
    minDistance: number,
    points: PointsList,
  ) => Line2D | null;
  draw: (
    this: GeometryList<Line2D>,
  points: PointsList,
  context: CanvasRenderingContext2D,
  ) => void;
}

export type LinesList = GeometryList<Line2D> & GeometryListLinesExtension;

/* eslint-enable no-unused-vars */
