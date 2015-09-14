// grid width and height
var size = 500;

// init everything
var canvas = document.getElementById("canvas"),
	ctx = canvas.getContext("2d");

var stopLoop = false;

var start = document.getElementById("start"),
	stop = document.getElementById("stop"),
	clear = document.getElementById("clear"),
	glider = document.getElementById("glider"),
	blinker = document.getElementById("blinker"),
	pulsar = document.getElementById("pulsar");


// sets grid states for glider
glider.addEventListener('click', function(){
	clearGrid(); 

	grid [12][11].state = 1; 
	grid [13][12].state = 1; 
	drawVerticalBlinkers(12, 13);

	drawGrid();
});

// sets grid states for blinker
blinker.addEventListener('click', function(){
	clearGrid();

	drawVerticalBlinkers(12, 12);
	drawGrid();
});

// sets grid states for pulsar
pulsar.addEventListener('click', function(){
	clearGrid();

	drawVerticalBlinkers(9, 11);
	drawVerticalBlinkers(9, 13);
	drawVerticalBlinkers(9, 6);
	drawVerticalBlinkers(9, 18);

	drawVerticalBlinkers(15, 11);
	drawVerticalBlinkers(15, 13);
	drawVerticalBlinkers(15, 6);
	drawVerticalBlinkers(15, 18);

	drawHorizontalBlinkers(6, 9);
	drawHorizontalBlinkers(6, 15);
	drawHorizontalBlinkers(11, 9);
	drawHorizontalBlinkers(11, 15);

	drawHorizontalBlinkers(13, 9);
	drawHorizontalBlinkers(13, 15);
	drawHorizontalBlinkers(18, 9);
	drawHorizontalBlinkers(18, 15);

	drawGrid();
});

// fills three cells vertically based on column and row given
function drawVerticalBlinkers(r, c){
	grid[r - 1][c].state = 1;
	grid[r][c].state = 1;
	grid[r + 1][c].state = 1;
}

// fills three cells horizontally based on column and row given
function drawHorizontalBlinkers(r,c){
	grid[r][c - 1].state = 1;
	grid[r][c].state = 1;
	grid[r][c + 1].state = 1;
}

// stops the loop
stop.addEventListener('click', function(){
	stopLoop = true;
});

// clears the grid
clear.addEventListener('click', function(){
	clearGrid();
});

// resets all cells to dead
function clearGrid(){
	stopLoop = true;
	for (var r = 0 ; r < 25 ; r++)
		for (var c = 0 ; c < 25 ; c++){
			grid [r][c].state = 0; 
		}
	drawGrid();
}

// starts the game 
start.addEventListener('click', function(){
	stopLoop = false;
	var beginLoop = window.setInterval(function(){ // performs loop until stop or clear is clicked
		var g = makeGrid();
		for (var r = 0 ; r < 25 ; r++)
		    for (var c = 0 ; c < 25 ; c++)
		    {
		    	// goes through each cell and checks all 8 neighbours for alive cells
				sum = parseInt(grid [up(r)][left (c)].state + grid [up (r)][c].state + grid [up (r)][right (c)].state + grid [r][right (c)].state
							 + grid [down (r)][right (c)].state + grid [down (r)][c].state + grid [down (r)][left (c)].state + grid [r][left (c)].state);
				// based on the number of live cells, we set the current cell to dead or alive 
				if (grid [r][c].state == 0 && sum == 3 || (grid [r][c].state == 1 && (sum == 2 || sum == 3))) g [r][c].state = 1;  
				else if (grid [r][c].state == 1) g [r][c].state = 0; 
		    }
		// redraw our grid
		grid = g;
		drawGrid();
		if (stopLoop == true) {clearInterval(beginLoop)}
	}, 50);	
});

//mouselisteners
canvas.addEventListener('click', function( e ){
	// gets the mouse coordinates relative to the grid
	x = e.pageX - canvas.offsetLeft;
	y = e.pageY - canvas.offsetTop;

	// get the row and column
	var r = parseInt(y / 20);
	var c = parseInt(x / 20);

	// if the current cell is read, make it white, and vice versa
	if (grid [r][c].state == 0) 
	{ 			
		ctx.fillStyle = "red";
		grid [r][c].state = 1; 
	}
	else 
	{
		ctx.fillStyle = "white";
		grid [r][c].state = 0; 
	}
	ctx.beginPath();
	ctx.fillRect(c* 20 + 1, r * 20 + 1, 18, 18);
});

// 2D array that is used for each cell 
var grid = makeGrid();

function makeGrid(){
	var g = new Array(25);
	for (var i = 0; i < 25; i++) {
	  g[i] = new Array(25);
	  	for (var j = 0; j < 25; j++) {
	  		g[i][j] = new cell();
	  	}
	  }
	return g;
}

// draws the grid with 25 rows and columns 
function drawGrid(){
	ctx.fillStyle="white";
	ctx.clearRect(0,0,500,500);
	ctx.beginPath();

    for (var x = 0; x <= size; x += 20) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, size);

        ctx.moveTo(0, x);
        ctx.lineTo(size,x);
    }

    ctx.strokeStyle = "black";
    ctx.stroke();

    for (var r = 0 ; r < 25 ; r++)
	    for (var c = 0 ; c < 25 ; c++)
		if (grid [r][c].state == 1)
		{
			ctx.fillStyle = "red";
			ctx.fillRect(c* 20 + 1, r * 20 + 1, 18, 18);
		}
}

// a cell
function cell(){
	this.state = 0;
}

// returns the left column of current cell
function left(c){
	if (c > 0)
	    return c - 1;
	else
	    return 24;
}

// returns the right column of current cell
function right(c){
	if (c < 24)
	    return c + 1;
	else
	    return 0;
}

// returns the top row of current cell
function up(r){
	if (r > 0)
	    return r - 1;
	else
	    return 24;
}

// returns the bottom row of current cell
function down(r){
	if (r < 24)
	    return r + 1;
	else
	    return 0;
}

drawGrid();
