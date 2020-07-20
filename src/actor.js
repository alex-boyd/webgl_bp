/*

actor.js
webgl boilerplate 

stores information about an onscreen object

*/

// generic Actor prototype ----------------------------------------------------
function Actor()
{
    this.scene = null; // scene reference where draw calls are sent
    this.parentActor = null; // actor
    this.children = []; // array of actors
    this.position = new Vector(0.0,0.0,0.0); // x, y, z
    this.scale = new Vector(1.0,1.0,1.0); // x, y, z
    this.rotation = new Quaternion(); 
    this.texture = null;
    this.index = null; // color index/material, should have wrapper
    this.mesh = null;

    // "dirty" bit to recompute model matrix?
    //this.dirty = 1;

    // cached model matrix 
    this.matrix = new Matrix4(); 
}

// causes the actor and its children to draw themselves to the screen
Actor.prototype.draw = function(p_,s_,r_)
{
	/*
    //animation!?!? horrible place to put this
    if(this.name === "FunCube")
    {
        this.rotation.setRotate(this.scene.frame,1,0,0);
//        this.rotation.rotate(this.scene.frame,0,1,0);
    }
	*/

    var newPosition = new Vector(p_.x, p_.y, p_.z);
    newPosition.set(p_.x, p_.y, p_.z);
    newPosition.add(this.position);

    var newScale = new Vector(s_.x, s_.y, s_.z);
    newScale.multiply(this.scale);

    var newRotation = new Quaternion();
    newRotation.set(this.rotation);
    newRotation.multiply(r_);

    var ret = new Matrix4();
    ret.translate(newPosition.x,newPosition.y,newPosition.z);
    ret.scale(newScale.x,newScale.y,newScale.z);
    ret.multiply(newRotation.mat4());

	// can be MASSIVELY improved as a system
    if(this.mesh === "cube")
    {
        drawCube(gl,ret,this.scene.viewMatrix, this.index);
    }

    if(this.mesh === "sphere")
    {
        drawSphere(gl,ret,this.scene.viewMatrix, this.index);
    }

    // call draw on children
    for(var j = 0; j < this.children.length; j++)
    {
        this.children[j].draw(newPosition,newScale,newRotation);
    }
}

// Cube -----------------------------------------------------------------------

function Cube()
{
    Actor.call(this);

    this.mesh = "cube";
}

Cube.prototype = new Actor();

// Sphere ---------------------------------------------------------------------

function Sphere()
{
    Actor.call(this);
    this.mesh = "sphere";
}

Sphere.prototype = new Actor();
