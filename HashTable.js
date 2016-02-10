// This Hash Table utilizes a linked list to chain key/values.
// If size of key/values are relatively small, the overhead
// space complexity of the data structure may be overlooked
// for ease of implementation and deployment.
var LinkedList = function() {
  this.head = null;
  this.tail = null;
};

LinkedList.prototype.node = function() {
  return {
    data: {
    	key: null,
    	value: null
    },
    next: null
  };
};

LinkedList.prototype.insertAsFirst = function(key, value) {
  var node = this.node();
  node.next = this.head;
  this.head = node;
  node.data.key = key;
  node.data.value = value;
};

LinkedList.prototype.delete = function(key, value) {
  var current = this.head;
  var prev;

  if (value === undefined) {
	  while (current !== null) {
	    if (current.data.key === key) {
		      if (current === this.head) {
		        this.head = current.next;
		        return current;
		      }
	      if (current === this.tail) {
	        this.tail = prev;
	        prev.next = null;
	      }
	      prev.next = current.next;
	      return current;
	    }
	    prev = current;
	    current = current.next;
	  }
	} else {
		while (current !== null) {
	    if (current.data.key === key && current.data.value === value) {
	      if (current === this.head) {
	        this.head = current.next; console.log(current.next)
	        return current;
	      }
	      if (current === this.tail) {
	        this.tail = prev;
	        prev.next = null;
	      }
	      prev.next = current.next; 
	      return current;
	    }
	    prev = current;
	    current = current.next;
	  }
	}
};

LinkedList.prototype.search = function(key, value) {
	var result;
	var current = this.head;
	while (current !== null) {
		if (current.data.key === key) {
			result = current;
			if (value === undefined) {
				return result;
			} else {
				if (current.data.key === key && current.data.value === value) {
					return current.data;
				}
			}
		}
		current = current.next;
	}
	console.log("Key was not found.")
}

var HashTable = function(tableSize) {
	// 'tableSize' instantiates the length of the array where
	// linked lists are inserted at each index for key/value insertion.
	this.tableSize = tableSize;
	// 'tableSize' will be used to mod the ascii sum of each key for
	// random placement of key/value object in the hash table.
	this.table = [];
	for (var i = 0; i < tableSize; i++) {
		this.table[i] = new LinkedList();
	}
};

HashTable.prototype.insert = function(key, value) {

	if (typeof key === 'number') {
		key = key + '';
	}

	if (typeof key !== 'string') {
		throw "Key input is required to be a string."
	}

	// Repeated transfiguration of 'key' input's ascii value and
	// its equivalent total sum for hash indexing.
	var keyCode = 0;
	for (var i = 0; i < key.length; i++) {
		keyCode += key.charCodeAt(i);
	}
	// Mod the 'keyCode' by the 'tableSize' to keep index values within
	// the range of length of n.
	this.table[keyCode % this.tableSize].insertAsFirst(key, value);
};

HashTable.prototype.find = function(key, value) {

	if (typeof key === 'number') {
		key = key + '';
	}

	if (typeof key !== 'string') {
		throw "Input 'key' needs to be a string."
	}

	var result;
	var keyCode = 0;
	for (var i = 0; i < key.length; i++) {
		keyCode += key.charCodeAt(i);
	}

	result = this.table[keyCode % this.tableSize].search(key, value);

	if (typeof result === 'object') {
		return result;
	} else {
		throw "Key was not found."
	}

};

HashTable.prototype.delete = function(key, value) {

	if (typeof key === 'number') {
		key = key + '';
	}

	if (typeof key !== 'string') {
		throw "Input 'key' needs to be a string."
	}

	var result;
	var keyCode = 0;
	for (var i = 0; i < key.length; i++) {
		keyCode += key.charCodeAt(i);
	}

	result = this.table[keyCode % this.tableSize].search(key, value);

	if (typeof result === 'object') {
		this.table[keyCode % this.tableSize].delete(key, value);
		return result;
	} else {
		throw "Key was not found.";
	}

}

// Disclaimer: Hash Tables have the reputation of being blazingly fast
// with all three operations running in O(1) time. This being my first
// implementation of a hash table, I can not promise such extraordinary performance.
var table = new HashTable(20);
table;
table.insert('Andy', "I'm the real Andy.");
table.insert('Andy', "No, I'm the real Andy!");
table.insert('Andy', "They are the clones of me.");
table.find('Andy');
table.find('Andy', "They are the clones of me.");
table.delete('Andy', "No, I'm the real Andy!");
table.delete('Andy', "I'm the real Andy.");
