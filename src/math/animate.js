/*

animate.js
webgl boilerplate 

returns current keyframe angle

*/


// Rotation angle (degrees/second)
var ANGLE_STEP = 15.0;
//var frame = 0;
// Last time that this function was called
var g_last = Date.now();
function animate(angle) 
{
  // Calculate the elapsed time
  var now = Date.now();
  var elapsed = now - g_last;
  g_last = now;
  // Update the current rotation angle (adjusted by the elapsed time)
  var newAngle = angle + (ANGLE_STEP * elapsed) / 1000.0;
  return newAngle %= 360;
}
