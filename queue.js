/*
* A slightly feature extended Queue data structure that
* performs splice() operations on adding or removing elements
* not at the head or tail of the Queue. They are implemented
* as a as-necessary case basis due to its time complexity
* of O(n) compared to its basic three operations that only
* require O(1). 
* 
* Queue data structures are utilized in the form of
* FIFO (First-In, First-Out). Meaning any element in
* the queue the longest (first in queue) is removed
* first (first served) for whatever purpose. 
*
* The use-case of a Queue can be warranted when the
* earliest added elements should have priority before
* recently added elements. This is exemplified in
* Breadth First Search where the vertices which connect
* to the newly "discovered vertex" are traversed first
* in unsorted order, despite while the vertices of those 
* vertices are consequently being added to the Queue.
*/
"use strict";

class Queue {
	constructor () {
		this.queue = [];
		this.backup;
	}
	enqueue(node) {
		this.queue.push(node);
	}
	dequeue() {
		return this.queue.shift();
	}
	getFront() {
		return this.queue[0];
	}
	isEmpty() {
		return this.queue.length === 0;
	}
	cut(node, position) {
		this.queue.splice(position, 0, node);
	}
	leave(position) {
		if (typeof position === 'string') {
			return this.queue.splice(this.queue.indexOf(position), 1);
		}
		return this.queue.splice(position, 1);
	}
	clear() {
		this.backup = this.queue;
		this.queue = [];
	}
}