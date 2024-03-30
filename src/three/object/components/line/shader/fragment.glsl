// 片元着色器
uniform vec3 u_color;
varying float v_opacity;

void main(){
  gl_FragColor=vec4(u_color,v_opacity);
}
