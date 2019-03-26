
	function delaunayTriangulator(){
		relevantPoints = [];
		let superTriangle = new Triangle(extendedPoints[extendedPoints.length-3], extendedPoints[extendedPoints.length-2], extendedPoints[extendedPoints.length-1]);
		relevantTriangles.push(superTriangle);
		for (let i=0; i<points.length; i++){
			console.log(i);
			let triangle = findContainingTriangle(points[i]);
			console.log(points[i]);
			console.log(triangle);
			let edge = checkPointOnLine(triangle, points[i]);
			console.log(edge);
			if (edge !== false){
				edge = new Edge(edge[0], edge[1]);
				let thirdPoint = findThirdPointTriangle(triangle, edge.p1, edge.p2);
				let adjacentTriangle = findAdjacentTriangle(edge, thirdPoint);
				let oppositePoint = findOppositeNode(edge, adjacentTriangle);
				relevantTriangles.splice(relevantTriangles.indexOf(triangle), 1);
				relevantTriangles.splice(relevantTriangles.indexOf(adjacentTriangle), 1);
				let t1 = new Triangle(points[i], edge.p1, thirdPoint);
				let t2 = new Triangle(points[i], edge.p2, thirdPoint);
				let t3 = new Triangle(points[i], edge.p1, oppositePoint);
				let t4 = new Triangle(points[i], edge.p2, oppositePoint);
				
				relevantTriangles.push(t1);
				relevantTriangles.push(t2);
				relevantTriangles.push(t3);
				relevantTriangles.push(t4);
				
				legalizeEdge(t1, new Edge(edge.p1, thirdPoint), points[i]);
				legalizeEdge(t2, new Edge(edge.p2, thirdPoint), points[i]);
				legalizeEdge(t3, new Edge(edge.p1, oppositePoint), points[i]);
				legalizeEdge(t4, new Edge(edge.p2, oppositePoint), points[i]);
				
			} else {
				let a = triangle.p1;
				let b = triangle.p2;
				let c = triangle.p3;
				
				relevantTriangles.splice(relevantTriangles.indexOf(triangle), 1);
				
				let first = new Triangle(a, b, points[i]);
				let second = new Triangle(a, c, points[i]);
				let third = new Triangle(b, c, points[i]);
				
				relevantTriangles.push(first);
				relevantTriangles.push(second);
				relevantTriangles.push(third);
				
				legalizeEdge(first, new Edge(a, b), points[i]);
				legalizeEdge(second, new Edge(a, c), points[i]);
				legalizeEdge(third, new Edge(b, c), points[i]);
			}
			//drawAllTriangles();
		}
		removeAllPP(superTriangle.p1, superTriangle.p2, superTriangle.p3);
	}
	
	
	function legalizeEdge(triangle, edge, newPoint){
		let neighbourTriangle = findAdjacentTriangle(edge, newPoint);
		if (neighbourTriangle !== false){
			let oppositeNode = findOppositeNode(edge, neighbourTriangle);
			if (!checkLegalEdge(newPoint, triangle, oppositeNode, edge)){
				relevantTriangles.splice(relevantTriangles.indexOf(triangle), 1);
				relevantTriangles.splice(relevantTriangles.indexOf(neighbourTriangle), 1);
				let firstTriangle = new Triangle(oppositeNode, edge.p1, newPoint);
				let secondTriangle = new Triangle(oppositeNode, edge.p2, newPoint);
				relevantTriangles.push(firstTriangle);
				relevantTriangles.push(secondTriangle);
				legalizeEdge(firstTriangle, new Edge(oppositeNode, edge.p1), newPoint);
				legalizeEdge(secondTriangle, new Edge(oppositeNode, edge.p2), newPoint);
			}
		}
	}
	
	function checkLegalEdge(pr, triangle, oppositeNode, edge){
		let center = checkDelaunayTriangle(triangle.p1, triangle.p2, triangle.p3);
		let ray = calculateDistance(center, edge.p1);
		let distance = calculateDistance(center, oppositeNode);
		if (distance > ray){
			return true;
		}
		return false;
	}
	
	function removeAllPP(p1, p2, p3){
		let lst = [];
		for (let i=0; i<relevantTriangles.length; i++){
			if (relevantTriangles[i].p1 === p1 || relevantTriangles[i].p2 === p1 || relevantTriangles[i].p3 === p1 ||
			relevantTriangles[i].p1 === p2 || relevantTriangles[i].p2 === p2 || relevantTriangles[i].p3 === p2 ||
			relevantTriangles[i].p1 === p3 || relevantTriangles[i].p2 === p3 || relevantTriangles[i].p3 === p3
			){
				lst.push(relevantTriangles[i]);
			}
		}
		for (let i=0; i<lst.length; i++){
			relevantTriangles.splice(relevantTriangles.indexOf(lst[i]), 1);
		}
	}
	
	
	
	
	/* TOOLS */
	
	

function findThirdPointTriangle(triangle, point1, point2){
	if (triangle.p1 != point1 && triangle.p1 != point2){
		return triangle.p1;
	}
	if (triangle.p2 != point1 && triangle.p2 != point2){
		return triangle.p2;
	}
	return triangle.p3;
}
	
function browseStructureToFindTriangle(point, startNode){
	if (startNode.children.length !== 0){
		let children = startNode.children;
		for (let i=0; i<children.length; i++){
			if (checkPointInsideTriangle(children[i].triangle, point)){
				browseStructureToFindTriangle(point, children[i]);
				break;
			}
		}
	} else {
		foundTriangle = startNode;
		return startNode.triangle;
	}
}
	
function checkPointInsideTriangle(triangle, point){
	let t1 = new Triangle(triangle.p1, triangle.p2, point);
	let t2 = new Triangle(triangle.p2, triangle.p3, point);
	let t3 = new Triangle(triangle.p1, triangle.p3, point);
	let true1 = (rightOrient(t1.p1, t1.p2, t1.p3) && rightOrient(t2.p1, t2.p2, t2.p3) && rightOrient(t3.p1, t3.p2, t3.p3));
	let true2 = (!rightOrient(t1.p1, t1.p2, t1.p3) && !rightOrient(t2.p1, t2.p2, t2.p3) && !rightOrient(t2.p1, t2.p2, t2.p3));
		
	return (true1 || true2);
}
	
	
function findAdjacentTriangle(edge, node){
	for (let i=0; i<relevantTriangles.length; i++){
		if ((relevantTriangles[i].p1 != node && relevantTriangles[i].p2 != node && relevantTriangles[i].p3 != node)&&
		(relevantTriangles[i].p1 === edge.p1 || relevantTriangles[i].p2 === edge.p1 || relevantTriangles[i].p3 === edge.p1)&&
		(relevantTriangles[i].p1 === edge.p2 || relevantTriangles[i].p2 === edge.p2 || relevantTriangles[i].p3 === edge.p2)){
			return relevantTriangles[i];
		}
	}
	return false;
}
	
function findOppositeNode(edge, adjacentTriangle){
	if (adjacentTriangle === false){
		return false;
	}
	if (adjacentTriangle.p1 !== edge.p1 && adjacentTriangle.p1 != edge.p2){
		return adjacentTriangle.p1;
	}
	if (adjacentTriangle.p2 !== edge.p1 && adjacentTriangle.p2 != edge.p2){
		return adjacentTriangle.p2;
	}
	if (adjacentTriangle.p3 !== edge.p1 && adjacentTriangle.p3 != edge.p2){
		return adjacentTriangle.p3;
	}
}	

function checkPointOnLine(triangle, point){
	let m = calculateMCanvas2Delaunay(triangle.p1, triangle.p2);
	let m2 = calculateMCanvas2Delaunay(triangle.p1, point);
	if (m === m2){
		return [triangle.p1, triangle.p2];
	}
	m = calculateMCanvas2Delaunay(triangle.p2, triangle.p3);
	m2 = calculateMCanvas2Delaunay(triangle.p2, point);
	if (m === m2){
		return [triangle.p2, triangle.p3];
	}
	m = calculateMCanvas2Delaunay(triangle.p1, triangle.p3);
	m2 = calculateMCanvas2Delaunay(triangle.p1, point);
	if (m === m2){
		return [triangle.p1, triangle.p3];
	}
	return false;
}

function findContainingTriangle(point){
	for (let i=0; i<relevantTriangles.length; i++){
		if (checkPointInsideTriangle(relevantTriangles[i], point)){
			return relevantTriangles[i];
		}
	}
}