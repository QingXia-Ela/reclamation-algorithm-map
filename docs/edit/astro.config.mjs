import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	base: '/reclamation-algorithm-map/docs/edit',
	outDir: "../../dist/docs/edit",
	integrations: [
		starlight({
			title: '生息演算地图制作器使用手册',
			social: {
				github: 'https://github.com/QingXia-Ela/reclamation-algorithm-map',
			},
			sidebar: [
				{
					label: '开始制作地图',
					autogenerate: { directory: 'guides' },
				},
				{
					label: '高级使用',
					autogenerate: { directory: 'advancement' },
				},
				{
					label: '开发者指南',
					autogenerate: { directory: 'dev' },
				},
				{
					label: 'Q&A',
					autogenerate: { directory: 'qa' },
				},
			],
		}),
	],
});
