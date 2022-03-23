import { GeometryList } from '../types';

/**
 * GeometryList is a base for sets of other geometries (i.e., points and lines).
 * This object also allows to add and item to the array or apply a particaulr
 * method (callback) to each item in the array
 *
 * Below method initializes the instance of GeometryList with
 * possible extension.
 */
function createGeometryList<T1, T2>(extend = {} as T2): GeometryList<T1> & T2 {
  return {
    ...extend,
    items: [] as Array<T1>,
    add(item: T1) {
      this.items.push(item);
      return item;
    },
    removeLast() {
      const poppedItem = this.items.pop();
      return poppedItem;
    },
    // eslint-disable-next-line no-unused-vars
    eachItem(callback: (item: T1) => void) {
      this.items.forEach((item: T1) => { callback(item); });
    },
    length(): number {
      return this.items.length;
    },
  };
}

export default createGeometryList;
