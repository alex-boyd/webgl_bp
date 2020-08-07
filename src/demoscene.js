/*

demoscene.js
webgl boilerplate 

specifies a demo 3d scene with some basic primitives

*/

// materials and assets -------------------------------------------------------

function Panel() // test panel texture for cubes
{
	Texture.call(this, "Panel", "resources/panel.png");
}
Panel.prototype = new Texture();


// scene specification --------------------------------------------------------

function DemoScene(gl)
{
    Scene.call(this,gl);

    this.stuff();
}

DemoScene.prototype = new Scene();

DemoScene.prototype.stuff = function()
{
	
	var pos1 = new Vector(-0.5,0.2,0.0);
	var scale1 = new Vector(0.2,0.2,0.2);
	this.addCube(
		pos1,
		scale1,
		null,
		0
	);

	this.addCube(
		new Vector(0.0,-0.5,0.0),
		new Vector(0.7,0.05,0.7),
		null,
		0
	);

	this.addSphere(
		new Vector(0.0,0.5,0.0),
		new Vector(0.7,0.7,0.7),
		null,
		0
	);
}
