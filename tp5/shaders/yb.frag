#ifdef GL_ES
precision highp float;
#endif

varying vec4 coords;
varying vec4 normal;

void main() {
	if (coords.z > 20.0)
		gl_FragColor = vec4(1.0,1.0,0.0, 1.0);
	else
	{
		gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);
	}
}