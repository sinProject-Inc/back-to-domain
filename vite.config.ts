import { sveltekit } from '@sveltejs/kit/vite'
import { SvelteKitPWA } from '@vite-pwa/sveltekit'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	plugins: [
		sveltekit(),
		SvelteKitPWA({
			manifest: {
				name: 'sinpro-template-for-sveltekit',
				short_name: 'template',
				description: 'Template App description',
				theme_color: '#ffffff',
				icons: [
					{
						src: 'icon-512.png',
						sizes: '512x512',
						type: 'image/png',
					},
				],
			},
		}),
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
		coverage: {
			all: true,
			include: ['src/**/*.ts'],
			exclude: [
				'src/**/+*.ts',
				'src/app.d.ts',
				'src/hooks.server.ts',
				'src/scripts/create_git_branch.ts',
				'src/types/*',
			],
			reporter: ['lcov', 'text'],
		},
	},
})
