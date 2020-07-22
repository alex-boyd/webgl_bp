/*

main.js
webgl boilerplate 

initializes webgl and calls drawing routines

*/

var gl;
var aspectRatio;
const CLEAR_COLOR = new Vector(0.6,0.6,0.6); // aspirational

function main() 
{
    // Retrieve <canvas> element
    var canvas = document.getElementById('webgl');

	// make a square fullscreen canvas
	var canvasW = document.body.clientWidth; 
	var canvasH = document.body.clientHeight; 
	if(canvasW < canvasH)
	{ 
		canvas.width = canvasW;
		canvas.height = canvasW;
	}
	else
	{
		canvas.width = canvasH;
		canvas.height = canvasH;
	}

    // Get the rendering context for WebGL
    gl = getWebGLContext(canvas);
    if (!gl) 
    {
        console.log('Failed to get the rendering context for WebGL');
        return;
    }

    // retrieve UI elements
    var sliderR = document.getElementById('sliderR');

    // Initialize shaders
    if (!initShaders(gl, VSHADER_SOURCE_MAIN, FSHADER_SOURCE_MAIN)) 
    {
        console.log('Failed to intialize shaders.');
        return;
    }

    // enable alpha blending
    gl.enable(gl.BLEND);

	// alpha blending for transparency (with alternate blend modes :)  )
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    //gl.blendFunc(gl.ONE_MINUS_SRC_ALPHA, gl.SRC_ALPHA);
    //gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    // Specify the color for clearing <canvas>
    gl.clearColor(0.6, 0.6, 0.6, 1.0);
    gl.enable(gl.CULL_FACE);
    gl.enable(gl.DEPTH_TEST);
    gl.frontFace(gl.CW);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    /*
	// disabled texture code goes here
    var textures = [];
    textures.push(new Panel());
    initTextures(textures);
    */

    //client program
    bind(gl,geometry());
    var demo = new DemoScene(gl);
    //Scene.prototype.initTextures.call(sci);

    //document.onkeydown = function(event_){ keyDown(event_); };,

    // Start drawing
    var tick = function() 
    {
		// make a square fullscreen canvas
		var canvasW = document.body.clientWidth; 
		var canvasH = document.body.clientHeight; 
		if(canvasW < canvasH)
		{ 
			canvas.width = canvasW;
			canvas.height = canvasW;
		}
		else
		{
			canvas.width = canvasH;
			canvas.height = canvasH;
		}

        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        demo.rotationSliderValue = sliderR.value;

        Scene.prototype.draw.call(demo);

        demo.frame = animate(demo.frame);

        requestAnimationFrame(tick, canvas); // Request that the browser calls tick
    };

    tick();
}
