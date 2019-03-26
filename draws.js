function redrawAllPoints(){
	let canvas = document.getElementById('myCanvas');
	let ctx = canvas.getContext('2d');
	rect = canvas.getBoundingClientRect();
	for (var i=0; i<points.length; i++){
		var point = points[i];
		ctx.beginPath();
		ctx.arc(point.x - rect.left, point.y - rect.top, 4, 0, 2*Math.PI);
		ctx.fillStyle = point.colour;
		ctx.fill();
	}
}
	
function redrawAllPointsCanvas2Beginning(){
	let canvas = document.getElementById('myCanvas2');
	let ctx = canvas.getContext('2d');
	//rect = canvas.getBoundingClientRect();
	for (var i=0; i<points.length; i++){
		var point = points[i];
		ctx.beginPath();
		ctx.arc(point.x, point.y, 4, 0, 2*Math.PI);
		ctx.fillStyle = point.colour;
		ctx.fill();
	}
}
	
	
function redrawAllPointsCanvas2Next(){
	let canvas = document.getElementById('myCanvas2');
	let ctx = canvas.getContext('2d');
	//rect = canvas.getBoundingClientRect();
	for (var i=0; i<points.length; i++){
		var point = points[i];
		ctx.beginPath();
		ctx.arc(point.x, point.y, 4, 0, 2*Math.PI);
		ctx.fillStyle = point.colour;
		ctx.fill();
	}
	ctx.beginPath();
	ctx.arc(currentCenter.x, currentCenter.y, 4, 0, 2*Math.PI);
	ctx.fillStyle = currentCenter.colour;
	ctx.fill();
	ctx.beginPath();
	ctx.arc(extendedPoints[extendedPoints.length-1].x, extendedPoints[extendedPoints.length-1].y, 4, 0, 2*Math.PI);
	ctx.fillStyle = extendedPoints[extendedPoints.length-1].colour;
	ctx.fill();
	ctx.beginPath();
	ctx.arc(extendedPoints[extendedPoints.length-2].x, extendedPoints[extendedPoints.length-2].y, 4, 0, 2*Math.PI);
	ctx.fillStyle = extendedPoints[extendedPoints.length-2].colour;
	ctx.fill();
	ctx.beginPath();
	ctx.arc(extendedPoints[extendedPoints.length-3].x, extendedPoints[extendedPoints.length-3].y, 4, 0, 2*Math.PI);
	ctx.fillStyle = extendedPoints[extendedPoints.length-3].colour;
	ctx.fill();
}
	
function redrawAllCurrentEdges(){
	for (var i=0; i<edges.length; i++){
		var edge = edges[i];
		drawSimpleLine(edge[0], edge[1]);
	}
	for (var i=0; i<relevantEdges.length; i++){
		var edge = relevantEdges[i];
		drawSimpleLine(edge.p1, edge.p2);
	}
	for (var i=0; i<extendedEdges.length; i++){
		var edge = extendedEdges[i];
		drawSimpleLine(edge.p1, edge.p2);
	}
}
	
function redrawAllCurrentEdgesCanvas2(){
	for (var i=0; i<edges.length; i++){
		var edge = edges[i];
		drawLineCanvas2(edge[0], edge[1]);
	}
	for (var i=0; i<relevantEdges.length; i++){
		var edge = relevantEdges[i];
		drawLineCanvas2(edge.p1, edge.p2);
	}
	for (var i=0; i<extendedEdges.length; i++){
		var edge = extendedEdges[i];
		drawLineCanvas2(edge.p1, edge.p2);
	}
}
	
	
function redrawAllTriangles(){
	for (let i=0; i< triangles.length; i++){
		drawLineCanvas2(triangles[i].p1, triangles[i].p2);
		drawLineCanvas2(triangles[i].p2, triangles[i].p3);
		drawLineCanvas2(triangles[i].p1, triangles[i].p3);
	}
}
	
	
function drawLineCanvas2(p1, p2){
	let canvas = document.getElementById('myCanvas2');
	let ctx = canvas.getContext("2d");
	ctx.beginPath();
	ctx.moveTo(p1.x, p1.y);
	ctx.lineTo(p2.x, p2.y);
	ctx.closePath();
	ctx.stroke();
}

function drawPoint(point){
		let canvas = document.getElementById('myCanvas');
		let ctx = canvas.getContext('2d');
		rect = canvas.getBoundingClientRect();
		ctx.beginPath();
		ctx.arc(point.x - rect.left, point.y - rect.top, 4, 0, 2*Math.PI);
		ctx.fillStyle = pointColour;
		ctx.fill();
	}
	
function drawPointCanvas2(point){
	let canvas = document.getElementById('myCanvas2');
	let ctx = canvas.getContext('2d');
	rect = canvas.getBoundingClientRect();
	ctx.beginPath();
	if (point.colour == 'black'){
		ctx.arc(point.x, point.y, 4, 0, 2*Math.PI);
	} else {
		ctx.arc(point.x, point.y, 4, 0, 2*Math.PI);
	}
	
	ctx.fillStyle = point.colour;
	ctx.fill();
}

function drawRedCircle(p){
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");
	ctx.beginPath();
	ctx.arc(currentPoints[0].x-rect.left, current.y-rect.top, radius, 0, 2*Math.PI);
	ctx.closePath();
	ctx.stroke();
}

function drawLine(p1, p2){
	let canvas = document.getElementById('myCanvas');
	let ctx = canvas.getContext("2d");
	ctx.beginPath();
	ctx.moveTo(redPoints[p1].x - rect.left, redPoints[p1].y - rect.top);
	ctx.lineTo(bluePoints[p2].x - rect.left, bluePoints[p2].y - rect.top);				
	ctx.closePath();	
	ctx.stroke();
}
	
	function drawSimpleLine(p1, p2){
	let canvas = document.getElementById('myCanvas');
	let ctx = canvas.getContext("2d");
	ctx.beginPath();
	ctx.moveTo(p1.x - rect.left, p1.y - rect.top);
	ctx.lineTo(p2.x - rect.left, p2.y - rect.top);
	ctx.closePath();
	ctx.stroke();
}


function drawLineD(p1, p2){
	let canvas = document.getElementById('myCanvas2');
	let ctx = canvas.getContext("2d");
	ctx.beginPath();
	ctx.moveTo(p1[0], p1[1]);
	ctx.lineTo(p2[0], p2[1]);				
	ctx.closePath();	
	ctx.stroke();
}

function drawAllTriangles(){
	for (let i=0; i<relevantTriangles.length; i++){
		let t = relevantTriangles[i];
		drawLineCanvas2(t.p1, t.p2);
		drawLineCanvas2(t.p2, t.p3);
		drawLineCanvas2(t.p3, t.p1);
	}
}	

function redrawCanvas2(){
	let canvas = document.getElementById('myCanvas2');
	let ctx = canvas.getContext('2d');
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	createPointsAtInfinity();
	redrawAllPointsCanvas2Beginning();
	redrawAllTriangles();
	redrawAllCurrentEdgesCanvas2();
}
	
	function redrawPureCanvas2(){
	let canvas = document.getElementById('myCanvas2');
	let ctx = canvas.getContext('2d');
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	redrawAllPointsCanvas2Beginning();
	redrawAllTriangles();
	redrawAllCurrentEdgesCanvas2();
}

function drawCircleCanvas2(){
	let canvas = document.getElementById('myCanvas2');
	let ctx = canvas.getContext("2d");
	ctx.beginPath();
	ctx.arc(currentCenter.x, currentCenter.y, currentRay, 0, 2*Math.PI);
	ctx.closePath();
	ctx.stroke();
}
	
function drawCircleCanvas2Red(){
	let canvas = document.getElementById('myCanvas2');
	let ctx = canvas.getContext("2d");
	ctx.beginPath();
	ctx.arc(currentCenter.x, currentCenter.y, currentRay, 0, 2*Math.PI);
	ctx.closePath();
	ctx.strokeStyle = "red";
	ctx.stroke();
	ctx.strokeStyle = "black";
}