<script>
	import { version } from '$app/environment'
	import { App } from '$lib/app'
	import { pwaInfo } from 'virtual:pwa-info'
	import '../app.css'

	$: web_manifest_link = pwaInfo ? pwaInfo.webManifest.linkTag : ''

	/* eslint-disable svelte/no-at-html-tags */
</script>

<svelte:head>
	{@html web_manifest_link}
</svelte:head>

<div class="m-4 flex flex-col gap-4 text-center">
	<slot />
	{App.copyright} v{version}
</div>

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.gray.100);
	}
</style>
