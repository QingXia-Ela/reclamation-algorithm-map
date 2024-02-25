/**
 * RGB Shift Shader
 * Shifts red and blue channels from center in opposite directions
 * Ported from http://kriss.cx/tom/2009/05/rgb-shift/
 * by Tom Butterworth / http://kriss.cx/tom/
 *
 * amount: shift distance (1 is width of input)
 * angle: shift angle in radians
 */

const BSCShader = {

	uniforms: {

		'tDiffuse': { value: null },
		'_Brightness': { value: 1 },
		'_Saturation': { value: 1 },
		'_Contrast': { value: 1 }

	},

	vertexShader: /* glsl */`
		varying vec2 vUv;
		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,

	fragmentShader: /* glsl */`
		uniform sampler2D tDiffuse;
		uniform float _Brightness;
		uniform float _Saturation;
		uniform float _Contrast;
		varying vec2 vUv;
		vec3 lerpColor(vec3 col1,vec3 col2, float value){
			vec3 newCol = vec3 ((col1.r * (1.0 - value) + col2.r * value), (col1.g * (1.0 - value) + col2.g * value), (col1.b * (1.0 - value) + col2.b * value));
			return newCol;
		}
		float mylerp(float a,float b, float value){
			return (a * (1.0 - value) + b * value);
		}
		void main() {
			// 获取原图的颜色rgba
			vec4 color = texture2D(tDiffuse, vUv);
			//brigtness亮度直接乘以一个系数，也就是RGB整体缩放，调整亮度
			vec3 finalColor = color.rgb * _Brightness;
			//saturation饱和度：首先根据公式计算同等亮度情况下饱和度最低的值：
			float gray = 0.2125 * color.r + 0.7154 * color.g + 0.0721 * color.b;
			vec3 grayColor = vec3(gray, gray, gray);
			//根据Saturation在饱和度最低的图像和原图之间差值
			finalColor = lerpColor(grayColor, finalColor, _Saturation);
			//contrast对比度：首先计算对比度最低的值
			vec3 avgColor = vec3(0.5, 0.5, 0.5);
			//根据Contrast在对比度最低的图像和原图之间差值
			finalColor = lerpColor(avgColor, finalColor, _Contrast);
			// 结果rgb,透明度保持原值即可
			gl_FragColor = vec4(vec3(finalColor), color.a);
		}`

};

export { BSCShader };