attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform float timeFactor;
uniform float angle;
uniform sampler2D uSampler;
uniform sampler2D uSampler2;
varying vec2 vTextureCoord;

void main() {
	vTextureCoord = aTextureCoord;
	vec3 offset = sin(angle) * aVertexNormal * 0.1 * texture2D(uSampler, vTextureCoord + vec2(0.1*timeFactor, 0.1*timeFactor)).b;
	vec3 offset1 = cos(angle) * aVertexNormal * 0.5 * texture2D(uSampler2, vTextureCoord + vec2(0.5*timeFactor,0.5*timeFactor)).b;
	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset+ offset1, 1.0);
}