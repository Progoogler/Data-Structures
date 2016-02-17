/*
* The following 'graph' function implements a range of methods
* for adding vertices with weighted edges to an object-type graph.
* The supportive methods for graph implementations operate on
* the supported structure of vertices with 'id' and 'connectedTo'
* properties, where 'id' correlates to the key value of the vertex
* and 'connectedTo' is an object containing neighbor vertice properties
* and their corresponding edge weight values.
*
* Note: The product of this type of graph representation is an adjacency
* list rather than an adjacency matrix graph. The adjacency list graph
* is much preferable for large graphs and optimally suitable for 
* small graphs without the visual construct of a matrix, which for small
* graphs, may be unnecessary considering its size.
*
* Test case:
*
* var adjList = new graph.Graph();
* for (var vx = 0; vx < 7; vx++) {    
*   adjList.addVertex(vx);
* }
* adjList.addEdge(1, 3, 5);
* adjList.addEdge(4, 3, 3);
* adjList.addEdge(2, 1, 2);
* adjList.addEdge(3, 5, 8);
* adjList.addEdge(5, 1, 1);
* adjList.addEdge(2, 6, 4);
* adjList.addEdge(0, 2, 9);
* adjList.deleteVertex(3);
* adjList.getVertices();
* 
*/

var graph = (function() {

  var Vertex = function(key) {
  	this.id = key;
  	this.connectedTo = {};
  };

  Vertex.prototype.addNeighbor = function(vertex, weight) {
    this.connectedTo[vertex] = weight;
  };

  Vertex.prototype.info = function() {
  	var neighbors = "";
  	for (var v in this.connectedTo) {
      if (this.connectedTo.hasOwnProperty(v)) {
      	neighbors += v + ", ";
      }
  	}
  	return this.id + " is connected to: " + neighbors.slice(0, neighbors.length-2);
  };

  Vertex.prototype.getConnections = function() {
  	return this.connectedTo;
  };

  Vertex.prototype.getId = function() {
  	return this.id;
  };

  Vertex.prototype.getWeight = function(weight) {
  	var neighbor = [];
  	for (var v in this.connectedTo) {
  		if (this.connectedTo[v] === weight) {  
        neighbor.push(v + ": " + this.connectedTo[v]);
  		}
  	}
  	return neighbor;
  };

  var Graph = function() {
    this.vertexList = {};
    this.vertexCount = 0;
  };

  Graph.prototype.addVertex = function(key) {
    this.vertexCount += 1;
    var newVertex = new Vertex(key);
    this.vertexList[key] = newVertex;
    return newVertex;
  };

  Graph.prototype.getVertex = function(vertex) {
    for (var x in this.vertexList) {
    	// Use '=='s type manipulation for checking object property's
    	// value equality with number 'v'.
    	if (x == vertex) {
    		return this.vertexList[x];
    	} else {
    		console.log("Vertex " + vertex + " was not found.")
    		return undefined;
    	}
    }
  };

  Graph.prototype.addEdge = function(vertexOne, vertexTwo, weight) {
  	var v, v1, v2;
    
    if (!weight) {
      throw "Include a third parameter to specify weight between vertices."
    }

    for (v in this.vertexList) {
    	if (v == vertexOne) {
    		v1 = vertexOne;
    	}
    	if (v == vertexTwo) {
    		v2 = vertexTwo;
    	}
    }
    if (!v1) {
    	this.addVertex(vertexOne);
    }
    if (!v2) {
    	this.addVertex(vertexTwo);
    }
    this.vertexList[vertexOne].addNeighbor(vertexTwo, weight);
  };
  
  Graph.prototype.getVertices = function() {
  	return this.vertexList;
  };

  Graph.prototype.iterate = function(callback) {
  	for (var v in this.vertexList) {
  		callback(this.vertexList[v]);
  	}
  };

  Graph.prototype.deleteVertex = function(vertex) {
  	var deleted;
  	for (var v in this.vertexList) {
  		if (this.vertexList[v].connectedTo[vertex]) {
  		  delete(this.vertexList[v].connectedTo[vertex]);
  	  }  		
  		if (v == vertex) {
  			this.vertexCount -= 1;
  			deleted = v;
  		}
    }

    if (deleted) {
      delete(this.vertexList[deleted]);
  	  return deleted;
    } else {
      throw "Vertex " + vertex + " was not found."
    }
  };

  return {
  	Graph: Graph
  };

})();