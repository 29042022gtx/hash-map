import Node from './Node.mjs';

class LinkedList {
  next = null;

  append(value) {
    let lastNode = this;
    while (lastNode.next != null) {
      lastNode = lastNode.next;
    }
    const node = new Node(value);
    lastNode.next = node;
  }

  prepend(value) {
    const node = new Node(value);
    node.next = this.next;
    this.next = node;
  }

  size() {
    let s = 0;
    let node = this;
    while (node.next != null) {
      node = node.next;
      s += 1;
    }
    return s;
  }

  head() {
    return this.next;
  }

  tail() {
    let lastNode = this.next;
    while (lastNode != null) {
      lastNode = lastNode.next;
    }
    return lastNode;
  }

  at(index) {
    let node = this;
    let i = 0;
    while (i < index && node.next != null) {
      node = node.next;
      i++;
    }
    return node.next;
  }

  pop() {
    let node = this.next;
    let prevNode = node;
    while (node.next != null) {
      prevNode = node;
      node = node.next;
    }
    prevNode.next = null;
  }

  contains(value) {
    let node = this;
    while (node.next != null) {
      node = node.next;
      if (node.value == value) {
        return true;
      }
    }
    return false;
  }

  find(value) {
    let i = 0;
    let node = this;
    while (node.next != null) {
      node = node.next;
      if (node.value == value) {
        return i;
      }
      i++;
    }
    return null;
  }

  toString() {
    let node = this;
    let s = '';
    while (node.next != null) {
      node = node.next;
      s += `( ${node.value} ) -> `;
    }
    s += `null`;
    return s;
  }

  insertAt(value, index) {
    let i = 0;
    let preNode = this;
    while (i < index && preNode.next != null) {
      i += 1;
      preNode = preNode.next;
    }
    const newNode = new Node(value);
    const nextNode = preNode.next;
    newNode.next = nextNode;
    preNode.next = newNode;
  }

  removeAt(index) {
    let preNode = this;
    let node = this.next;
    let i = 0;
    while (i < index && node.next != null) {
      i += 1;
      preNode = node;
      node = node.next;
    }
    const nextNode = node.next;
    preNode.next = nextNode;
  }
}

export default LinkedList;
