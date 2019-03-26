
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
	