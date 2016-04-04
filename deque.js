/*
* A Deque is another "adapter" data structure that builds                              
* on top of the basic array structure. It's known as a 
* "double-ended queue" due to its similar data addition and
* removal operations, except it is operable on both ends. 
* In this way it provides the capabilities of both a stack
* and a queue, allowing unrestrictive adding or removing
* items at either ends without the "LIFO" or "FIFO" rules.
* 
* Note: The consistency of the addition or removal patterns
* as subjected by any algorithmic requirements is up to
* each individual implementation, unlike stacks or queues
* which abide by specific patterns.
*/
"use strict";

class Deque {
  constructor() {
    this.deque = [];
    this.backup;
  }
  frontAdd(data) {
    this.deque.push(data);
  }
  frontRemove() {
    return this.deque.pop();
  }
  rearAdd(data) {
    this.deque.unshift(data);
  }
  rearRemove() {
    return this.deque.shift();
  }
  clear() {
    this.backup = this.deque;
    this.deque = [];
  }
}