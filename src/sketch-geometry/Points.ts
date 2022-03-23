import {
  GeometryList, Point2D, PointsList, GeometryListPointsExtension,
} from '../types';
import createGeometryList from './GeometryList';

/**
 * Method to get the clossest point (in the list of all points - 'this')
 * to current point ('from') if within given minimum distance
 */
function getClosestPointFrom(
  this: GeometryList<Point2D>,
  from: Point2D,
  minDistance: number,
): Point2D | null {
  let closestPoint: Point2D | null = null;

  // iterating over all the points in the geometry list
  this.eachItem((point: Point2D) => {
    const currentDistance = Math.hypot(from.x - point.x, from.y - point.y);
    if (currentDistance < minDistance) {
      // once in the range, set min distance to current distancee
      // so that the above condition is not satisified no more
      closestPoint = point;
      // eslint-disable-next-line no-param-reassign
      minDistance = currentDistance;
    }
  });

  return closestPoint;
}

export function drawPoint(
  point: Point2D,
  context: CanvasRenderingContext2D,
): void {
  context.moveTo(point.x, point.y);
  context.rect(point.x - 2, point.y - 2, 4, 4); // setting point sizes
}

function drawPoints(
  this: GeometryList<Point2D>,
  context: CanvasRenderingContext2D,
): void {
  this.eachItem((point) => drawPoint(point, context));
}

function findPoint(
  this: GeometryList<Point2D>,
  pointToFind: Point2D,
): Point2D | undefined {
  return this.items.find(
    (p: Point2D) => p.x === pointToFind.x && p.y === pointToFind.y,
  );
}

export function createPointsList(): PointsList {
  return createGeometryList<Point2D, GeometryListPointsExtension>({
    getClosest: getClosestPointFrom,
    draw: drawPoints,
    find: findPoint,
  });
}

// creates a 2D point
export const Point = (x: number, y: number): Point2D => ({ x, y });
