class Point {
	constructor(x, y, colour) {
		this.x = x;
		this.y = y;
		this.colour = colour;
	}
}
	
class Edge {
	constructor(p1, p2) {
		this.p1 = p1;
		this.p2 = p2;
	}
}
		
class Triangle {
	constructor(p1, p2, p3) {
		this.p1 = p1;
		this.p2 = p2;
		this.p3 = p3;
	}
}	
	
class PointNode {
	constructor(p, lst){
		this.p = p;
		this.lst = lst;
	}
	addNeighbours(neighLst){
		for (let i=0; i<neighLst.length; i++){
			this.lst.push(neighLst[i]);
		}
	}
}
	
class Node{
	constructor(triangle){
		this.triangle = triangle;
		this.children = [];
	}
	addChild(node){
		this.children.push(node);
	}
}

class PointLocationStructure{
	constructor(){
		this.triangles = [];
		this.root = 0;
	}
	
	addTriangle(node){
		this.triangles.push(node);
	}
		
	addChildToNode(triangle, child){
		var index = this.triangles.indexOf(triangle);
		this.triangles[index].addChild(child); 
	}
		
	addChildToTriangle(triangle, child){
		if (this.triangles.length == 1){
			this.triangles[0].addChild(child);
		}
		else{
			for (let i=0; i<this.triangles.length; i++){
				if (this.triangles[i].triangle === triangle){
					break;
					}
			}
			this.triangles[i].addChild(child);
		}
	}
}