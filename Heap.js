var Heap = function() {
	this.heap = [];
};

Heap.prototype.swap = function(heap, firstIndex, secondIndex) {
	var temp = this.heap[firstIndex];
	this.heap[firstIndex] = this.heap[secondIndex];
	this.heap[secondIndex] = temp; 
};
 
Heap.prototype.insert = function(obj) {
// Insert an 'obj' with a "key" value maintaining the heap property that
// every parent node of all its chidren, contains a lower key value than its childrens'
// key values and each parent has only 0, 1 or 2 children nodes.
	obj['key'] = key;
	this.heap.push(obj);
	// Push the 'obj' to the bottom-most leaf node in tree/array.
	var length = this.heap.length;
	// Cache the length property of 'this.heap'.
	if (length < 2) {
	// When 'this.heap' only contains a root element and no children
	// for comparison, return.
		return;
	}

	while (this.heap[Math.floor((this.heap.indexOf(obj) + 1) / 2) - 1].key > this.heap[this.heap.indexOf(obj)].key) {
	// The parent of 'obj' is calculated along the array at position index of 'obj' divided by 2 or: i/2.
	// If index of 'obj' is an odd number, it's parent is located at Math.floor(i/2).
	// ** Floor the division of index of 'obj' regardless of whether it is even or odd  **

		this.swap(this.heap, this.heap.indexOf(obj), Math.floor((this.heap.indexOf(obj) + 1) / 2) - 1);
		// Swap the 'obj' at current index with its parent index with a greater key value.

		if (this.heap.indexOf(obj) < 3) {
		// When 'obj' is at an index position below 3, only check its key value with root object's key.
			if (this.heap[0].key > this.heap[this.heap.indexOf(obj)].key) {
				this.swap(this.heap, 0, this.heap.indexOf(obj));
				// If 'obj' has been swapped to the root index, return.
				return
			}
		}

		if (this.heap.indexOf(obj) === 0) {
		// If 'obj' has been swapped to the root index, return.
			return;
		}
	}

};

// Both base operations of a heap perform in O(log n) running time due
// to either halving the comparison elements at each recurrence of insertion
// or halving the remaining comparison elements for key placement.

Heap.prototype.extractMin = function() {
// Retrieve the object with the lowest key value in the heap.
	var result = this.heap.shift();
	// Store the root element with the lowest key value in result.
	var newRoot = this.heap.pop();
	this.heap.unshift(newRoot);
	// Shift the last leaf of the tree to the root node and 
	// 'bubble-down' the object according to the heap property.

	if (this.heap[1].key < this.heap[2].key) {
	// First check whether the left or right child's keys of the root node
	// are lower, then swap the root node with the node with the lower key value.
		this.swap(this.heap, 1, 0);
	} else {
		this.swap(this.heap, 2, 0);
	}

	while (newRoot.key > this.heap[2 * this.heap.indexOf(newRoot) + 1].key || newRoot.key > this.heap[2 * this.heap.indexOf(newRoot) + 2].key) {
		// Continually check whether either left or right childnodes' key values are lower than the 'newRoot's key value.
		if (this.heap[2 * this.heap.indexOf(newRoot) + 1].key < this.heap[2 * this.heap.indexOf(newRoot) + 2].key) {
			this.swap(this.heap, this.heap.indexOf(newRoot), this.heap.indexOf(this.heap[2 * this.heap.indexOf(newRoot) + 1]));
			// Swap the parent node with the left childNode if the left childNode's key is lower than the right childNode's.
		} else {
			this.swap(this.heap, this.heap.indexOf(newRoot), this.heap.indexOf(this.heap[2 * this.heap.indexOf(newRoot) + 2]));
			// Else swap the right childNode with the parent node.
		}

		if (this.heap[2 * this.heap.indexOf(newRoot) + 1] === undefined) {
			// If the 'newRoot' reaches the leaves level of the tree, 
			// discontinue comparisons and return the result.
			return result;
		}
	}
	return result;
	// Return the object with the lowest key value.
}

Heap.prototype.minHeapify = function(index) {
// Restore Minimum Heap property where it's reportedly unbalanced at specified 'index'.
	var min,
		left,
		right,
		parent;

	if ((index === 1 || index === 2)) {
		// Set 'parent' to 0 for above cases because the equation sets 'parent' to -1 overwise.
		parent = 0;
	} else {
		parent = (Math.floor((index + 1) / 2) - 1);
		// The parent node above the current index node.
	}
	if (this.heap[index].key > this.heap[parent].key) { 
		// Return control to function if the parent's key value is lower than the childNode's.
		return;
	} else if (this.heap[index].key < this.heap[parent].key) {
		this.swap(this.heap, index, parent);
		// Swap childNode with parent node if min-heap property is unbalanced.
		if (parent === 0) {
			return;
		} else {
			// Continue comparing key values of parent and childNodes until min-heap property is balanced.
			this.minHeapify(parent);
		}
	} 

	if ((2 * index) + 1 < this.heap.length) {
		// For cases when node at 'index' definitely has at least one childNode.
		left = (2 * index) + 1;
		right = (2 * index) + 2;

		if (this.heap[index].key > this.heap[left] || this.heap[index].key > this.heap[right]) {
			if (left <= this.heap.length && this.heap[left].key < this.heap[index].key) {
				min = left;
			} else {
				min = index;
			}
			if (right <= this.heap.length && this.heap[right].key < this.heap[min].key) {
				min = right;
			}
			if (min !== index) {
				// Swap indices of index and childNode when the min-heap property is unbalanced.
				this.swap(this.heap, min, index);
				this.minHeapify(min);
			}
		}
	}
};
