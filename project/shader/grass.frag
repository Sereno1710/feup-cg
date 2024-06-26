#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform sampler2D uSampler2;

void main() {
    vec4 color = texture2D(uSampler, vTextureCoord+vec2(0.005, 0.005));
    vec4 filter = texture2D(uSampler2, vec2(0.0,0.1) + vTextureCoord);
    gl_FragColor = mix(color,filter,0.05);
}