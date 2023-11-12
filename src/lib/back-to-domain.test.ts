import { expect, it } from 'vitest'
import { extract_domain, reverse_lookup } from './back-to-domain'

type Spec = {
	name: string
	ip: string
	expected: string
}

const specs: Spec[] = [
	{
		name: 'should return the domain',
		ip: '116.82.205.136',
		expected: 'fp7452cd88.oski512.ap.nuro.jp',
	},
	{
		name: 'should return the domain',
		ip: '153.246.176.60',
		expected: 'p7201061-ipoefx.ipoe.ocn.ne.jp',
	},
	{
		name: 'empty',
		ip: '',
		expected: '',
	},
	{
		name: 'local IP',
		ip: '192.168.0.1',
		expected: '',
	},
]

it.each(specs)('get_domain($ip) -> $expected', async (spec) => {
	const { ip, expected } = spec

	if (!ip) {
		expect(reverse_lookup(ip)).rejects.toThrow('Failed to reverse lookup: getHostByAddr EINVAL')

		return
	}

	if (ip === '192.168.0.1') {
		expect(reverse_lookup(ip)).rejects.toThrow(
			'Failed to reverse lookup: getHostByAddr ENOTFOUND 192.168.0.1'
		)

		return
	}

	const domains = await reverse_lookup(ip)
	const domain = domains[0]

	expect(domain).toBe(expected)
})

type FqdnSpec = {
	name: string
	fqdn: string
	expected: string
}

const fqdn_specs: FqdnSpec[] = [
	{
		name: 'should return the domain',
		fqdn: 'fp7452cd88.oski512.ap.nuro.jp',
		expected: 'nuro.jp',
	},
	{
		name: 'should return the domain',
		fqdn: 'p7201061-ipoefx.ipoe.ocn.ne.jp',
		expected: 'ocn.ne.jp',
	},
	{
		name: 'empty',
		fqdn: '',
		expected: '',
	},
]

it.each(fqdn_specs)('extract_domain($fqdn) -> $expected', (spec) => {
	const { fqdn, expected } = spec

	const domain = extract_domain(fqdn)

	expect(domain).toBe(expected)
})
