/*

shaders.js
webgl boilerplate 

specifies shaders for all geometry. uses point lighting from matsuda.

*/

//0 = main, 1 = normals, 2 = no lights
function reloadShaders(prog)
{
    gl.uniform1i(u_mode, prog);
}

// shaders  -------------------------------------------------------------------

var VSHADER_SOURCE_MAIN =
  'attribute vec4 a_Position;\n' +
  'attribute vec4 a_Color;\n' +
  'attribute vec4 a_Normal;\n' +
//  'attribute vec2 a_TexCoord;\n' +

  'varying vec4 v_Color;\n' +
  'varying vec3 v_Normal;\n' +
  'varying vec3 v_Position;\n' +
//  'varying vec2 v_TexCoord;\n' +

  'uniform mat4 u_MvpMatrix;\n' +
  'uniform mat4 u_vViewMatrix;\n' +
  'uniform mat4 u_ModelMatrix;\n' +    // Model matrix
  'uniform mat4 u_NormalMatrix;\n' +   // Coordinate transformation matrix of the normal
//  'uniform vec3 u_LightColor;\n' +     // Light color
//  'uniform vec3 u_LightPosition;\n' +  // Position of the light source
//  'uniform vec3 u_AmbientLight;\n' +   // Ambient light color

    

  'void main() {\n' +
//  '  mat4 modelViewMatrix = u_vViewMatrix * u_ModelMatrix;\n' +
  '  gl_Position = u_MvpMatrix * a_Position;\n' +
//  '  v_Position = vec3(u_ModelMatrix * a_Position);\n' +
//  '  v_Position = vec3(modelViewMatrix * a_Position);\n' +
  '  v_Position = vec3(u_MvpMatrix * a_Position);\n' +
//  '  v_Normal = normalize( vec3(modelViewMatrix * a_Normal));\n' + 
  '  v_Normal = normalize(vec3(u_NormalMatrix * a_Normal));\n' +
//  '  v_Normal = normalize( vec3( mat3(u_MvpMatrix) * vec3(a_Normal)));\n' + 
  '  v_Color = a_Color;\n' + 

  '}\n';

    /*


  'void main() {\n' +
  '  mat4 modelViewMatrix = u_viewMatrix * u_modelMatrix;\n' +
  '  v_Position = modelViewMatrix * a_Position;\n' +
  '  gl_Position = u_perspectiveMatrix * v_Position;\n' +
  '  v_Normal = normalize( mat3(modelViewMatrix) * a_Normal);\n' + 
  '}\n';

  'void main() {\n' +


//  '  mat4 modelViewMatrix = u_viewMatrix * u_modelMatrix;\n' +
//  '  v_Position = modelViewMatrix * a_Position;\n' +
  '  v_Position = u_MvpMatrix * a_Position;\n' +
  '  gl_Position = u_perspectiveMatrix * v_Position;\n' +
  '  v_Normal = normalize( mat3(modelViewMatrix) * a_Normal);\n' + 
  '}\n';
  */


// Fragment shader program
var FSHADER_SOURCE_MAIN =
  '#ifdef GL_ES\n' +
  'precision mediump float;\n' +
  '#endif\n' +

//  'uniform sampler2D u_Sampler0;\n' +
//  'varying vec2 v_TexCoord;\n' +
  'varying vec4 v_Color;\n' +
  'varying vec3 v_Normal;\n' +
  'varying vec3 v_Position;\n' +

  'uniform mat4 u_fViewMatrix;\n' +
  'uniform int u_mode;\n' +   

  'uniform vec3 u_LightColor;\n' +     // Light color
  'uniform vec3 u_LightPosition;\n' +  // Position of the light source
  'uniform vec3 u_AmbientLight;\n' +   // Ambient light color

  'void main() {\n' +

     // Normalize the normal because it is interpolated and not 1.0 in length any more
  '  vec3 normal = normalize(v_Normal);\n' +
     // Calculate the light direction and make it 1.0 in length
  '  vec3 lightDirection = normalize(u_LightPosition - v_Position);\n' +
     // The dot product of the light direction and the normal
  '  float nDotL = max(dot(lightDirection, normal), 0.0);\n' +
     // Calculate the final color from diffuse reflection and ambient reflection
  '  vec3 diffuse = u_LightColor * v_Color.rgb * nDotL;\n' +
  '  vec3 ambient = u_AmbientLight * v_Color.rgb;\n' +

  '  vec3 lightPosition = vec3(u_fViewMatrix * vec4(u_LightPosition, 1)) - v_Position;\n' +
//  '  vec3 lightPosition = vec3(u_fViewMatrix * vec4(u_lightPosition, 1) - v_Position);\n' +
  '  vec3 lightDir = normalize(lightPosition);\n' +
  '  float lightDist = length(lightPosition);\n' +

  '  float specular = 0.0;\n' +
  '  float specularAmplitude = 0.5;\n' +
  '  float shine = 32.0;\n' +
//  '  float d = max(dot(normal, lightDir), 0.0);\n' +
  '  if (nDotL > 0.0) {\n' +
//  '    vec3 viewVec = vec3(0,0,1.0);\n' +
  '    vec3 viewVec = normalize(-v_Position);\n' +
  '    vec3 reflectVec = reflect(-lightDir, normal);\n' +
  '    specular = specularAmplitude * pow(max(dot(reflectVec, viewVec), 0.0), shine);\n' +
  '  }\n' +

  '  if (u_mode == 0) {\n' +
  '  gl_FragColor = vec4(diffuse + ambient + specular, v_Color.a);\n' +
    //  '  gl_FragColor.rgb = vec3(0.1,0.1,0.1) + vec3(0.4, 0.4, 0.4) * d + specular;\n' +
    //  '  gl_FragColor.a = 1.0;\n' +
    //  '  gl_FragColor = vec4(diffuse + ambient , v_Color.a);\n' +
  '  }\n' + 
  '  if (u_mode == 1) {\n' +
  '    gl_FragColor = vec4(v_Normal, 1);\n' +
  '  }\n' + 
  '  if (u_mode == 2) {\n' +
  '    gl_FragColor = v_Color;\n' +
  '  }\n' + 
  '}\n';


// snippets -------------------------------------------------------------------


/*

// Specular.js 2013 (c) matsuda
  'void main() {\n' +
  '  vec3 normal = normalize(v_Normal);\n' +
  '  vec3 lightPosition = vec3(u_fViewMatrix * vec4(u_lightPosition, 1) - v_Position);\n' +
  '  vec3 lightDir = normalize(lightPosition);\n' +
  '  float lightDist = length(lightPosition);\n' +

  '  float specular = 0.0;\n' +
  '  float d = max(dot(v_Normal, lightDir), 0.0);\n' +
  '  if (d > 0.0) {\n' +
  '    vec3 viewVec = vec3(0,0,1.0);\n' +
  '    vec3 reflectVec = reflect(-lightDir, normal);\n' +
  '    specular = pow(max(dot(reflectVec, viewVec), 0.0), 120.0);\n' +
  '  }\n' +
  '  gl_FragColor.rgb = vec3(0.1,0.1,0.1) + vec3(0.4, 0.4, 0.4) * d + specular;\n' +
  '  gl_FragColor.a = 1.0;\n' +
  '}\n';


// PointLightedCube_perFragment.js (c) 2012 matsuda and kanda
// Vertex shader program
var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
   //  'attribute vec4 a_Color;\n' + // Defined constant in main()
  'attribute vec4 a_Normal;\n' +
  'uniform mat4 u_MvpMatrix;\n' +
  'uniform mat4 u_ModelMatrix;\n' +    // Model matrix
  'uniform mat4 u_NormalMatrix;\n' +   // Transformation matrix of the normal
  'varying vec4 v_Color;\n' +
  'varying vec3 v_Normal;\n' +
  'varying vec3 v_Position;\n' +
  'void main() {\n' +
  '  vec4 color = vec4(1.0, 1.0, 1.0, 1.0);\n' + // Sphere color
  '  gl_Position = u_MvpMatrix * a_Position;\n' +
     // Calculate the vertex position in the world coordinate
  '  v_Position = vec3(u_ModelMatrix * a_Position);\n' +
  '  v_Normal = normalize(vec3(u_NormalMatrix * a_Normal));\n' +
  '  v_Color = color;\n' + 
  '}\n';

// Fragment shader program
var FSHADER_SOURCE =
  '#ifdef GL_ES\n' +
  'precision mediump float;\n' +
  '#endif\n' +
  'uniform vec3 u_LightColor;\n' +     // Light color
  'uniform vec3 u_LightPosition;\n' +  // Position of the light source
  'uniform vec3 u_AmbientLight;\n' +   // Ambient light color
  'varying vec3 v_Normal;\n' +
  'varying vec3 v_Position;\n' +
  'varying vec4 v_Color;\n' +
  'void main() {\n' +
     // Normalize the normal because it is interpolated and not 1.0 in length any more
  '  vec3 normal = normalize(v_Normal);\n' +
     // Calculate the light direction and make it 1.0 in length
  '  vec3 lightDirection = normalize(u_LightPosition - v_Position);\n' +
     // The dot product of the light direction and the normal
  '  float nDotL = max(dot(lightDirection, normal), 0.0);\n' +
     // Calculate the final color from diffuse reflection and ambient reflection
  '  vec3 diffuse = u_LightColor * v_Color.rgb * nDotL;\n' +
  '  vec3 ambient = u_AmbientLight * v_Color.rgb;\n' +
  '  gl_FragColor = vec4(diffuse + ambient, v_Color.a);\n' +
  '}\n';


// Specular.js 2013 (c) matsuda
// Vertex shader program
var VSHADER_SOURCE =
  'uniform mat4 u_perspectiveMatrix;\n' +
  'uniform mat4 u_modelMatrix;\n' +
  'uniform mat4 u_viewMatrix;\n' +

  'attribute vec4 a_Position;\n' +
  'attribute vec3 a_Normal;\n' +

  'varying vec4 v_Position;\n' +
  'varying vec3 v_Normal;\n' +

  'void main() {\n' +
  '  mat4 modelViewMatrix = u_viewMatrix * u_modelMatrix;\n' +
  '  v_Position = modelViewMatrix * a_Position;\n' +
  '  gl_Position = u_perspectiveMatrix * v_Position;\n' +
  '  v_Normal = normalize( mat3(modelViewMatrix) * a_Normal);\n' + 
  '}\n';

// Fragment shader program
var FSHADER_SOURCE =
  '#ifdef GL_ES\n' +
  'precision mediump float;\n' +
  '#endif\n' +
  'uniform mat4 u_fViewMatrix;\n' +
  'uniform vec3 u_lightPosition;\n' +

  'varying vec4 v_Position;\n' +
  'varying vec3 v_Normal;\n' +
  'void main() {\n' +
  '  vec3 normal = normalize(v_Normal);\n' +
  '  vec3 lightPosition = vec3(u_fViewMatrix * vec4(u_lightPosition, 1) - v_Position);\n' +
  '  vec3 lightDir = normalize(lightPosition);\n' +
  '  float lightDist = length(lightPosition);\n' +

  '  float specular = 0.0;\n' +
  '  float d = max(dot(v_Normal, lightDir), 0.0);\n' +
  '  if (d > 0.0) {\n' +
  '    vec3 viewVec = vec3(0,0,1.0);\n' +
  '    vec3 reflectVec = reflect(-lightDir, normal);\n' +
  '    specular = pow(max(dot(reflectVec, viewVec), 0.0), 120.0);\n' +
  '  }\n' +
  '  gl_FragColor.rgb = vec3(0.1,0.1,0.1) + vec3(0.4, 0.4, 0.4) * d + specular;\n' +
  '  gl_FragColor.a = 1.0;\n' +
  '}\n';












// MultiTexture.js (c) 2012 matsuda and kanda
// Vertex shader program
var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'attribute vec2 a_TexCoord;\n' +
  'varying vec2 v_TexCoord;\n' +
  'void main() {\n' +
  '  gl_Position = a_Position;\n' +
  '  v_TexCoord = a_TexCoord;\n' +
  '}\n';

// Fragment shader program
var FSHADER_SOURCE =
  '#ifdef GL_ES\n' +
  'precision mediump float;\n' +
  '#endif\n' +
  'uniform sampler2D u_Sampler0;\n' +
  'uniform sampler2D u_Sampler1;\n' +
  'varying vec2 v_TexCoord;\n' +
  'void main() {\n' +
  '  vec4 color0 = texture2D(u_Sampler0, v_TexCoord);\n' +
  '  vec4 color1 = texture2D(u_Sampler1, v_TexCoord);\n' +
  '  gl_FragColor = color0 * color1;\n' +
  '}\n';




    /*   /// old main for vertex shader
  'void main() {\n' +
  '  gl_Position = u_MvpMatrix * a_Position;\n' +
     // Recalculate the normal based on the model matrix and make its length 1.
  '  vec3 normal = normalize(vec3(u_NormalMatrix * a_Normal));\n' +
     // Calculate world coordinate of vertex
  '  vec4 vertexPosition = u_ModelMatrix * a_Position;\n' +
     // Calculate the light direction and make it 1.0 in length
  '  vec3 lightDirection = normalize(u_LightPosition  - vec3(vertexPosition));\n' +
     // Calculate the dot product of the normal and light direction
  '  float nDotL = max(dot(normal, lightDirection), 0.0);\n' +
     // Calculate the color due to diffuse reflection
  '  vec3 diffuse = u_LightColor * a_Color.rgb * nDotL;\n' +
     // Calculate the color due to ambient reflection
  '  vec3 ambient = u_AmbientLight * a_Color.rgb;\n' +
     // Add the surface colors due to diffuse reflection and ambient reflection
  '  v_Color = vec4(diffuse + ambient, a_Color.a);\n' + 
  '  v_Position = vec3(u_ModelMatrix * a_Position);\n' +
  '  v_Normal = normalize(vec3(u_NormalMatrix * a_Normal));\n' +
//  '  v_TexCoord = a_TexCoord;\n' + 
  '}\n';
  */


    /* // old main of frag shader
  'void main() {\n' +
  '  vec4 color0 = texture2D(u_Sampler0, v_TexCoord);\n' +
  '  gl_FragColor = v_Color * color0;\n' +
//  '  gl_FragColor = v_Color;\n' +
//  '  gl_FragColor = vec4(v_TexCoord, 1, 1);\n' +

  '}\n';
  */



