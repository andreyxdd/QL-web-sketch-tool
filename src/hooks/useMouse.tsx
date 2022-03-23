/**
 * useMouse hook is based on the useRef React hook and
 * the following events:
 * - mousedown
 * - mouseup
 * - mousemove
 *
 * This allows to control dragging of the canvas elements
 */

import React from 'react';
import { Point2D } from '../types';

interface IUseMouse{
  position: Point2D;
  isLeftBtnClicked: boolean;
  isDragged: boolean;
  isDragStarted: boolean;
  isDragEnded: boolean;
  dragStartPosition: Point2D;
}

const initialSettings: IUseMouse = {
  position: { x: 0, y: 0 },
  isLeftBtnClicked: false,
  isDragged: false,
  isDragStarted: false,
  isDragEnded: false,
  dragStartPosition: { x: 0, y: 0 },
};

const useMouse = (settings = initialSettings): IUseMouse => {
  const mouseRef = React.useRef(settings);

  function mouseEvents(eInit: MouseEventInit): void {
    const e = eInit as MouseEvent;
    const mouse = mouseRef.current;

    // getting mouse coordinates on the page
    mouse.position.x = e.pageX;
    mouse.position.y = e.pageY;

    // catching right click
    const isRightBtnClicked = e.button === 2;

    // saving status of the left click
    const leftBtnStatus = mouse.isLeftBtnClicked;

    // not the right button is clicked
    if (!isRightBtnClicked) {
      if (e.type === 'mousedown') {
        mouse.isLeftBtnClicked = true;
      } else if (e.type === 'mouseup') {
        mouse.isLeftBtnClicked = false;
      }
    }

    // comparing previous status of the left button
    // with the current status
    if (leftBtnStatus !== mouse.isLeftBtnClicked) {
      if (mouse.isLeftBtnClicked) {
        // left button is hold after the click
        mouse.isDragStarted = true; // the drag is started
        mouse.isDragged = true; // the drag now is on

        // assigning the start position of the drag
        mouse.dragStartPosition.x = mouse.position.x;
        mouse.dragStartPosition.y = mouse.position.y;
      } else {
        // left button is realeased after the click and/or hold
        mouse.isDragged = false;
        mouse.isDragEnded = true;
      }
    }
  }

  // adding/removing event listeners to mousedown,
  // mouseup, and mousemove events
  React.useEffect(() => {
    ['down', 'up', 'move'].forEach(
      (name: string) => document.addEventListener(`mouse${name}`, mouseEvents),
    );

    return () => (
      ['down', 'up', 'move'].forEach(
        (name: string) => document.removeEventListener(`mouse${name}`, mouseEvents),
      )
    );
  }, []);

  return mouseRef.current;
};

export default useMouse;
