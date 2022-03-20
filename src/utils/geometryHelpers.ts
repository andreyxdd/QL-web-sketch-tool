import * as THREE from 'three';

export const dummy = [];

export function arrayToVector3(array: Array<number>): THREE.Vector3 | undefined {
  if (array.length === 3) {
    return new THREE.Vector3(array[0], array[1], array[2]);
  }
  throw new Error('THREE.Vector3 can only be of size 3');
}

export function arrayToVector2(array: Array<number>): THREE.Vector2 | undefined {
  if (array.length === 2) {
    return new THREE.Vector2(array[0], array[1]);
  }
  throw new Error('THREE.Vector2 can only be of size 2');
}
