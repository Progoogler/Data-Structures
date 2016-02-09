// Note: The significant difference between this and a
// BALANCED Binary Search Tree is their worst-case running-times.
// Most operations on an unbalanced BST is upper bounded by
// its 'height', meaning in the worst-case, it is O(height).  
var BinarySearchTree = function(key) {
	// The root reference to its children with
	// greater or lesser 'key' values.
	this.root = {
		key: key || null,
		parent: null,
		left: null,
		right: null
	};
};

BinarySearchTree.prototype.inOrderTreeWalk = function(root) {
	// Console logs 'key' values in ascending order.
	if (root !== null) {
		this.inOrderTreeWalk(root.left);
		console.log(root.key);
		this.inOrderTreeWalk(root.right);
	}
};

BinarySearchTree.prototype.treeInsert = function(tree, node) {
	// Note: 'node' takes an object as an argument with a 'key' property
	// value and left and right properties with value NULL.
	var prevNode = null;
	var nextNode = tree.root;
	while (nextNode !== null) {
		prevNode = nextNode;
		// Keep track of the previous node because when
		// 'nextNode' = NULL eventually, its 'prevNode'
		// can be accessed for further configuration.
		if (node.key < nextNode.key) {
			// Find the right location for the given 'node's key
			// that keeps the BST property in effect.
			nextNode = nextNode.left;
		} else {
			nextNode = nextNode.right;
		}
	}
	node.parent = prevNode;
	if (prevNode === null) {
		tree.root = node;
	} else if (node.key < prevNode.key) {
		prevNode.left = node;
	} else {
		prevNode.right = node;
	}
}

BinarySearchTree.prototype.minimum = function(root) {
	// Traverse down left subtrees iteratively until NULL. 
	while (root !== null) {
		if (root.left === null) {
			return root;
		} else {
			root = root.left;
		}
	}
};

BinarySearchTree.prototype.maximum = function(root) {
	// Traverse down right subtrees iteratively until NULL.
	while (root !== null) {
		if (root.right === null) {
			return root;
		} else {
			root = root.right;
		}
	}
};

BinarySearchTree.prototype.treeSearch = function(root, key) {
	// Recursively search for a 'key' value starting from the 'root',
	// searching in left child for a comparison value if the 'key'
	// value is less than the current node's key and vice versa.
	if (root === null || root.key === key) {
		return root;
	} else if (root.key > key) {
		return this.treeSearch(root.left, key);
	} else {
		return this.treeSearch(root.right, key);
	}
};

BinarySearchTree.prototype.predecessor = function(key) {
	var node = this.treeSearch(this.root, key);
	// Find the node with the specified 'key' value in given parameter.
	if (node.left !== null) {
		// The easy case for computing the predecessor of root key
		// with a left child, retrieving its 'maximum' key value.
		return this.maximum(node.left);
	} else {
		var parent = node.parent;
		while (parent !== null && node === parent.left) {
			// Iteratively find the node's parents while
			// its left child is the node.
			node = parent;
			parent = parent.parent;
		}
		return parent;
	}
};

BinarySearchTree.prototype.successor = function(key) {
	// Same as above method with flipped pointers.
	var node = this.treeSearch(this.root, key);
	if (node.right !== null) {
		return this.minimum(node.right);
	} else {
		var parent = node.parent;
		while (parent !== null && node === parent.right) {
			node = parent;
			parent = parent.parent;
		}
		return parent;
	}
};

BinarySearchTree.prototype.transplant = function(tree, outNode, inNode) {
	// A method for swapping an 'outNode' with an 'inNode' while
	// keeping original left, right, and parent pointers of 'outNode'.
	if (outNode.parent === null) {
		tree.root = inNode;
		inNode.left = tree.root.left;
		inNode.right = tree.root.right;
	} else if (outNode === outNode.parent.left) {
		outNode.parent.left = inNode;
		inNode.parent = outNode.parent;
		inNode.left = outNode.left;
		inNode.right = outNode.right;
	} else {
		outNode.parent.right = inNode;
		if (inNode !== null) {
			inNode.parent = outNode.parent;
			inNode.left = outNode.left;
			inNode.right = outNode.right;
		}
	}
};

BinarySearchTree.prototype.delete = function(key) {
	// A method for deleting nodes with a specific 'key' value.
	var node = this.treeSearch(this.root, key);
	if (node.left === null && node.right === null) {
		(node.parent.left === node) ? node.parent.left = null : node.parent.right = null; 
	} else if (node.left === null || node.right === null) {
		if (node.left === null) {
			node.right.parent = node.parent;
			if (node === node.parent.left) {
				node.parent.left = node.right;
			} else {
				node.parent.right = node.right;
			}
		} else {
			node.left.parent = node.parent;
			if (node === node.parent.left) {
				node.parent.left = node.left;
			} else {
				node.parent.right = node.left;
			}
		}
	} else {
		// The "hard" case of deletion when a node has both
		// left and right children.
		var successor = this.successor(key);
		// The 'successor' key of the node to be deleted is
		// the formulaic swap for keeping the BST property.
		if (successor.parent.right === successor) {
			this.transplant(this, node, successor);
			successor.parent = node.parent;
		} else {
			this.transplant(this, successor, successor.right);
			this.transplant(this, node, successor);
			successor.parent = node.parent;
		}
	}
};


var bst = new BinarySearchTree(9);
bst.treeInsert(bst, {key: 8, left: null, right: null});
bst.treeInsert(bst, {key: 10, left: null, right: null});
bst.treeInsert(bst, {key: 14, left: null, right: null});
bst.treeInsert(bst, {key: 12, left: null, right: null});
bst.treeInsert(bst, {key: 6, left: null, right: null});
bst.treeInsert(bst, {key: 16, left: null, right: null});
bst.treeInsert(bst, {key: 4, left: null, right: null});
bst.treeInsert(bst, {key: 2, left: null, right: null});
bst.treeInsert(bst, {key: 5, left: null, right: null});
bst.treeInsert(bst, {key: 11, left: null, right: null});
bst.delete(6);
bst.inOrderTreeWalk(bst.root);
console.log(bst.minimum(bst.root))
console.log(bst.maximum(bst.root))
bst.treeSearch(bst.root, 6);