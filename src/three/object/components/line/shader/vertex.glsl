// 顶点着色器
attribute float a_position;

uniform float u_precentage;
uniform float u_size;
uniform float u_range;
uniform float u_total;

varying float v_opacity;

void main(){
  float size=u_size;
  float total_number=u_total*mod(u_precentage,1.);
  
  if(total_number>a_position&&total_number<a_position+u_range){
    
    // 拖尾效果
    float index=(a_position+u_range-total_number)/u_range;
    size*=index;
    
    v_opacity=1.;
  }else{
    v_opacity=0.;
  }
  
  gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);
  gl_PointSize=size/10.;
}
