#ifdef GL_ES
precision highp float;
#endif

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform float normScale;
uniform float timeFactor;

varying vec4 coords;
varying vec4 normal;

void main() {
    float offset = normScale + sin(timeFactor);
    
    vec4 vertex = vec4(aVertexPosition.x + offset, aVertexPosition.y, aVertexPosition.z, 1.0);
    
    gl_Position = uPMatrix * uMVMatrix * vertex;
    
    coords = gl_Position;
}
