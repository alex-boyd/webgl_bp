/*

vector.js
webgl boilerplate 

vector3 implementation


*/

function Vector(x_,y_,z_)
{
    this.x = x_;
    this.y = y_;
    this.z = z_;
}


Vector.prototype.set = function(x_,y_,z_)
{
    this.x = x_;
    this.y = y_;
    this.z = z_;
}


Vector.prototype.add = function(a)
{
    this.x = a.x + this.x;
    this.y = a.y + this.y;
    this.z = a.z + this.z;
}


Vector.prototype.setAdd = function(a,b)
{
    this.x = a.x + b.x;
    this.y = a.y + b.y;
    this.z = a.z + b.z;
}


Vector.prototype.multiply = function(a)
{
    this.x = a.x * this.x;
    this.y = a.y * this.y;
    this.z = a.z * this.z;
}


Vector.prototype.cross = function(a,b)
{
    this.x = (a.y * b.z) - (a.z * b.y);
    this.y = (a.z * b.x) - (a.x * b.z);
    this.z = (a.x * b.y) - (a.y * b.x);
}

Vector.prototype.toString = function()
{
    return "(" + this.x + ", " + this.y + ", " + this.z + ")";
}
