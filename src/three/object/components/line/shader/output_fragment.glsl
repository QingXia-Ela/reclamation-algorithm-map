#ifdef OPAQUE
diffuseColor.a=1.;
#endif
// https://github.com/mrdoob/three.js/pull/22425
#ifdef USE_TRANSMISSION
diffuseColor.a*=transmissionAlpha+.1;
#endif
// 设置透明度变化
float r=distance(gl_PointCoord,vec2(.5,.5));
// diffuseColor.a = diffuseColor.a*(1.0 - r/0.5);//透明度线性变化
diffuseColor.a=diffuseColor.a*pow(1.-r/.5,6.);//透明度非线性变化  参数2越大，gl_PointSize要更大，可以直接设置着色器代码，可以设置材质size属性
gl_FragColor=vec4(outgoingLight,diffuseColor.a);