import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
	await page.goto('/', { waitUntil: 'networkidle' })
})

test('initialize page', async ({ page }) => {
	await expect(page.getByRole('heading', { name: 'Back to Domain' })).toBeVisible()

	await expect(page.getByTestId('enter-ip-address')).toHaveAttribute(
		'placeholder',
		'Enter IP Address'
	)

	await expect(page.getByTitle('copyright')).toContainText('© sinProject. Back To Domain v')
})

test('submit button', async ({ page }) => {
	await expect(page.getByTestId('submit-button')).toBeEnabled()

	await page.getByPlaceholder('Enter IP Address').fill('127.0.0.1')
	await page.getByTestId('submit-button').click()

	await expect(page.getByTestId('submit-button')).toBeDisabled()
	await expect(page.getByTestId('submit-button')).toBeEnabled()
})

type Spec = {
	name: string
	ip_address: string
	expected_ip_address?: string
	expected_fqdn?: string
	expected_whois?: string
	expected_error?: string
}

const specs: Spec[] = [
	{
		name: 'nuro',
		ip_address: '116.82.205.136',
		expected_ip_address: 'IP Address: 116.82.205.136',
		expected_fqdn: 'FQDN: fp7452cd88.oski512.ap.nuro.jp',
		expected_whois: 'Sony Network Communications Inc.',
	},
	{
		name: '127.0.0.1',
		ip_address: '127.0.0.1',
		expected_ip_address: 'IP Address: 127.0.0.1',
	},
	{
		name: 'error',
		ip_address: 'aaa',
		expected_ip_address: 'IP Address: aaa',
		expected_error: 'Failed to reverse lookup: getHostByAddr EINVAL aaa',
	},
	{
		name: 'empty',
		ip_address: '',
	},
]

specs.forEach((spec) => {
	test(`${spec.name}`, async ({ page }) => {
		const { ip_address, expected_ip_address, expected_fqdn, expected_whois, expected_error } = spec

		await page.getByPlaceholder('Enter IP Address').fill(ip_address)
		await page.getByTestId('submit-button').click()

		if (expected_ip_address) {
			await expect(page.getByTitle('IP Address')).toHaveText(expected_ip_address)
		} else {
			await expect(page.getByTitle('IP Address')).toBeHidden()
		}

		if (expected_fqdn) {
			await expect(page.getByTitle('FQDN')).toHaveText(expected_fqdn)
		} else {
			await expect(page.getByTitle('FQDN')).toBeHidden()
		}

		if (expected_whois) {
			await expect(page.getByTitle('Whois')).toContainText(expected_whois)
		} else {
			await expect(page.getByTitle('Whois')).toBeHidden()
		}

		if (expected_error) {
			await expect(page.getByTitle('Error')).toContainText(expected_error)
		} else {
			await expect(page.getByTitle('Error')).toBeHidden()
		}
	})
})
