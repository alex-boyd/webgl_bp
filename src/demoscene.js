/*

demoscene.js
webgl boilerplate 

specifies a demo 3d scene with some basic primitives

*/

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
	/*
    var floorSize = 1;
    var delta = 0.03;

    // cubes 
    var test = new FunCube();
    test.scene = this;
    test.scale.set(0.2,0.2,0.2);
    test.position.set(-0.5,-0.1,0.0);

    var floor = new FloorCube();
    floor.scene = this;
    floor.scale.set(0.7,0.05,0.7);
    floor.position.set(0.0,-0.5,0.0);

    this.heirarchy.children.push(floor);
    this.heirarchy.children.push(test);

    // spheres

    var s1 = new FunSphere();
    s1.scene = this;
    s1.scale.set(0.2,0.2,0.2);
    s1.position.set(0.1,0.3,0.4);

    this.heirarchy.children.push(s1);

    var s2 = new FunSphere();
    s2.scene = this;
    s2.scale.set(0.3,0.3,0.3);
    s2.position.set(0.3,0.1,-0.4);
//    s2.index = 1;

    this.heirarchy.children.push(s2);
	*/
}
