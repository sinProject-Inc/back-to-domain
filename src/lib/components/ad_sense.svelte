<script context="module" lang="ts">
	enum AdType {
		display,
		multiplex,
	}

	type Ad = {
		type: AdType
		id: string
	}

	export class Ads {
		public static readonly display_1: Ad = { type: AdType.display, id: '7629854255' }
		public static readonly display_2: Ad = { type: AdType.display, id: '4511369347' }
	}
</script>

<script lang="ts">
	import { onMount } from 'svelte'
	import { afterNavigate } from '$app/navigation'

	let ad_container: HTMLDivElement

	export let ad: Ad

	function load_ad_sense_script(): void {
		if (document.getElementById('ad_sense_script')) return

		const script = document.createElement('script')

		script.id = 'ad_sense_script'
		script.async = true
		script.crossOrigin = 'anonymous'

		script.src =
			'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4064604490139558'

		document.body.appendChild(script)
	}

	function create_ad_template(): HTMLModElement {
		const ad_slot = document.createElement('ins')

		ad_slot.className = 'adsbygoogle'
		ad_slot.style.display = 'block'
		ad_slot.dataset['adClient'] = 'ca-pub-4064604490139558'

		return ad_slot
	}

	function create_ad(): HTMLModElement {
		const ad_element = create_ad_template()

		ad_element.dataset['adSlot'] = ad.id

		switch (ad.type) {
			case AdType.display:
				ad_element.dataset['adFormat'] = 'auto'
				ad_element.dataset['fullWidthResponsive'] = 'true'
				break

			case AdType.multiplex:
				ad_element.dataset['adFormat'] = 'autorelaxed'
				break
		}

		return ad_element
	}

	function append_ad(): void {
		const ad_element = create_ad()

		ad_container.appendChild(ad_element)
	}

	function remove_child(): void {
		const first_child = ad_container.firstChild

		if (!first_child) return

		ad_container.removeChild(first_child)
	}

	function push_ad(): void {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const ads_by_google = (window as any).adsbygoogle

		if (!ads_by_google) return

		setTimeout(() => {
			ads_by_google.push({})
		})
	}

	function load_ad(): void {
		remove_child()
		append_ad()
		push_ad()
	}

	afterNavigate(() => {
		load_ad()
	})

	onMount(() => {
		setTimeout(() => {
			load_ad_sense_script()
		}, 10)

		setTimeout(() => {
			load_ad()
		}, 500)
	})
</script>

<div bind:this={ad_container} />
