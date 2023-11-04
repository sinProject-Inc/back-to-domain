import { extract_domain, reverse_lookup } from '$lib/back-to-domain'
import { get_whois } from '$lib/whois'
import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ getClientAddress: get_client_address }) => {
	const client_address = get_client_address()

	return {
		client_address,
	}
}

type ActionReturn = {
	ip_address?: string
	fqdn?: string
	whois?: string
	error?: string
}

async function get_response(data: FormData): Promise<ActionReturn> {
	const ip_address = data.get('ip_address')?.toString() ?? ''

	if (!ip_address) {
		return {}
	}

	try {
		const fqdns = await reverse_lookup(ip_address)
		const fqdn = fqdns[0] ?? ''
		const domain = fqdn ? extract_domain(fqdn) : undefined
		const whois = domain ? await get_whois(domain) : undefined

		if (whois) {
			return {
				ip_address,
				fqdn,
				whois,
			}
		} else {
			return {
				ip_address,
				fqdn,
			}
		}
	} catch (error) {
		const message = (error as Error).message

		return {
			ip_address,
			error: message,
		}
	}
}

export const actions = {
	default: async ({ request }): Promise<ActionReturn> => {
		const data = await request.formData()

		// eslint-disable-next-line no-console
		console.log('POST DATA', Object.fromEntries(data))

		const response = await get_response(data)

		// eslint-disable-next-line no-console
		// console.log('RESPONSE', response)

		return response
	},
} satisfies Actions
