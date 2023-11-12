<script lang="ts">
	import { enhance } from '$app/forms'
	import { App } from '$lib/app'
	import AdSense, { Ads } from '$lib/components/ad_sense.svelte'
	import LoadingIcon from '$lib/components/icons/loading_icon.svelte'
	import NProgress from 'nprogress'
	import 'nprogress/nprogress.css'
	import type { ActionData, PageData } from './$types'

	export let data: PageData
	export let form: ActionData

	let ip_address = ''
	let is_sending = false

	function copy_client_ip_address(): void {
		ip_address = data.client_ip
	}

	function on_submit(): void {
		is_sending = true
	}

	$: {
		if (form) is_sending = false
	}

	NProgress.configure({ showSpinner: false })

	$: {
		if (is_sending) {
			NProgress.start()
		} else {
			NProgress.done()
		}
	}
</script>

<svelte:head>
	<title>{App.app_name}</title>
</svelte:head>

<h1>{App.app_name}</h1>

<AdSense ad={Ads.display_1} />

<form method="POST" use:enhance on:submit={on_submit}>
	<div class="flex flex-col gap-4">
		<div class="flex flex-row items-center justify-center gap-4">
			Client IP: {data.client_ip}
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
		<button data-testid="submit-button" class="variant-ghost-primary btn" disabled={is_sending}>
			{#if is_sending}
				<div class="w-6 animate-spin">
					<LoadingIcon />
				</div>
			{:else}
				Submit
			{/if}
		</button>
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

<AdSense ad={Ads.display_2} />
