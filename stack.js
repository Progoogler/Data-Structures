"use strict";

class Stack {
  constructor(capacity) {
    this.stack = [];
    this.capacity = capacity;
    this.top = -1;
  }
  peek() {
    return this.top + 1 + " items in stack. Top item: " + this.stack[this.top];
  }
  push(data) {
    if (this.top < this.capacity - 1) {
      this.stack.push(data);
      this.top += 1;
    } else {
      throw Error("Stack overflow!");
    }
  }
  pop() {
    if (this.top > -1) {
      this.top -= 1;
      return this.stack.pop();
    } else {
      throw Error("Stack underflow!");
    }
  }
  isEmpty() {
    return this.top < 0;
  }
}