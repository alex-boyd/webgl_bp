/*

quaternion.js
webgl boilerplate 

my quaternion implementation. allows for faster rotation without gimble lock.

todo: lerp/ slerp function?

*/

function Quaternion()
{
    // quaternion components. w is the "real" value.
    this.w = 1.0;
    this.x = 0.0;
    this.y = 0.0;
    this.z = 0.0;

    // "dirty" bit to recompute matrix
    this.dirty = 1;

    // rotation matrix corresponding to quaternion
    this.matrix = new Matrix4(); 
    
}

// sets to identity/zero quaternion
Quaternion.prototype.identity = function() 
{
    this.w = 1.0;
    this.x = 0.0;
    this.y = 0.0;
    this.z = 0.0;
}

// sets this quaternion equal to another
Quaternion.prototype.set = function(a)
{
    this.w = a.w;
    this.x = a.x;
    this.y = a.y;
    this.z = a.z;
}

// sets to a rotation of angle degrees around axis x,y,z
Quaternion.prototype.setRotate = function(angle,x_,y_,z_) 
{
    var a_ = angle * Math.PI / 360.0;
    var s_ = Math.sin(a_);
    var c_ = Math.cos(a_);

    this.w = c_;
    this.x = x_ * s_;
    this.y = y_ * s_;
    this.z = z_ * s_;

    this.dirty = 1; // matrix will need to be recalculated
}

// rotates angle degrees around axis x,y,z
Quaternion.prototype.rotate = function(angle,x_,y_,z_)
{
    var a_ = angle * Math.PI / 360.0;
    var s_ = Math.sin(a_);
    var c_ = Math.cos(a_);

    var w__ = c_;
    var x__ = x_ * s_;
    var y__ = y_ * s_;
    var z__ = z_ * s_;

    // perform quaternion multiplication
    this.w = (this.w * w__) - (this.x * x__) - (this.y * y__) - (this.z * z__);
    this.x = (this.x * w__) + (this.w * x__) - (this.z * y__) + (this.y * z__);
    this.y = (this.y * w__) + (this.z * x__) + (this.w * y__) - (this.x * z__);
    this.z = (this.z * w__) - (this.y * x__) + (this.x * y__) + (this.w * z__);

    this.dirty = 1; // matrix will need to be recalculated
}

// multiplies two quaternions together so as to compound rotations
Quaternion.prototype.multiply = function(r)
{
    /*
    if // check that r is an object and at the very least quaternionesque
    (
        r && 
        typeof r === 'object' && 
        r.hasOwnProperty('w') && 
        r.hasOwnProperty('x') && 
        r.hasOwnProperty('y') && 
        r.hasOwnProperty('z')  
    )
    { // perform quaternion multiplication
    */
        this.w = (this.w * r.w) - (this.x * r.x) - (this.y * r.y) - (this.z * r.z);
        this.x = (this.x * r.w) + (this.w * r.x) - (this.z * r.y) + (this.y * r.z);
        this.y = (this.y * r.w) + (this.z * r.x) + (this.w * r.y) - (this.x * r.z);
        this.z = (this.z * r.w) - (this.y * r.x) + (this.x * r.y) + (this.w * r.z);



        this.dirty = 1; // matrix will need to be recalculated
    /*
    }
    else
    {
        console.log("error in Quaternion.multiply(): multiplicand is not a quaternion.");
    }
    */
}

Quaternion.prototype.setMultiply = function(l,r)
{

    /*
    if // check that l/r is an object and at the very least quaternionesque
    (
        r && 
        typeof r === 'object' && 
        r.hasOwnProperty('w') && 
        r.hasOwnProperty('x') && 
        r.hasOwnProperty('y') && 
        r.hasOwnProperty('z') && 

        l && 
        typeof l === 'object' && 
        l.hasOwnProperty('w') && 
        l.hasOwnProperty('x') && 
        l.hasOwnProperty('y') && 
        l.hasOwnProperty('z')  
    )
    {
    */
        this.w = (l.w * r.w) - (l.x * r.x) - (l.y * r.y) - (l.z * r.z);
        this.x = (l.x * r.w) + (l.w * r.x) - (l.z * r.y) + (l.y * r.z);
        this.y = (l.y * r.w) + (l.z * r.x) + (l.w * r.y) - (l.x * r.z);
        this.z = (l.z * r.w) - (l.y * r.x) + (l.x * r.y) + (l.w * r.z);

        this.dirty = 1; // matrix will need to be recalculated

    /*
    }
    else
    {
        console.log("error in Quaternion.setMultiply(): multiplicand is not a quaternion.");
    }
    */
}

// returns equivalent 4x4 matrix
Quaternion.prototype.mat4 = function()
{
    //if(this.dirty)
    //{
        var mat = {elements:null}
        mat.elements = new Float32Array
        ([
            // column 1
            this.w*this.w + this.x*this.x - this.y*this.y - this.z*this.z,
            2*(this.x*this.y + this.w*this.z), 
            2*(this.x*this.z - this.w*this.y),
            0,
            // column 2
            2*(this.x*this.y - this.w*this.z),          
            this.w*this.w - this.x*this.x + this.y*this.y - this.z*this.z, 
            2*(this.y*this.z + this.w*this.x),
            0,
            // column 3
            2*(this.x*this.z + this.w*this.y),          
            2*(this.y*this.z - this.w*this.x),
            this.w*this.w - this.x*this.x - this.y*this.y + this.z*this.z,
            0,                      
            // column 4
            0,
            0,
            0,
            1
        ]);

        var ret = new Matrix4();
        ret.set(mat);
        this.matrix = ret;
//        console.log(this.matrix.elements[0]);
    /*
        console.log
        (
            "returned quat mat4: " + 
            ret.elements[0] + ", " + 
            ret.elements[1] + ", " + 
            ret.elements[2] + ", " + 
            ret.elements[3] + ", " + 
            ret.elements[4] + ", " + 
            ret.elements[5] + ", " + 
            ret.elements[6] + ", " + 
            ret.elements[7] + ", " + 
            ret.elements[8] + ", " + 
            ret.elements[9] + ", " + 
            ret.elements[10] + ", " + 
            ret.elements[11] + ", " + 
            ret.elements[12] + ", " + 
            ret.elements[13] + ", " + 
            ret.elements[14] + ", " + 
            ret.elements[15] 
        );
        */
        //this.dirty = 0;
    //}

    return this.matrix;
}

// linearly interpolates between quaternions a(0) and b(1) at d(elta), 0 <= d <= 1
// not rly tested per se
Quaternion.prototype.lerp = function(a,b,d)
{
    this.w = (1 - d) * a.w + d * b.w;
    this.x = (1 - d) * a.x + d * b.x;
    this.y = (1 - d) * a.y + d * b.y;
    this.z = (1 - d) * a.z + d * b.z;
}

