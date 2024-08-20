import LinkedList from './LinkedList.mjs';

class HashMap {
  // const
  #map = [new LinkedList()];
  #loadFactor = 0.75;

  constructor() {
    for (let i = 0; i < 16; i++) {
      this.#map.push(new LinkedList());
    }
  }

  entries() {
    let arr = [];
    this.#map.forEach((list) => {
      let node = list.next;
      while (node != null) {
        const tempArr = [];
        tempArr.push(node.value.key);
        tempArr.push(node.value.value);
        arr.push(tempArr);
        node = node.next;
      }
    });
    return arr;
  }

  values() {
    let valArr = [];
    this.#map.forEach((list) => {
      let node = list.next;
      while (node != null) {
        valArr.push(node.value.value);
        node = node.next;
      }
    });
    return valArr;
  }

  keys() {
    let keyArr = [];
    this.#map.forEach((list) => {
      let node = list.next;
      while (node != null) {
        keyArr.push(node.value.key);
        node = node.next;
      }
    });
    return keyArr;
  }

  clear() {
    for (let i = 0; i < this.#map.length; i++) {
      this.#map[i] = new LinkedList();
    }
  }

  length() {
    return this.#map.reduce((total, list) => {
      return total + list.size();
    }, 0);
  }

  remove(key) {
    const list = this.#getList(key);
    const nodeIdx = this.#findNode(list, key);
    if (nodeIdx != null) {
      list.removeAt(nodeIdx);
      return true;
    }
    return false;
  }

  has(key) {
    const list = this.#getList(key);
    const nodeIdx = this.#findNode(list, key);
    if (nodeIdx != null) {
      return true;
    }
    return false;
  }

  get(key) {
    const list = this.#getList(key);
    const nodeIdx = this.#findNode(list, key);
    if (nodeIdx != null) {
      return list.at(nodeIdx).value.value;
    }
    return null;
  }

  growBuckets() {
    const size = this.#map.length * 2;
    const newMap = [];
    for (let i = 0; i < size; i++) {
      newMap.push(new LinkedList());
    }

    const entries = this.entries();
    entries.forEach((pair) => {
      const list = newMap[HashMap.getKeyIndex(pair[0], size)];
      const obj = { key: pair[0], value: pair[1] };
      list.append(obj);
    });
    this.#map = newMap;
  }

  static getKeyIndex(key, size) {
    return HashMap.hash(key) % size;
  }

  set(key, value) {
    const limit = Math.floor(this.#map.length * this.#loadFactor);
    if (this.length() >= limit) {
      this.growBuckets();
      return;
    }
    const list = this.#getList(key);
    const obj = { key, value };
    const nodeIdx = this.#findNode(list, key);
    if (nodeIdx == null) {
      list.insertAt(obj, nodeIdx);
      return;
    }
    list.at(nodeIdx).value = obj;
  }

  #findNode(list, key) {
    let idx = 0;
    let node = list.next;
    while (node != null) {
      if (node.value.key === key) {
        return idx;
      }
      idx += 1;
      node = node.next;
    }
    return null;
  }

  #getList(key) {
    const capacity = this.#map.length;
    const idx = HashMap.hash(key) % capacity;
    return this.#map[idx];
  }

  getMap() {
    return this.#map;
  }

  toString() {
    let s = '';
    let node;
    for (let i = 0; i < this.#map.length; i++) {
      node = this.#map[i].next;
      while (node != null) {
        s += `${node.value.key}: ${node.value.value} -> `;
        node = node.next;
      }
      s += `null\n`;
    }
    return s.slice(0, -1);
  }

  static hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode;
  }
}

// console.clear();
// const hm = new HashMap();
// hm.set('a', '1');
// hm.set('A', '1');
// hm.set('b', '2');
// console.log();
// // hm.clear()
// console.log(hm.toString());
// console.log(hm.entries());

export default HashMap;
