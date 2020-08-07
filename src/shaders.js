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
  'attribute vec2 a_TexCoord;\n' +

  'varying vec4 v_Color;\n' +
  'varying vec3 v_Normal;\n' +
  'varying vec3 v_Position;\n' +
  'varying vec2 v_TexCoord;\n' +

  'uniform mat4 u_MvpMatrix;\n' +
  'uniform mat4 u_vViewMatrix;\n' +
  'uniform mat4 u_ModelMatrix;\n' +    // Model matrix
  'uniform mat4 u_NormalMatrix;\n' +   // Coordinate transformation matrix of the normal

  'void main() {\n' +
  '  gl_Position = u_MvpMatrix * a_Position;\n' +
  '  v_Position = vec3(u_MvpMatrix * a_Position);\n' +
  '  v_Normal = normalize(vec3(u_NormalMatrix * a_Normal));\n' +
  '  v_Color = a_Color;\n' + 
  '  v_TexCoord = a_TexCoord;\n' + 

  '}\n';


// Fragment shader program
var FSHADER_SOURCE_MAIN =
  '#ifdef GL_ES\n' +
  'precision mediump float;\n' +
  '#endif\n' +

  'uniform sampler2D u_Sampler0;\n' +
  'varying vec2 v_TexCoord;\n' +
  'varying vec4 v_Color;\n' +
  'varying vec3 v_Normal;\n' +
  'varying vec3 v_Position;\n' +

  'uniform mat4 u_fViewMatrix;\n' +
  'uniform int u_mode;\n' +   

  'uniform vec3 u_LightColor;\n' +     // Light color
  'uniform vec3 u_LightPosition;\n' +  // Position of the light source
  'uniform vec3 u_AmbientLight;\n' +   // Ambient light color

  'void main() {\n' +
  '  vec4 tex_Color = texture2D(u_Sampler0, v_TexCoord);\n' +
  '  vec3 normal = normalize(v_Normal);\n' +
  '  vec3 lightDirection = normalize(u_LightPosition - v_Position);\n' +
  '  float nDotL = max(dot(lightDirection, normal), 0.0);\n' +
  '  vec3 diffuse = u_LightColor * v_Color.rgb * tex_Color.rgb * nDotL;\n' +
  '  vec3 ambient = u_AmbientLight * v_Color.rgb;\n' +

  '  vec3 lightPosition = vec3(u_fViewMatrix * vec4(u_LightPosition, 1)) - v_Position;\n' +
  '  vec3 lightDir = normalize(lightPosition);\n' +
  '  float lightDist = length(lightPosition);\n' +

  '  float specular = 0.0;\n' +
  '  float specularAmplitude = 0.5;\n' +
  '  float shine = 32.0;\n' +
  '  if (nDotL > 0.0) {\n' +
  '    vec3 viewVec = normalize(-v_Position);\n' +
  '    vec3 reflectVec = reflect(-lightDir, normal);\n' +
  '    specular = specularAmplitude * pow(max(dot(reflectVec, viewVec), 0.0), shine);\n' +
  '  }\n' +

  '  if (u_mode == 0) {\n' +
  '  gl_FragColor = vec4(diffuse + ambient + specular, v_Color.a);\n' +
  '  }\n' + 
  '  if (u_mode == 1) {\n' +
  '    gl_FragColor = vec4(v_Normal, 1);\n' +
  '  }\n' + 
  '  if (u_mode == 2) {\n' +
  '    gl_FragColor = v_Color;\n' +
  '  }\n' + 
  '}\n';
