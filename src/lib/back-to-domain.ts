import { reverse } from 'dns'
import { promisify } from 'util'
import * as psl from 'psl'
import type { ParsedDomain } from 'psl'

const reverse_async = promisify(reverse)

export async function reverse_lookup(ip_address: string): Promise<string[]> {
	try {
		const domains = await reverse_async(ip_address)

		return domains
	} catch (error) {
		const message = (error as Error).message

		throw new Error(`Failed to reverse lookup: ${message}`)
	}
}

export function extract_domain(fqdn: string): string {
	const parsed = psl.parse(fqdn) as ParsedDomain
	const domain = parsed.domain ?? ''

	return domain
}
