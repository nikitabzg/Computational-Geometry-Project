
function calculateK(){
	k = Math.pow(2, Math.pow(2,counterI));
}
	
function calculate_m(){
	let m = Math.pow(k,2);
	return m;
}
	
	
	
function changePoints(){
	let canvas = document.getElementById('myCanvas');
	let ctx = canvas.getContext('2d');
	rect = canvas.getBoundingClientRect();
	for (let i=0; i<points.length; i++){
		points[i].x = points[i].x - rect.left + 700;
		points[i].y = points[i].y - rect.top + 400;
	}
}
	
	
	
function createPointsAtInfinity(){
	extendedPoints = [];
	let canvas2 = document.getElementById('myCanvas2');
	let ctx2 = canvas2.getContext('2d');
	let rect2 = canvas2.getBoundingClientRect();
	let p1 = new Point(1000, 0, 'black');
	let p2 = new Point(0, 1000, 'black');
	let p3 = new Point(2000, 1000, 'black');
	for (let i=0; i<points.length; i++){
		extendedPoints.push(points[i]);
	}
	extendedPoints.push(p1);
	extendedPoints.push(p2);
	extendedPoints.push(p3);
	extendedEdges.push(new Edge(p1, p2));
	extendedEdges.push(new Edge(p2, p3));
	extendedEdges.push(new Edge(p1, p3));
		
	drawPointCanvas2(p1);
	drawPointCanvas2(p2);
	drawPointCanvas2(p3);
	drawLineCanvas2(extendedEdges[0].p1, extendedEdges[0].p2);
	drawLineCanvas2(extendedEdges[1].p1, extendedEdges[1].p2);
	drawLineCanvas2(extendedEdges[2].p1, extendedEdges[2].p2);
}
	
function checkDelaunayTriangle(p1, p2, p3){
	let yDelta1 = p2.y - p1.y;
	let xDelta1 = p2.x - p1.x;
	let yDelta2 = p3.y - p2.y;
	let xDelta2 = p3.x - p2.x;
	
	let center = new Point(0,0,'black');
	
	let slope1 = yDelta1/xDelta1;
	let slope2 = yDelta2/xDelta2;
	
	center.x = (slope1*slope2*(p1.y-p3.y) + slope2*(p1.x+p2.x) - slope1*(p2.x+p3.x))/(2*(slope2-slope1));
	center.y = -1*(center.x - (p1.x+p2.x)/2)/slope1 + (p1.y+p2.y)/2;
	return center;
}	


function calculateXdistance(p1, p2){
	let xDist = p2.x - p1.x;
	if (xDist<0){
		xDist = -xDist;
	}
	return xDist;
}
	
function calculateDistance(p1, p2){
	let x1 = p1.x;
	let y1 = p1.y;
	let x2 = p2.x;
	let y2 = p2.y;
		
	let distance = Math.sqrt(Math.pow(x2-x1, 2) + Math.pow(y2-y1, 2));
	return distance;
}
	
function calculateM(){
	let p1 = currentPoints[0];
	let p2 = currentPoints[1];
	let m = ((p2.y - rect.top)-(p1.y - rect.top))/((p2.x - rect.left)-(p1.x - rect.left));
	return m;
}
	
function calculateMCanvas2(){
	let p1 = currentPoints[0];
	let p2 = currentPoints[1];
	let m = ((p2.y)-(p1.y))/((p2.x)-(p1.x));
	return m;
}
	
	
function calculateMCanvas2Delaunay(p1, p2){
	return ((p2.y)-(p1.y))/((p2.x)-(p1.x));
}
	
function advanceCenter(){
	let p1 = currentPoints[0];
	let p2 = currentPoints[1];
	let m = calculateM();
	if (m<0){
		m = -m;
	}
	let x1 = p1.x - rect.left;
	let y1 = p1.y - rect.top;
	let x2 = p2.x - rect.left;
	let y2 = p2.y - rect.top;
	let xc = 0;
	let yc = 0;
	if (m < 1){
		if (p1.x < p2.x){
			xc = currentCenter.x + 1;
		} else {
			xc = currentCenter.x - 1;
		}
		if (p1.y < p2.y){
			yc = currentCenter.y + m;
		} else {
			yc = currentCenter.y - m;
		}
	} else {
		if (p1.y < p2.y){
			yc = currentCenter.y + 1;
		} else {
			yc = currentCenter.y - 1;
		}
		if (p1.x < p2.x){
			xc = currentCenter.x + (1.0/m);
		} else {
			xc = currentCenter.x - (1.0/m);
		}
	}
	
	currentCenter = new Point(xc, yc, "black");
}
	
function advanceCenterCanvas2(){
	let p1 = currentPoints[0];
	let p2 = currentPoints[1];
	let m = calculateMCanvas2();
	if (m<0){
		m = -m;
	}
	let x1 = p1.x;
	let y1 = p1.y;
	let x2 = p2.x;
	let y2 = p2.y;
	let xc = 0;
	let yc = 0;
	if (m<1){
		if (p1.x < p2.x){
			xc = currentCenter.x + 1;
		} else {
			xc = currentCenter.x - 1;
		}
		if (p1.y < p2.y){
			yc = currentCenter.y + m;
		} else {
			yc = currentCenter.y - m;
		}
	} else {
		if (p1.y < p2.y){
			yc = currentCenter.y + 1;
		} else {
			yc = currentCenter.y - 1;
		}
		if (p1.x < p2.x){
			xc = currentCenter.x + (1.0/m);
		} else {
			xc = currentCenter.x - (1.0/m);
		}
	}
	
	currentCenter = new Point(xc, yc, "black");
}
	
function growCircle(center, p1, p2, p3){
	let distance = calculateDistance(center, p1);
	if (checkPointOnBoundaryGrowingRay() || currentRay >= distance){
		if (currentlyFoundPoint === p1){
			t = new Triangle(p2, p3, currentlyFoundPoint);
		drawLineCanvas2(p2, currentlyFoundPoint);
		drawLineCanvas2(p3, currentlyFoundPoint);
		return true;
		}
		return false;
	}
	let canvas = document.getElementById('myCanvas2');
	let ctx = canvas.getContext("2d");
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	redrawAllCurrentEdgesCanvas2();
	redrawAllPointsCanvas2Next();
	ctx.beginPath();
	ctx.arc(center.x, center.y, currentRay, 0, 2*Math.PI);
	ctx.closePath();
	ctx.stroke();
	i++;
	currentRay++;
	setTimeout(growCircle, 100, center, p1, p2, p3);
}
		
function partitionP(P){
	calculateK();
	let m = calculate_m();
	let pList = [];
	let i = 0;
	for (i=0; i<P.length-m; i=i+m){
		let subList = [];
		for (let j=i; j<i+m; j++){
			subList.push(P[j]);
		}
		pList.push(subList);
	}
	let subList = [];
	for (let j=i; j<P.length; j++){
		subList.push(P[j]);
	}
	pList.push(subList);
	return pList;
}

function maxPoint(){
	let maxs = [points[0]];
	for (let i=1; i<points.length; i++){
		if (points[i].y>maxs[0].y){
			maxs = [points[i]];
		} else if (points[i].y == maxs[0].y){
			maxs.push(points[i]);
		}
	}
	if (maxs.length == 1){
		return maxs[0];
	}
	let point = maxs[0];
	for (let i=1; i<maxs.length; i++){
		if (maxs[i].x>point.x){
			point = maxs[i];
		}
	}
	return point;
}


function rightOrient(point1, point2, point3){
	let pointA = point1;
	let pointB = point2;
	let pointC = point3;
	var result = pointB.x*(pointC.y) - pointA.x*(pointC.y) + pointA.x*(pointB.y)
    - (pointB.y)*pointC.x + (pointA.y)*pointC.x - (pointA.y)*pointB.x;
	return (result > 0);
}
	
