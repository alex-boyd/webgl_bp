/*

scene.js
webgl boilerplate 

a webgl scene. contains actors and textures.

*/

function Scene(gl_)
{
    this.gl = gl_;
    this.textures = null;
    this.meshes = null;
    this.frame = 0.0;
    this.heirarchy = new Actor(); 
    this.viewMatrix = new Matrix4();
    this.projectionMatrix = new Matrix4();

    this.rotationSliderValue = 0.0;

    this.turnDelta = 0.1;
    this.rotateDelta = 5.0;

	// look at functions from matsuda library
	/**
	 * Multiply the viewing matrix from the right.
	 * @param eyeX, eyeY, eyeZ The position of the eye point.
	 * @param centerX, centerY, centerZ The position of the reference point.
	 * @param upX, upY, upZ The direction of the up vector.
	 * @return this
	 */
    //Matrix4.prototype.lookAt = function(eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ) {
    this.cameraPosition = new Vector();
    this.cameraTarget = new Vector();
    this.cameraUp = new Vector();
    this.cameraUp.set(0.0,1.0,0.0); 
    this.cameraPosition.set(0.0,0.5,0.0); 
    this.cameraTarget.set(1.0,0.5,-1.0); 
	// set perspective function from matsuda library
	/**
	 * Set the perspective projection matrix by fovy and aspect.
	 * @param fovy The angle between the upper and lower sides of the frustum.
	 * @param aspect The aspect ratio of the frustum. (width/height)
	 * @param near The distances to the nearer depth clipping plane. This value must be plus value.
	 * @param far The distances to the farther depth clipping plane. This value must be plus value.
	 * @return this
	 */
    // perspective stays fixed
    this.projectionMatrix.setPerspective(70, 1, 1, 10);

}

Scene.prototype.turnCamera = function()
{
//    this.viewMatrix.lookAt(this.cameraPosition.x, this.cameraPosition.y, this.cameraPosition.z, 
}

Scene.prototype.moveCamera = function()
{
}


Scene.prototype.updateSlider = function(val)
{
    this.rotationSliderValue = val;
}


Scene.prototype.draw = function()
{
    this.viewMatrix.setRotate(-15,1,0,0); // tilt down at scene
    this.viewMatrix.rotate(this.rotationSliderValue,0,1,0);

    gl.uniformMatrix4fv(u_ViewMatrix, false, this.viewMatrix.elements);
    gl.uniformMatrix4fv(u_vViewMatrix, false, this.viewMatrix.elements);

    var temp = new Float32Array([0,1.0,0]);
    var temp2 = new Vector3(temp);
    var lightMatrix = new Matrix4();
    lightMatrix.rotate(this.frame,0,0,1);
    var temp3 = lightMatrix.multiplyVector3(temp2);

    // Set the light direction (in the world coordinate)
    gl.uniform3f(u_LightPosition, temp3.elements[0], temp3.elements[1], temp3.elements[2]);

    this.heirarchy.draw(this.heirarchy.position, this.heirarchy.scale, this.heirarchy.rotation);
}
