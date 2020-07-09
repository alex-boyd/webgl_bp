/*

cube.js
webgl boilerplate 

draws cubes

functions take input in the form of a prepacked array.
vertices are entered sequentially in the following format:
x, y, z, r, g, b, a, nx, ny, nz, //u, v

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

function makeCube(r, g, b, a)
{
  var vertices = new Float32Array([
    // v0-v1-v2-v3 front
     1.0, 1.0, 1.0, r, g, b, a, 0.0, 0.0, 1.0, //1.0, 1.0,
    -1.0, 1.0, 1.0, r, g, b, a, 0.0, 0.0, 1.0, //0.0, 1.0,
    -1.0,-1.0, 1.0, r, g, b, a, 0.0, 0.0, 1.0, //0.0, 0.0,
     1.0,-1.0, 1.0, r, g, b, a, 0.0, 0.0, 1.0, //1.0, 0.0,
    // v0-v3-v4-v5 right
     1.0, 1.0, 1.0, r, g, b, a, 1.0, 0.0, 0.0, //1.0, 1.0,
     1.0,-1.0, 1.0, r, g, b, a, 1.0, 0.0, 0.0, //0.0, 1.0,
     1.0,-1.0,-1.0, r, g, b, a, 1.0, 0.0, 0.0, //0.0, 0.0, 
     1.0, 1.0,-1.0, r, g, b, a, 1.0, 0.0, 0.0, //1.0, 0.0, 
    // v0-v5-v6-v1 up
     1.0, 1.0, 1.0, r, g, b, a, 0.0, 1.0, 0.0, //1.0, 1.0, 
     1.0, 1.0,-1.0, r, g, b, a, 0.0, 1.0, 0.0, //0.0, 1.0, 
    -1.0, 1.0,-1.0, r, g, b, a, 0.0, 1.0, 0.0, //0.0, 0.0, 
    -1.0, 1.0, 1.0, r, g, b, a, 0.0, 1.0, 0.0, //1.0, 0.0, 
    // v1-v6-v7-v2 left
    -1.0, 1.0, 1.0, r, g, b, a,-1.0, 0.0, 0.0, //1.0, 1.0, 
    -1.0, 1.0,-1.0, r, g, b, a,-1.0, 0.0, 0.0, //0.0, 1.0, 
    -1.0,-1.0,-1.0, r, g, b, a,-1.0, 0.0, 0.0, //0.0, 0.0, 
    -1.0,-1.0, 1.0, r, g, b, a,-1.0, 0.0, 0.0, //1.0, 0.0, 
    // v7-v4-v3-v2 down
    -1.0,-1.0,-1.0, r, g, b, a, 0.0,-1.0, 0.0, //1.0, 1.0, 
     1.0,-1.0,-1.0, r, g, b, a, 0.0,-1.0, 0.0, //0.0, 1.0, 
     1.0,-1.0, 1.0, r, g, b, a, 0.0,-1.0, 0.0, //0.0, 0.0, 
    -1.0,-1.0, 1.0, r, g, b, a, 0.0,-1.0, 0.0, //1.0, 0.0, 
    // v4-v7-v6-v5 back
     1.0,-1.0,-1.0, r, g, b, a, 0.0, 0.0,-1.0, //1.0, 1.0, 
    -1.0,-1.0,-1.0, r, g, b, a, 0.0, 0.0,-1.0, //0.0, 1.0, 
    -1.0, 1.0,-1.0, r, g, b, a, 0.0, 0.0,-1.0, //0.0, 0.0, 
     1.0, 1.0,-1.0, r, g, b, a, 0.0, 0.0,-1.0, //1.0, 0.0 
  ]); 
   return vertices; 
}

function drawCube(gl, modelMatrix, viewMatrix, index)
{
    var i = index * 24;

    var newI = new Uint8Array
    ([
         i+0, i+1, i+2,   i+0, i+2, i+3,    // front
         i+4, i+5, i+6,   i+4, i+6, i+7,    // right
         i+8, i+9,i+10,   i+8,i+10,i+11,    // up
        i+12,i+13,i+14,  i+12,i+14,i+15,    // left
        i+16,i+17,i+18,  i+16,i+18,i+19,    // down
        i+20,i+21,i+22,  i+20,i+22,i+23     // back
    ]);

    // Write the indices to the buffer object
    var indexBuffer = gl.createBuffer();
    if (!indexBuffer) 
    {
        console.log('Failed to create the buffer object');
        return false;
    }
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, newI, gl.STATIC_DRAW);

    // assign to variable
    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, FSIZE * STRIDE, (/*offset*/0 + 0) * FSIZE);
    gl.vertexAttribPointer(a_Color, 4, gl.FLOAT, false, FSIZE * STRIDE, (/*offset*/0 + 3) * FSIZE);
    gl.vertexAttribPointer(a_Normal, 3, gl.FLOAT, false, FSIZE * STRIDE, (/*offset*/0 + 7) * FSIZE);
//    gl.vertexAttribPointer(a_TexCoord, 2, gl.FLOAT, false, FSIZE * STRIDE, (/*offset*/0 + 10) * FSIZE);

    // 5. enable assignment or attribute variable
    gl.enableVertexAttribArray(a_Position);
    gl.enableVertexAttribArray(a_Color);
    gl.enableVertexAttribArray(a_Normal);
//    gl.enableVertexAttribArray(a_TexCoord);

    // Pass the matrix to transform the normal based on the model matrix to u_NormalMatrix
    var normalMatrix = new Matrix4();
    normalMatrix.setInverseOf(modelMatrix);
    normalMatrix.transpose();

    var mvpMatrix = new Matrix4();
    mvpMatrix.set(viewMatrix);
    mvpMatrix.multiply(modelMatrix);
    //no projection yet :)

    gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
    gl.uniformMatrix4fv(u_MvpMatrix, false, mvpMatrix.elements);
    gl.uniformMatrix4fv(u_NormalMatrix, false, normalMatrix.elements);

    //gl.drawElements(mode, count, type, offset);
    gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_BYTE, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    gl.deleteBuffer(indexBuffer);

}

