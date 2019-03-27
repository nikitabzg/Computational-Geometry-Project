function pivotLemma3(){
	function moveCircle(p, pointsSet){
		let x;
		advanceCenterCanvas2();
		let radius = calculateDistance(p, currentCenter);
		currentRay = radius;
		if (checkPointOnBoundary(pointsSet)){
			setTimeout(redrawCanvas2, 5000);
			return;
		}
		var c = document.getElementById("myCanvas2");
		var ctx = c.getContext("2d");
		ctx.clearRect(0, 0, c.width, c.height);
		redrawCanvas2();
		ctx.beginPath();
		ctx.arc(currentCenter.x, currentCenter.y, currentRay, 0, 2*Math.PI);
		ctx.closePath();
		ctx.stroke();
		setTimeout(moveCircle, 100, p, pointsSet);
	};
	let p1 = currentPoints[0];
	let p2 = currentPoints[1];
	let p3 = extendedPoints[extendedPoints.length-1];
	currentRay = 0;
	if (p1.colour === "red"){
		moveCircle(p1, bluePoints);
	} else {
		moveCircle(p1, redPoints);
	}
	return true;
}
	
	
function drawFirstCircles(){
	let p1 = currentPoints[0];
	let p2 = currentPoints[1];
	let x = 0;
	function moveCircle(p, pointsSet){
		advanceCenter();
		let radius = calculateDistance(p, currentCenter);
		currentRay = radius;
		if ((checkPointOnBoundary(pointsSet))){
			p = currentlyFoundPoint;
			pointsSet = redPoints;
			if (i >= 2){
				edges = [[currentlyFoundPoint, currentPoints[0]]];
				if (!relevantPoints.includes(currentlyFoundPoint)){
					relevantPoints.push(currentlyFoundPoint);
				}
				if (!relevantPoints.includes(currentPoints[0])){
					relevantPoints.push(currentPoints[0]);
				}
				let e = new Edge(currentlyFoundPoint, currentPoints[0]);
				if (!relevantEdges.includes(e)){
					relevantEdges.push(e);
				}
				var c = document.getElementById("myCanvas");
				var ctx = c.getContext("2d");
				ctx.clearRect(0, 0, c.width, c.height);
				redrawAllPoints();
				redrawAllCurrentEdges();
				i=1;
				currentlyFoundPoint = 0;
				return;
			}
			drawNextCircle();
			i++;
		}
		var c = document.getElementById("myCanvas");
		var ctx = c.getContext("2d");
		ctx.clearRect(0, 0, c.width, c.height);
		redrawAllPoints();
		redrawAllCurrentEdges();
		ctx.beginPath();
		ctx.arc(currentCenter.x-rect.left, currentCenter.y-rect.top, currentRay, 0, 2*Math.PI);
		ctx.closePath();
		ctx.stroke();
		setTimeout(moveCircle, 100, p, pointsSet);
	};
	if (p1.colour == "red"){
		currentCenter = p1;
		moveCircle(p1, bluePoints);
	} else {
		currentCenter = p2;
		moveCircle(p2, bluePoints);
	}
}
	
function drawNextCircle(){
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");
	edges[1] = [currentlyFoundPoint, currentCenter];
	currentPoints[0] = currentlyFoundPoint; 
	currentPoints[1] = currentCenter;
	currentRay = 1;
	ctx.beginPath();
	ctx.arc(currentCenter.x-rect.left, currentCenter.y-rect.top, 8, 0, 2*Math.PI);
	ctx.closePath();
	ctx.fillStyle = "green";
	ctx.fill();
	ctx.beginPath();
	ctx.arc(currentlyFoundPoint.x-rect.left, currentlyFoundPoint.y-rect.top, 8, 0, 2*Math.PI);
	ctx.closePath();
	ctx.fillStyle = "yellow";
	ctx.fill();
	currentCenter = currentlyFoundPoint;
	ctx.beginPath();
	ctx.arc(currentCenter.x-rect.left, currentCenter.y-rect.top, currentRay, 0, 2*Math.PI);
	ctx.closePath();
	ctx.stroke();
	drawSimpleLine(currentPoints[0], currentPoints[1]);
}
	
function checkPointOnBoundary(pointsSet){
	let xc = currentCenter.x;
	let yc = currentCenter.y;
	for (let i=0; i<pointsSet.length; i++){
		let distanceToPoint = calculateDistance(currentCenter, pointsSet[i]);
		if (distanceToPoint <= currentRay){
		currentlyFoundPoint = pointsSet[i];
			return true;
		}
	}
	currentlyFoundPoint = currentPoints[1];
	return false;
}
	
function checkPointOnBoundaryGrowingRay(){
	let xc = currentCenter.x;
	let yc = currentCenter.y;
	for (let i=0; i<extendedPoints.length; i++){
		let distanceToPoint = calculateDistance(currentCenter, extendedPoints[i]);
		if (distanceToPoint <= currentRay){
		currentlyFoundPoint = extendedPoints[i];
			return true;
		}
	}
	return false;
}

	