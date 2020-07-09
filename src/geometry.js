/*

geometry.js
webgl boilerplate 

specifies geometry/colors to be passed in to the vertex buffer

functions take input in the form of a prepacked array.
vertices are entered sequentially in the following format:
x, y, z, r, g, b, a, nx, ny, nz, u, v

float32array concatenation:
https://stackoverflow.com/questions/4554252/typed-arrays-in-gecko-2-float32array-concatenation-and-expansion

*/

//number of distinct cubes
var NUM_CUBES = 1;
var NUM_SPHERES = 1;
var SPHERES_OFFSET = 0;

// colors
var cubeColors = new Float32Array
([
    1.0,1.0,1.0,1.0
    //0.45,0.75,0.45,0.9
]);


var sphereColors = new Float32Array
([
    1.0,1.0,1.0,1.0,
    0.75,0.75,0.45,0.9
]);

function concatF32(a,b)
{
    var al = a.length;
    var result = new Float32Array(al + b.length)
    result.set(a);
    result.set(b,al);
    return result;
}

function geometry()
{
    var vertices = new Float32Array();

    // add cubes to vertex array
    for(var i = 0; i < NUM_CUBES; i++)
    {
        var j = i*4;
        var newV = makeCube(cubeColors[j],cubeColors[j+1],cubeColors[j+2],cubeColors[j+3]);
        vertices = concatF32(vertices,newV);
    }

    SPHERES_OFFSET = NUM_CUBES * 24;

    // add spheres to vertex array
    for(var i = 0; i < NUM_SPHERES; i++)
    {
        var j = i*4;
        var newV = makeSphere(sphereColors[j],sphereColors[j+1],sphereColors[j+2],sphereColors[j+3]);
        vertices = concatF32(vertices,newV);
    }

    return vertices; 
}
