<script lang="ts">
	import { enhance } from '$app/forms'
	import { App } from '$lib/app'
	import type { ActionData, PageData } from './$types'

	export let data: PageData
	export let form: ActionData

	let ip_address: string

	function copy_client_ip_address(): void {
		ip_address = data.client_address
	}
</script>

<svelte:head>
	<title>{App.app_name}</title>
</svelte:head>

<h1>{App.app_name}</h1>

<form method="POST" use:enhance>
	<div class="flex flex-col gap-4">
		<div class="flex flex-row items-center justify-center gap-4">
			Client IP Address: {data.client_address}
			<button type="button" class="variant-ghost-primary btn" on:click={copy_client_ip_address}
				>Copy</button
			>
		</div>

		<input
			data-testid="enter-ip-address"
			class="input text-center"
			type="text"
			name="ip_address"
			bind:value={ip_address}
			placeholder="Enter IP Address"
		/>
		<button class="variant-ghost-primary btn">Submit</button>
	</div>
</form>

{#if form?.error}
	<div title="Error">{form?.error}</div>
{/if}

{#if form?.ip_address}
	<div title="IP Address">IP Address: {form?.ip_address}</div>
{/if}

{#if form?.fqdn}
	<div title="FQDN">FQDN: {form?.fqdn}</div>
{/if}

{#if form?.whois}
	<div>Whois:</div>
	<div class="flex justify-center">
		<div class="text-start text-xs"><pre title="Whois" data-testid="whois">{form?.whois}</pre></div>
	</div>
{/if}
