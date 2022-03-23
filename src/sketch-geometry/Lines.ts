import {
  GeometryList,
  Point2D, PointsList,
  Line2D, GeometryListLinesExtension, LinesList,
} from '../types';
import createGeometryList from './GeometryList';

/**
 * Method to get the distance between the clossest point on a line from a point.
 * 'points' is the array of all points
 */
function getDistanceToLineFromPoint(
  line: Line2D,
  from: Point2D,
  points: PointsList,
): number | null {
  // in the array of all points, searching for two points
  // that belong to the provided line
  // TODO: do we really need to do it?
  const pointOnLine1 = points.find(line.p1);
  const pointOnLine2 = points.find(line.p2);

  if (pointOnLine1 && pointOnLine2) {
    const lx = pointOnLine1.x;
    const ly = pointOnLine2.y;

    const v1x = pointOnLine2.x - lx;
    const v1y = pointOnLine2.y - ly;

    const v2x = from.x - lx;
    const v2y = from.y - ly;

    // get unit distance from the closest point
    const u = (v2x * v1x + v2y * v1y) / (v1y * v1y + v1x * v1x);

    if (u >= 0 && u <= 1) {
      // is the point within the line
      return Math.hypot(lx + v1x * u - from.x, ly + v1y * u - from.y);
    } if (u < 0) {
      // point is before start of the line
      return Math.hypot(lx - from.x, ly - from.y);
    }

    // point is after the end of line
    return Math.hypot(
      pointOnLine2.x - from.x,
      pointOnLine2.y - from.y,
    );
  }

  return null;
}

/**
 * Method to get the clossest line (in the list of all line - 'this')
 * to current point ('from') if within given minimum distance.
 * The list of all points is needed to identify the line
 */
function getClosestLine(
  this: GeometryList<Line2D>,
  from: Point2D,
  minDistance: number,
  points: PointsList,
): Line2D | null {
  let closestLine: Line2D | null = null;

  this.eachItem((line: Line2D) => {
    const dist = getDistanceToLineFromPoint(line, from, points);
    if (dist && dist < minDistance) {
      closestLine = line;
      // eslint-disable-next-line no-param-reassign
      minDistance = dist;
    }
  });

  return closestLine;
}

export function drawLine(
  line: Line2D,
  points: PointsList,
  context: CanvasRenderingContext2D,
): void {
  // in the array of all points, searching for two points
  // that belong to the provided line
  // TODO: do we really need to do it?
  const pointOnLine1 = points.find(line.p1);
  const pointOnLine2 = points.find(line.p2);

  if (pointOnLine1 && pointOnLine2) {
    context.moveTo(pointOnLine1.x, pointOnLine1.y);
    context.lineTo(pointOnLine2.x, pointOnLine2.y);
  }
}

function drawLines(
  this: GeometryList<Line2D>,
  points: PointsList,
  context: CanvasRenderingContext2D,
): void {
  this.eachItem((line: Line2D) => drawLine(line, points, context));
}

export function createLinesList(): LinesList {
  return createGeometryList<Line2D, GeometryListLinesExtension>({
    getClosest: getClosestLine,
    draw: drawLines,
  });
}

// creates a 2D line
export const Line = (p1: Point2D, p2: Point2D): Line2D => ({ p1, p2 });
