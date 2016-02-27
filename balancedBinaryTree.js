/*
* INCOMPLETE: Dysfunctional insertion and missing deletion operations!
* 
* A Balanced Binary Tree as represented by Arne Andersson.
* For a complete description, take a look at his article 
* called, Balanced Search Trees Made Simple
* @ http://user.it.uu.se/~arnea/ps/simp.pdf
* 
*/

var bbTree = (function() {

  // bbTree Globals:
  this.root;

	var last,
	    deleted,
	    bottom;

  bottom = {};
	bottom.level = 0;
	bottom.left = bottom;
	bottom.right = bottom;
	bottom.deleted = bottom;

  function newNode(key, level, left, right) {
    var node = {};
    node.left = bottom;
    node.right = bottom;
    node.key = key;    
    node.level = level || 1;
    if (!bbTree.root) { 
    	bbTree.root = node;
    }
    return node;
  }

  function skew(node) {
  	var temp = node;
  	if (node.left.level === node.level) {
  		node = node.left;
  		temp.left = node.right;
  		node.right = temp;
  	}
  }

  function split(node) {
  	var temp = node;
  	if (node.right.right.level === node.level) {
  		node = node.right;
  		temp.right = node.left;
  		node.left = temp;
  		node.level = node.level + 1;
  	}
  }

  function insert(key, node, parent, boolean) {
    node = node || this.root;

  	if (node === bottom) { console.log(parent)
  		var leafNode = bbTree.newNode(key);
      if (key > parent.key) {
        parent.right = leafNode;
      } else {
        parent.left = leafNode;
      } console.log(parent.left)
  		boolean = true; 

  	} else {

  		if (key < node.key) {
        var parent = node;
  			bbTree.insert(key, node.left, parent, boolean); 

  		} if (key > node.key) {
        var parent = node;
  			bbTree.insert(key, node.right, parent, boolean);

  		} else { 
  			boolean = false;
  			skew(node);
  			split(node);
  		}
  	}
  }

  return {
    root: this.root,
  	insert: insert,
    newNode: newNode,
  };

})();