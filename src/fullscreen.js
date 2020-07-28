/*

fullscreen.js
webgl boilerplate 

utility functions to resize html canvas and webgl viewport

*/

// make a square fullscreen canvas
function resizeCanvas()
{
		var canvas = document.getElementById('webgl');
		var canvasW = document.body.clientWidth; 
		var canvasH = document.body.clientHeight; 
		canvas.width = canvasW;
		canvas.height = canvasH;
	/*
		var canvas = document.getElementById('webgl');
		var canvasW = document.body.clientWidth; 
		var canvasH = document.body.clientHeight; 
		if(canvasW < canvasH) 	// portrait
		{ 
			canvas.width = canvasW;
			canvas.height = canvasW;
		}
		else 					// landscape
		{
			canvas.width = canvasH;
			canvas.height = canvasH;
		}
		*/
}

// resize viewport to a fullscreen square 
function resizeViewport(gl)
{
		var canvas = document.getElementById('webgl');
		var canvasW = document.body.clientWidth; 
		var canvasH = document.body.clientHeight; 

		if(canvasW < canvasH) 	// portrait
		{ 
			gl.viewport(0,((canvasH-canvasW)/2), canvasW, canvasW);
		}
		else 					// landscape
		{
			gl.viewport(((canvasW-canvasH)/2), 0, canvasH, canvasH);
		}
}

/*

sketches

// portrait

			|----------|
(h-w)/2		|          |
			|----------|
			|          |
w			|          |
			|(0,j)     |
			|----------|
(h-w)/2 = j	|          |
			|----------|
		(0,0)


// landscape

			(w-h)/2 = j
			|----------------|
			|    |      |    |
			|    |      |    |
			|    |(j,0) |    |
			|----------------|
		(0,0)
*/
