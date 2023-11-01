<script lang="ts">
	import { App } from '$lib/app'
	import type { PageData } from './$types'

	export let data: PageData

	let ip_address = data.client_address
	let host_name = 'aaaa.bbb.ccc.co.jp'
</script>

<svelte:head>
	<title>{App.app_name}</title>
</svelte:head>

<h1>{App.app_name}</h1>

<input class="input text-center" type="text" value={ip_address} placeholder="Enter IP Address" />
<button type="button" class="variant-ghost-primary btn">Submit</button>
<div>{host_name}</div>
