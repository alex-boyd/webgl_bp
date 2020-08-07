/*

vertices.js
webgl boilerplate 

specifies vertices of primitives, so far a cube and sphere.

vertices are entered sequentially in the following format:
x, y, z, r, g, b, a, nx, ny, nz, u, v

cube layout from textbook

      v6----- v5
     /|      /|
    v1------v0|
    | |     | |
    | |v7---|-|v4
    |/      |/
    v2------v3

6 sides, 8 vertices, 24 vertices to render, 12 triangles to render

*/

// specifies vertices for a cube of a certain color
function makeCube(r, g, b, a)
{
  var vertices = new Float32Array([
    // v0-v1-v2-v3 front
     1.0, 1.0, 1.0, r, g, b, a, 0.0, 0.0, 1.0, 1.0, 1.0,
    -1.0, 1.0, 1.0, r, g, b, a, 0.0, 0.0, 1.0, 0.0, 1.0,
    -1.0,-1.0, 1.0, r, g, b, a, 0.0, 0.0, 1.0, 0.0, 0.0,
     1.0,-1.0, 1.0, r, g, b, a, 0.0, 0.0, 1.0, 1.0, 0.0,
    // v0-v3-v4-v5 right
     1.0, 1.0, 1.0, r, g, b, a, 1.0, 0.0, 0.0, 1.0, 1.0,
     1.0,-1.0, 1.0, r, g, b, a, 1.0, 0.0, 0.0, 0.0, 1.0,
     1.0,-1.0,-1.0, r, g, b, a, 1.0, 0.0, 0.0, 0.0, 0.0, 
     1.0, 1.0,-1.0, r, g, b, a, 1.0, 0.0, 0.0, 1.0, 0.0, 
    // v0-v5-v6-v1 up
     1.0, 1.0, 1.0, r, g, b, a, 0.0, 1.0, 0.0, 1.0, 1.0, 
     1.0, 1.0,-1.0, r, g, b, a, 0.0, 1.0, 0.0, 0.0, 1.0, 
    -1.0, 1.0,-1.0, r, g, b, a, 0.0, 1.0, 0.0, 0.0, 0.0, 
    -1.0, 1.0, 1.0, r, g, b, a, 0.0, 1.0, 0.0, 1.0, 0.0, 
    // v1-v6-v7-v2 left
    -1.0, 1.0, 1.0, r, g, b, a,-1.0, 0.0, 0.0, 1.0, 1.0, 
    -1.0, 1.0,-1.0, r, g, b, a,-1.0, 0.0, 0.0, 0.0, 1.0, 
    -1.0,-1.0,-1.0, r, g, b, a,-1.0, 0.0, 0.0, 0.0, 0.0, 
    -1.0,-1.0, 1.0, r, g, b, a,-1.0, 0.0, 0.0, 1.0, 0.0, 
    // v7-v4-v3-v2 down
    -1.0,-1.0,-1.0, r, g, b, a, 0.0,-1.0, 0.0, 1.0, 1.0, 
     1.0,-1.0,-1.0, r, g, b, a, 0.0,-1.0, 0.0, 0.0, 1.0, 
     1.0,-1.0, 1.0, r, g, b, a, 0.0,-1.0, 0.0, 0.0, 0.0, 
    -1.0,-1.0, 1.0, r, g, b, a, 0.0,-1.0, 0.0, 1.0, 0.0, 
    // v4-v7-v6-v5 back
     1.0,-1.0,-1.0, r, g, b, a, 0.0, 0.0,-1.0, 1.0, 1.0, 
    -1.0,-1.0,-1.0, r, g, b, a, 0.0, 0.0,-1.0, 0.0, 1.0, 
    -1.0, 1.0,-1.0, r, g, b, a, 0.0, 0.0,-1.0, 0.0, 0.0, 
     1.0, 1.0,-1.0, r, g, b, a, 0.0, 0.0,-1.0, 1.0, 0.0 
  ]); 
   return vertices; 
}


// specifies vertices for a sphere of a certain color
// sphere generation algorithm from matsuda -----------------------------------
function makeSphere(r,g,b,a) 
{ 
    var i, ai, si, ci;
    var j, aj, sj, cj;
    var p1, p2;

    var vert = [];

    // Generate coordinates
    for (j = 0; j <= SPHERE_DIV; j++) 
    {
        aj = j * Math.PI / SPHERE_DIV;
        sj = Math.sin(aj);
        cj = Math.cos(aj);
        for (i = 0; i <= SPHERE_DIV; i++) 
        {
            ai = i * 2 * Math.PI / SPHERE_DIV;
            si = Math.sin(ai);
            ci = Math.cos(ai);

            //x, y, z, r, g, b, a, nx, ny, nz, //u, v
            vert.push(si * sj);  // X
            vert.push(cj);       // Y
            vert.push(ci * sj);  // Z
            vert.push(r);
            vert.push(g);
            vert.push(b);
            vert.push(a);
            vert.push(si * sj);  // X (reused for normal)
            vert.push(cj);       // Y (reused for normal)
            vert.push(ci * sj);  // Z (reused for normal)
			vert.push(0); //temporary UVs
			vert.push(0); //temporary UVs
        }
    }

    //console.log(vert.length);

    return vert;

}


/*

function makeIco(r,g,b,a)
{
    var atan = Math.atan(1.0/2.0);
    var vertices = new Float32Array(12 * STRIDE);

    // batched by triangles, they have the same normals


    // top face triangles
    for(var i = 0; i < 5; i++)
    {
        // top
        vertices[0] = 0.0;
        vertices[1] = 0.0;
        vertices[2] = 1.0;
        vertices[3] = r;
        vertices[4] = g;
        vertices[5] = b;
        vertices[6] = a;
        vertices[7] = ;
        vertices[8] = ;
        vertices[9] = ;

        // left


        // right

        //normals
        //x = 
        //y = 1-Math.sin(atan)
        //z

      // Calculate cross product of f and up.
      //x = y * Z - z * Y;
      //y = z * X - x * Z;
      //z = x * Y - y * X;

    }

    for(var i = 0; i < 5; i++)
    {

    }

    return vertices;
}

*/

    /*
  // Write the vertex property to buffers (coordinates and normals)
  // Same data can be used for vertex and normal
  // In order to make it intelligible, another buffer is prepared separately
  if (!initArrayBuffer(gl, 'a_Position', new Float32Array(positions), gl.FLOAT, 3)) return -1;
  if (!initArrayBuffer(gl, 'a_Normal', new Float32Array(positions), gl.FLOAT, 3))  return -1;
  
  // Unbind the buffer object
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  // Write the indices to the buffer object
  var indexBuffer = gl.createBuffer();
  if (!indexBuffer) {
    console.log('Failed to create the buffer object');
    return -1;
  }
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

  return indices.length;
    */
