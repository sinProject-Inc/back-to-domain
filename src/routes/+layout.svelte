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

<div class="mx-auto flex max-w-2xl flex-col gap-4 p-4 text-center">
	<slot />
	<div title="Copyright">
		{App.copyright}
		{App.app_name} v{version}
	</div>
</div>

<style lang="postcss">
</style>
