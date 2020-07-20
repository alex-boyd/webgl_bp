/*

sphere.js
webgl boilerplate 

draws spheres 

functions take input in the form of a prepacked array.
vertices are entered sequentially in the following format:
x, y, z, r, g, b, a, nx, ny, nz, //u, v

icosahedron based on
https://www.songho.ca/opengl/gl_sphere.html#icosphere

top
5 top ring
5 bottom ring
bottom

*/

var SPHERE_DIV = 13;

function drawSphere(gl, modelMatrix, viewMatrix, index)
{
    var sphereSize = SPHERE_DIV * SPHERE_DIV * 6;
    var offset = SPHERES_OFFSET + (index * sphereSize); // 13^2 * 6

//    var indices = new Uint8Array(sphereSize);
    var indices = [];

    var actual = 0;

    // Generate indices
    for (j = 0; j < SPHERE_DIV; j++) 
    {
        for (i = 0; i < SPHERE_DIV; i++) 
        {
            p1 = j * (SPHERE_DIV+1) + i;
            p2 = p1 + (SPHERE_DIV+1);

            indices.push(offset + p1);
            indices.push(offset + p2);
            indices.push(offset + p1 + 1);

            indices.push(offset + p1 + 1);
            indices.push(offset + p2);
            indices.push(offset + p2 + 1);
        }
    }

//    console.log(indices.length);


    // Write the indices to the buffer object
    var indexBuffer = gl.createBuffer();
    if (!indexBuffer) 
    {
        console.log('Failed to create the buffer object');
        return false;
    }
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    //gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

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
    //gl.drawElements(gl.TRIANGLES, indices.length/*1960*/, gl.UNSIGNED_BYTE, 0);
    gl.drawElements(gl.TRIANGLES, indices.length/*1960*/, gl.UNSIGNED_SHORT, 0);
  //gl.drawElements(gl.TRIANGLES, n, gl.UNSIGNED_SHORT, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    gl.deleteBuffer(indexBuffer);

}
