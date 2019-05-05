
function redoCanvas2(){
	var c = document.getElementById("myCanvas2");
	var ctx = c.getContext("2d");
	ctx.clearRect(0, 0, c.width, c.height);
	relevantEdges = [];
	extendedEdges = [];
	edges = [];
	relevantPoints = [];
	relevantTriangles = [];
	triangles = [];
	redrawPureCanvas2();
}
	
function createPoint(evt){
	let xCoord = evt.clientX;
	let yCoord = evt.clientY;
	let p = new Point(xCoord, yCoord, pointColour);
	points.push(p);
	if (pointColour == "red"){
		redPoints.push(p);
	} else {
		bluePoints.push(p);
	}
	drawPoint(p);
	if (bluePoints.length >= 1 && redPoints.length >= 1 && document.getElementById("saveB").disabled){
		document.getElementById("saveB").disabled=false;
	}
}

function createPointCanvas2(evt){
	let canvas2 = document.getElementById('myCanvas2');
	let ctx = canvas2.getContext('2d');
	rect = canvas2.getBoundingClientRect();
	let xCoord = evt.clientX - rect.left;
	let yCoord = evt.clientY - rect.top;
	let p = new Point(xCoord, yCoord, "black");
	let minDist = 999999;
	let closestNeighbour = null;
	for (let i=0; i<points.length; i++){
		let dist = calculateDistance(p, points[i]);
		if (dist < minDist){
			minDist = dist;
			closestNeighbour = points[i];
		}
	}
	p.colour = closestNeighbour.colour;
	drawPointCanvas2(p);
}
		
function setInitialPoint(P){
	let best = null;
	for (let i = 0; i < P.length; ++i){
		if (best===null || P[i].x < best.x){
			best = P[i];
		}
	}
	initialPoint = best;
	var index = P.indexOf(initialPoint);
	P.splice(index,1);
}
	
function shuffle(array) {   //stackOverflow source
  var currentIndex = array.length, temporaryValue, randomIndex;

	  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
		// Pick a remaining element...
	randomIndex = Math.floor(Math.random() * currentIndex);
	currentIndex -= 1;

		// And swap it with the current element.
	temporaryValue = array[currentIndex];
	array[currentIndex] = array[randomIndex];
	array[randomIndex] = temporaryValue;
	}
	return array;
}

	
	
function addExtendedEdges(p1, p2, p3){
	extendedEdges.push(new Edge(p1, p2));
	extendedEdges.push(new Edge(p2, p3));
	extendedEdges.push(new Edge(p1, p3));
}
	
	
	
	
function findEdge(edge){
	let p1 = edge.p1;
	let p2 = edge.p2;
	for (let i=0; i<extendedEdges.length; i++){
		if ((extendedEdges[i].p1 === p1 && extendedEdges[i].p2 === p2)||((extendedEdges[i].p1 === p2 && extendedEdges[i].p2 === p1))){
			return extendedEdges[i];
		}
	}
	return false;
}
	
function findPoint(point, pointsLst){
	for (let i=0; i<pointsLst.length; i++){
		if (pointsLst[i].x === point[0] && pointsLst[i].y === point[1]){
			return pointsLst[i];
		}		
	}
}


function findNeighbourDifferentColour(colour, neighbours){
	console.log("_______________________________")
	console.log(colour)
	for (let i=0; i<neighbours.length; i++){
		console.log(neighbours[i].colour)
		if(neighbours[i].colour !== colour){
			return true;
		}
	}
	return false;
}