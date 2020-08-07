/*

bind.js
webgl boilerplate 

passes vertices to the webgl context to prepare for a draw call

functions take input in the form of a prepacked array.
vertices are entered sequentially in the following format:
x, y, z, r, g, b, a, nx, ny, nz, u, v

*/

var STRIDE = 10;
var FSIZE; 
var ISIZE; 
var u_ModelMatrix;
var u_ViewMatrix
var u_vViewMatrix
var u_MvpMatrix;
var u_NormalMatrix;
var a_Position;
var a_Color;
var a_Normal;
var u_AmbientLight;
var u_LightColor;
var u_LightPosition;
var u_mode;
var a_TexCoord;
var u_Sampler;

function bind(gl, vertices)
{
    FSIZE = vertices.BYTES_PER_ELEMENT;

    // 1. create buffer object
    var vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) 
    {
        console.log("Failed to create buffer object.");
        return -1;
    }

    // 2. bind buffer to target
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

    // 3. write data to buffer
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    // 4. get pointer to variables

    // Get the storage locations of uniform variables and so on
    u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
    u_mode = gl.getUniformLocation(gl.program, 'u_mode');
    u_MvpMatrix = gl.getUniformLocation(gl.program, 'u_MvpMatrix');
    u_NormalMatrix = gl.getUniformLocation(gl.program, 'u_NormalMatrix');
    u_LightColor = gl.getUniformLocation(gl.program, 'u_LightColor');
    u_LightPosition = gl.getUniformLocation(gl.program, 'u_LightPosition');
    u_AmbientLight = gl.getUniformLocation(gl.program, 'u_AmbientLight');
    u_ViewMatrix = gl.getUniformLocation(gl.program, 'u_fViewMatrix');
    u_vViewMatrix = gl.getUniformLocation(gl.program, 'u_vViewMatrix');
	u_Sampler = gl.getUniformLocation(gl.program, "u_Sampler0");
    if (!u_MvpMatrix || !u_NormalMatrix || !u_ViewMatrix || !u_LightColor || !u_Sampler || !u_LightPosition　|| !u_AmbientLight) 
    { 
        console.log('Failed to get the storage location');
        return;
    }

    a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if (a_Position < 0) 
    {
        console.log('Failed to get the storage location of a_Position');
        return -1;
    }

    a_Color = gl.getAttribLocation(gl.program, 'a_Color');
    if (a_Color < 0) 
    {
        console.log('Failed to get the storage location of a_Color');
        return -1;
    }

    a_Normal = gl.getAttribLocation(gl.program, 'a_Normal');
    if (a_Normal < 0) 
    {
        console.log('Failed to get the storage location of a_Normal');
        return -1;
    }

    a_TexCoord = gl.getAttribLocation(gl.program, 'a_TexCoord');
    if (a_TexCoord < 0) 
    {
        console.log('Failed to get the storage location of a_TexCoord');
        return -1;
    }

    // Set the light color (white)
    gl.uniform3f(u_LightColor, 1.0, 1.0, 0.3);
    // Set the light direction (in the world coordinate)
    //gl.uniform3f(u_LightPosition, -0.35, 0.6, -0.20);

    // Set the ambient light
    gl.uniform3f(u_AmbientLight, 0.4, 0.4, 0.6);

    gl.uniform1i(u_mode, 0);

    // set texture
    gl.uniform1i(u_Sampler, 0);

    // Unbind the buffer object when finished
    //gl.bindBuffer(gl.ARRAY_BUFFER, null);

    /*
    // Write the indices to the buffer object
    var indexBuffer = gl.createBuffer();
    if (!indexBuffer) 
    {
        console.log('Failed to create the buffer object');
        return false;
    }
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
    */
}
