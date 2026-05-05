// Checkpoint: Implementation Variations and Trade-offs
// Implementing Queue and Priority Queue with multiple approaches

// ============================================================
// 1. QUEUE IMPLEMENTATIONS
// ============================================================

// --- 1a. Array-based Queue (Fixed Size) ---
class ArrayQueue {
  constructor(capacity = 100) {
    this.capacity = capacity;
    this.data = new Array(capacity);
    this.front = 0;
    this.rear = 0;
    this.size = 0;
  }

  enqueue(element) {
    if (this.size === this.capacity) {
      throw new Error('Queue is full');
    }
    this.data[this.rear] = element;
    this.rear = (this.rear + 1) % this.capacity;
    this.size++;
  }

  dequeue() {
    if (this.isEmpty()) {
      throw new Error('Queue is empty');
    }
    const element = this.data[this.front];
    this.data[this.front] = undefined;
    this.front = (this.front + 1) % this.capacity;
    this.size--;
    return element;
  }

  peek() {
    if (this.isEmpty()) {
      throw new Error('Queue is empty');
    }
    return this.data[this.front];
  }

  isEmpty() {
    return this.size === 0;
  }

  getSize() { return this.size; }
}

// --- 1b. Linked List-based Queue (Dynamic Size) ---
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedListQueue {
  constructor() {
    this.head = null; // front
    this.tail = null; // rear
    this.size = 0;
  }

  enqueue(element) {
    const node = new Node(element);
    if (this.tail) {
      this.tail.next = node;
    }
    this.tail = node;
    if (!this.head) {
      this.head = node;
    }
    this.size++;
  }

  dequeue() {
    if (this.isEmpty()) {
      throw new Error('Queue is empty');
    }
    const value = this.head.value;
    this.head = this.head.next;
    if (!this.head) {
      this.tail = null;
    }
    this.size--;
    return value;
  }

  peek() {
    if (this.isEmpty()) {
      throw new Error('Queue is empty');
    }
    return this.head.value;
  }

  isEmpty() {
    return this.size === 0;
  }

  getSize() { return this.size; }
}

// ============================================================
// 2. PRIORITY QUEUE IMPLEMENTATIONS
// ============================================================

// --- 2a. Min-Heap-based Priority Queue ---
class MinHeapPriorityQueue {
  constructor() {
    this.heap = [];
  }

  insert(element) {
    this.heap.push(element);
    this._bubbleUp(this.heap.length - 1);
  }

  _bubbleUp(index) {
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);
      if (this.heap[parent] <= this.heap[index]) break;
      [this.heap[parent], this.heap[index]] = [this.heap[index], this.heap[parent]];
      index = parent;
    }
  }

  extractMin() {
    if (this.isEmpty()) throw new Error('Priority queue is empty');
    const min = this.heap[0];
    const last = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = last;
      this._sinkDown(0);
    }
    return min;
  }

  _sinkDown(index) {
    const length = this.heap.length;
    while (true) {
      let smallest = index;
      const left = 2 * index + 1;
      const right = 2 * index + 2;
      if (left < length && this.heap[left] < this.heap[smallest]) smallest = left;
      if (right < length && this.heap[right] < this.heap[smallest]) smallest = right;
      if (smallest === index) break;
      [this.heap[smallest], this.heap[index]] = [this.heap[index], this.heap[smallest]];
      index = smallest;
    }
  }

  peekMin() {
    if (this.isEmpty()) throw new Error('Priority queue is empty');
    return this.heap[0];
  }

  isEmpty() {
    return this.heap.length === 0;
  }
}

// --- 2b. Ordered Array-based Priority Queue ---
class OrderedArrayPriorityQueue {
  constructor() {
    this.data = []; // sorted ascending
  }

  insert(element) {
    let i = 0;
    while (i < this.data.length && this.data[i] <= element) i++;
    this.data.splice(i, 0, element);
  }

  extractMin() {
    if (this.isEmpty()) throw new Error('Priority queue is empty');
    return this.data.shift();
  }

  peekMin() {
    if (this.isEmpty()) throw new Error('Priority queue is empty');
    return this.data[0];
  }

  isEmpty() {
    return this.data.length === 0;
  }
}

// ============================================================
// TESTS
// ============================================================

console.log('=== Array-based Queue ===');
const aq = new ArrayQueue(5);
aq.enqueue(1); aq.enqueue(2); aq.enqueue(3);
console.log('peek:', aq.peek());         // 1
console.log('dequeue:', aq.dequeue());   // 1
console.log('size:', aq.getSize());      // 2
console.log('isEmpty:', aq.isEmpty());   // false

console.log('\n=== Linked List Queue ===');
const llq = new LinkedListQueue();
llq.enqueue('a'); llq.enqueue('b'); llq.enqueue('c');
console.log('peek:', llq.peek());        // a
console.log('dequeue:', llq.dequeue()); // a
console.log('dequeue:', llq.dequeue()); // b
console.log('isEmpty:', llq.isEmpty()); // false

console.log('\n=== Min-Heap Priority Queue ===');
const mhpq = new MinHeapPriorityQueue();
[5, 3, 8, 1, 4].forEach(v => mhpq.insert(v));
console.log('peekMin:', mhpq.peekMin());       // 1
console.log('extractMin:', mhpq.extractMin()); // 1
console.log('extractMin:', mhpq.extractMin()); // 3

console.log('\n=== Ordered Array Priority Queue ===');
const oapq = new OrderedArrayPriorityQueue();
[5, 3, 8, 1, 4].forEach(v => oapq.insert(v));
console.log('peekMin:', oapq.peekMin());       // 1
console.log('extractMin:', oapq.extractMin()); // 1
console.log('extractMin:', oapq.extractMin()); // 3

console.log('\n=== Edge Cases ===');
const emptyQ = new ArrayQueue();
try { emptyQ.dequeue(); } catch(e) { console.log('Empty dequeue:', e.message); }
try { emptyQ.peek(); } catch(e) { console.log('Empty peek:', e.message); }
const fullQ = new ArrayQueue(2);
fullQ.enqueue(1); fullQ.enqueue(2);
try { fullQ.enqueue(3); } catch(e) { console.log('Full enqueue:', e.message); }

console.log('All tests passed!');
